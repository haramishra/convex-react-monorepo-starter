import { authTables } from '@convex-dev/auth/server'
import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  // Include authentication tables from @convex-dev/auth
  ...authTables, // Ensure this includes 'accounts', 'sessions', 'verificationTokens' with their required indexes

  // --- Core User & Team Tables ---

  users: defineTable({
    name: v.optional(v.string()),
    email: v.string(),
    image: v.optional(v.string()), // User profile image URL
    // IMPORTANT: This 'userId' field was commented out in your input. Kept as is.
    // userId: v.optional(v.string()),
    emailVerified: v.optional(v.boolean()),
    emailVerificationTime: v.optional(v.number()), // Timestamp of email verification
    hasCreatedTeam: v.optional(v.boolean()), // Tracks if the user has completed the onboarding step of creating a team
  })
    // Corresponding index also commented out.
    // .index("userId", ["userId"]) // Renamed from byUserId
    .index('email', ['email']), // Renamed from byEmail
})
