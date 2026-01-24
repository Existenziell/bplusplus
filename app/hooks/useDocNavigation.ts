'use client'

import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import { navItems, downloadablePaths, routeLabels } from '@/app/utils/navigation'
import {
  getFlattenedPages,
  pathnameToDocNavigationState,
  type DocNavigationState,
} from '@/app/utils/docNavigationState'

const flatPages = getFlattenedPages(navItems)
const mainPageHrefs = new Set(
  navItems.filter((item) => item.children && item.children.length > 0).map((item) => item.href)
)

/**
 * Hook that provides all pathname-derived navigation state.
 * Consolidates logic from Breadcrumbs, PageNavigation, and DownloadMarkdownButton.
 */
export function useDocNavigation(): DocNavigationState {
  const pathname = usePathname()
  return useMemo(
    () =>
      pathnameToDocNavigationState(pathname, {
        flatPages,
        mainPageHrefs,
        routeLabels,
        downloadablePaths,
      }),
    [pathname]
  )
}
