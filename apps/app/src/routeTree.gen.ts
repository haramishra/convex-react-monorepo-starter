/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { Route as rootRouteImport } from './routes/__root'
import { Route as ProtectedRouteImport } from './routes/protected'
import { Route as AppRouteImport } from './routes/_app'
import { Route as IndexRouteImport } from './routes/index'

const ProtectedRoute = ProtectedRouteImport.update({
  id: '/protected',
  path: '/protected',
  getParentRoute: () => rootRouteImport,
} as any)
const AppRoute = AppRouteImport.update({
  id: '/_app',
  getParentRoute: () => rootRouteImport,
} as any)
const IndexRoute = IndexRouteImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRouteImport,
} as any)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '': typeof AppRoute
  '/protected': typeof ProtectedRoute
}
export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '': typeof AppRoute
  '/protected': typeof ProtectedRoute
}
export interface FileRoutesById {
  __root__: typeof rootRouteImport
  '/': typeof IndexRoute
  '/_app': typeof AppRoute
  '/protected': typeof ProtectedRoute
}
export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '' | '/protected'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '' | '/protected'
  id: '__root__' | '/' | '/_app' | '/protected'
  fileRoutesById: FileRoutesById
}
export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AppRoute: typeof AppRoute
  ProtectedRoute: typeof ProtectedRoute
}

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/protected': {
      id: '/protected'
      path: '/protected'
      fullPath: '/protected'
      preLoaderRoute: typeof ProtectedRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/_app': {
      id: '/_app'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AppRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexRouteImport
      parentRoute: typeof rootRouteImport
    }
  }
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AppRoute: AppRoute,
  ProtectedRoute: ProtectedRoute,
}
export const routeTree = rootRouteImport
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()
