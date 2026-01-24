import type { NavSection } from '@/app/utils/navigation'

export interface BreadcrumbItem {
  label: string
  href: string
}

export interface NextPageInfo {
  title: string
  href: string
}

export interface DocNavigationState {
  pathname: string
  breadcrumbs: BreadcrumbItem[]
  previousPage: NextPageInfo | null
  nextPage: NextPageInfo | null
  isDownloadable: boolean
  isMainSectionPage: boolean
}

export interface DocNavigationContext {
  flatPages: { title: string; href: string }[]
  mainPageHrefs: Set<string>
  routeLabels: Record<string, string>
  downloadablePaths: Set<string>
}

/**
 * Flatten nav items into a single ordered list of all pages (section + children).
 */
export function getFlattenedPages(items: NavSection[]): { title: string; href: string }[] {
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

/**
 * Pure function: pathname + context -> doc navigation state.
 * Used by useDocNavigation; also unit-testable with small fixtures.
 */
export function pathnameToDocNavigationState(
  pathname: string,
  ctx: DocNavigationContext
): DocNavigationState {
  const { flatPages, mainPageHrefs, routeLabels, downloadablePaths } = ctx

  const pathSegments = pathname.split('/').filter(Boolean)
  const breadcrumbs: BreadcrumbItem[] = [{ label: 'Home', href: '/' }]
  let currentPath = ''

  for (const segment of pathSegments) {
    currentPath += `/${segment}`
    if (segment === 'docs') continue
    const label =
      routeLabels[segment] ??
      segment
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    breadcrumbs.push({ label, href: currentPath })
  }

  const isMainSectionPage = mainPageHrefs.has(pathname)
  let previousPage: NextPageInfo | null = null
  let nextPage: NextPageInfo | null = null
  const currentIndex = flatPages.findIndex((p) => p.href === pathname)
  if (currentIndex !== -1) {
    if (currentIndex > 0) previousPage = flatPages[currentIndex - 1]
    if (currentIndex < flatPages.length - 1) nextPage = flatPages[currentIndex + 1]
  }

  return {
    pathname,
    breadcrumbs,
    previousPage,
    nextPage,
    isDownloadable: downloadablePaths.has(pathname),
    isMainSectionPage,
  }
}
