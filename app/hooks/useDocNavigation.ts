'use client'

import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import { navItems, downloadablePaths, routeLabels, type NavSection } from '@/app/utils/navigation'

interface BreadcrumbItem {
  label: string
  href: string
}

interface NextPageInfo {
  title: string
  href: string
}

interface DocNavigationState {
  pathname: string
  breadcrumbs: BreadcrumbItem[]
  previousPage: NextPageInfo | null
  nextPage: NextPageInfo | null
  isDownloadable: boolean
  isMainSectionPage: boolean
}

// Flatten the nav items into a single ordered list of all pages
function getFlattenedPages(items: NavSection[]): { title: string; href: string }[] {
  const pages: { title: string; href: string }[] = []

  for (const item of items) {
    pages.push({ title: item.title, href: item.href })
    if (item.children) {
      for (const child of item.children) {
        pages.push({ title: child.title, href: child.href })
      }
    }
  }

  return pages
}

// Pre-compute static data
const flatPages = getFlattenedPages(navItems)
const mainPageHrefs = new Set(
  navItems.filter(item => item.children && item.children.length > 0).map(item => item.href)
)

/**
 * Hook that provides all pathname-derived navigation state.
 * Consolidates logic from Breadcrumbs, PageNavigation, and DownloadButton.
 */
export function useDocNavigation(): DocNavigationState {
  const pathname = usePathname()

  return useMemo(() => {
    // Build breadcrumbs
    const pathSegments = pathname.split('/').filter(Boolean)
    const breadcrumbs: BreadcrumbItem[] = [{ label: 'Home', href: '/' }]

    let currentPath = ''
    pathSegments.forEach((segment) => {
      currentPath += `/${segment}`

      // Skip 'docs' segment
      if (segment === 'docs') {
        return
      }

      const label = routeLabels[segment] || segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')

      breadcrumbs.push({ label, href: currentPath })
    })

    // Compute previous and next page
    const isMainSectionPage = mainPageHrefs.has(pathname)
    let previousPage: NextPageInfo | null = null
    let nextPage: NextPageInfo | null = null

    const currentIndex = flatPages.findIndex(page => page.href === pathname)
    if (currentIndex !== -1) {
      if (currentIndex > 0) {
        previousPage = flatPages[currentIndex - 1]
      }
      if (currentIndex < flatPages.length - 1) {
        nextPage = flatPages[currentIndex + 1]
      }
    }

    return {
      pathname,
      breadcrumbs,
      previousPage,
      nextPage,
      isDownloadable: downloadablePaths.has(pathname),
      isMainSectionPage,
    }
  }, [pathname])
}
