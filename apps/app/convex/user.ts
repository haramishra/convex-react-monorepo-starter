// file: convex/users.ts

import { query, mutation } from './_generated/server'
import { v } from 'convex/values'
import type { Doc, Id } from './_generated/dataModel'
import type { QueryCtx, MutationCtx } from './_generated/server' // Use specific context types
// Removed 'auth' import as it wasn't used directly
import { getAuthUserId } from '@convex-dev/auth/server'

// Helper function to get the user document for the currently authenticated user
// Updated return type to Promise<Doc<"users"> | null> for consistency with db.get()
// Throws an error within mutations if the user is authenticated but the doc doesn't exist.
const getAuthenticatedUserDoc = async (
  ctx: QueryCtx | MutationCtx,
): Promise<Doc<'users'> | null> => {
  const userId = await getAuthUserId(ctx)
  if (!userId) {
    // User is not authenticated via the auth provider
    return null
  }

  // Find the user document corresponding to the Convex auth subject identifier
  // ctx.db.get returns Doc<T> | null
  const user = await ctx.db.get(userId)
  if (!user) {
    // User is authenticated, but their document is missing in the 'users' table.
    // For queries, we might want to return null gracefully.
    // For mutations, this usually indicates an inconsistent state, so throwing might be better there.
    // We'll handle this distinction in the calling functions.
    return null
  }
  return user // Return the found user document
}

// --- Queries ---

/**
 * 1. Get User Profile by Document ID
 * Fetches a user's public profile information by their Convex document ID.
 */
export const getUser = query({
  args: {
    userId: v.id('users'),
  },
  handler: async (ctx, args): Promise<Doc<'users'> | null> => {
    // ctx.db.get already returns Doc<"users"> | null
    const user = await ctx.db.get(args.userId)
    // Note: Add permission checks here if necessary.
    return user
  },
})

/**
 * 2. Get Current User Profile
 * Fetches the profile information of the currently logged-in user.
 */
export const getCurrentUser = query({
  args: {},
  handler: async (ctx): Promise<Doc<'users'> | null> => {
    const userId = await getAuthUserId(ctx)
    if (!userId) {
      // User is not authenticated via the auth provider
      return null
    }

    // Find the user document corresponding to the Convex auth subject identifier
    // ctx.db.get returns Doc<T> | null
    const user = await ctx.db.get(userId)
    if (!user) {
      // User is authenticated, but their document is missing in the 'users' table.
      // For queries, we might want to return null gracefully.
      // For mutations, this usually indicates an inconsistent state, so throwing might be better there.
      // We'll handle this distinction in the calling functions.
      return null
    }
    return user // Return the found user document
  },
})

// --- Mutations ---

// Helper specifically for mutations to ensure the user doc exists
// Throws an error if the user is authenticated but the doc is missing.
const requireAuthenticatedUserDoc = async (
  ctx: MutationCtx,
): Promise<Doc<'users'>> => {
  const user = await getAuthenticatedUserDoc(ctx)
  if (!user) {
    // This covers both cases: user not authenticated, or user authenticated but doc missing.
    // For a mutation, either case is usually an error state.
    throw new Error(
      'User must be authenticated and have a user record to perform this action.',
    )
  }
  return user
}

/**
 * 3. Update Current User's Name
 * Allows the authenticated user to update their own name.
 */
export const updateUserName = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, args) => {
    // Use the helper that throws if user is not found/authenticated
    const user = await requireAuthenticatedUserDoc(ctx)

    const trimmedName = args.name.trim()
    if (trimmedName.length === 0) {
      throw new Error('Name cannot be empty.')
    }

    await ctx.db.patch(user._id, {
      name: trimmedName,
    })
  },
})

/**
 * 5. Update Current User's Image URL
 * Allows the authenticated user to update their profile image URL.
 */
export const updateUserImage = mutation({
  args: {
    // Expecting a URL. For file uploads, use Convex file storage and store the storage ID.
    imageUrl: v.string(),
  },
  handler: async (ctx, args) => {
    // Use the helper that throws if user is not found/authenticated
    const user = await requireAuthenticatedUserDoc(ctx)

    const trimmedImageUrl = args.imageUrl.trim()
    // Basic validation (could add URL format validation)
    if (trimmedImageUrl.length === 0) {
      throw new Error('Image URL cannot be empty.')
    }

    await ctx.db.patch(user._id, {
      image: trimmedImageUrl,
    })
  },
})

/**
 * 4. Delete Current User's Account (Database Records Only)
 * Allows the authenticated user to delete their account data within Convex.
 * WARNING: This is destructive and has cascading effects.
 * CRITICAL: This function ONLY deletes data in the Convex database.
 * It DOES NOT delete the user from your authentication provider (e.g., Clerk, Auth0).
 * You MUST handle auth provider deletion separately.
 */
// export const deleteUserAccount = mutation({
//   args: {},
//   handler: async (ctx) => {
//     // Use the helper that throws if user is not found/authenticated
//     const user = await requireAuthenticatedUserDoc(ctx)
//     const userId = user._id // Store ID before potentially deleting user object reference

//     // --- Safety Checks & Data Cleanup ---

//     // 1. Prevent deletion if the user owns any teams. Force transfer/deletion first.
//     const ownedTeams = await ctx.db
//       .query('teams')
//       .withIndex('ownerUserId', (q) => q.eq('ownerUserId', userId))
//       .collect()

//     if (ownedTeams.length > 0) {
//       throw new Error(
//         `Cannot delete account: User owns ${ownedTeams.length} team(s). Please transfer ownership or delete them first.`,
//       )
//     }

//     // 2. Delete team memberships
//     const memberships = await ctx.db
//       .query('members')
//       .withIndex('userId_teamId', (q) => q.eq('userId', userId))
//       .collect()
//     // Consider batching deletes if this could be a very large number
//     await Promise.all(memberships.map((m) => ctx.db.delete(m._id)))
//     console.log(`Deleted ${memberships.length} memberships for user ${userId}.`)

//     // 3. Delete invites sent by the user
//     // Consider adding an index on inviterUserId for performance if needed
//     const invites = await ctx.db
//       .query('invites')
//       .filter((q) => q.eq(q.field('inviterUserId'), userId)) // Assuming inviterUserId is the correct field name
//       .collect()
//     await Promise.all(invites.map((inv) => ctx.db.delete(inv._id)))
//     console.log(`Deleted ${invites.length} invites sent by user ${userId}.`)

//     // 4. Delete associated credentials (OAuth tokens, API keys)
//     const credentials = await ctx.db
//       .query('credentials')
//       .withIndex('userId', (q) => q.eq('userId', userId))
//       .collect()
//     await Promise.all(credentials.map((c) => ctx.db.delete(c._id)))
//     console.log(`Deleted ${credentials.length} credentials for user ${userId}.`)

//     // 5. (Optional) Handle other user-specific data if needed
//     // - Purchases: Generally keep for records.
//     // - Forms/Integrations createdBy: Leave as is for history (record is now orphaned).
//     // - Messages: Leave as is (member record deletion removes direct link).

//     // --- Final Deletion ---

//     // 6. Delete the user document itself
//     await ctx.db.delete(userId)

//     // --- IMPORTANT REMINDER ---
//     // Use email before it's potentially unavailable if user object was somehow modified
//     const userEmail = user.email ?? '[email not available]'
//     console.warn(
//       `User document ${userId} (${userEmail}) deleted from Convex DB. REMEMBER TO DELETE USER FROM AUTH PROVIDER SEPARATELY.`,
//     )
//   },
// })
