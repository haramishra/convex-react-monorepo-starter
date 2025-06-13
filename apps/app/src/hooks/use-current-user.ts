import { convexQuery, useConvexAuth } from '@convex-dev/react-query'
import { api } from '@cvx/_generated/api'
import { useQuery } from '@tanstack/react-query'

export function useCurrentUser() {
  const { isLoading, isAuthenticated } = useConvexAuth()
  const { data: user } = useQuery(convexQuery(api.user.getCurrentUser, {}))
  // Combine the authentication state with the user existence check
  return {
    isLoading: isLoading || (isAuthenticated && user === null),
    isAuthenticated: isAuthenticated && user !== null,
    user,
  }
}
