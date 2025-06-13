import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'

// Import the generated route tree
import { routeTree } from './routeTree.gen'

import '@repo/ui/styles/globals.css'
import reportWebVitals from './reportWebVitals.ts'

import { ConvexReactClient } from 'convex/react'
// import { RouterProvider } from "@tanstack/react-router";
import { ConvexQueryClient } from '@convex-dev/react-query'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { router } from "./router";
import { ConvexAuthProvider } from '@convex-dev/auth/react'
import '@/i18n'
import { Toaster } from '@repo/ui/components/sonner'
// @ts-ignore
import '@fontsource-variable/geist'
// @ts-ignore
import '@fontsource-variable/geist-mono'

// Convex client
const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string)

const convexQueryClient = new ConvexQueryClient(convex)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryKeyHashFn: convexQueryClient.hashFn(),
      queryFn: convexQueryClient.queryFn(),
    },
  },
})

convexQueryClient.connect(queryClient)

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    queryClient: undefined!,
  },
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
  basepath: '/app',
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Render the app
const rootElement = document.getElementById('app')
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <ConvexAuthProvider client={convex}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <Toaster richColors />
        </QueryClientProvider>
      </ConvexAuthProvider>
    </StrictMode>,
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
