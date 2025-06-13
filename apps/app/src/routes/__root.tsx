import { ThemeProvider } from '@repo/ui/components/theme-provider'
import { QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import React, { Suspense } from 'react'

import { useTranslation } from 'react-i18next'

const TanStackRouterDevtools =
  process.env.NODE_ENV === 'production'
    ? () => null // Render nothing in production
    : React.lazy(() =>
        // Lazy load in development
        import('@tanstack/react-router-devtools').then((res) => ({
          default: res.TanStackRouterDevtools,
          // For Embedded Mode
          // default: res.TanStackRouterDevtoolsPanel
        })),
      )

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  component: () => {
    const { t } = useTranslation()
    return (
      <>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Outlet />
          <title>{t('metaTitle')}</title>
          <Suspense>
            <TanStackRouterDevtools />
          </Suspense>
        </ThemeProvider>
      </>
    )
  },
})
