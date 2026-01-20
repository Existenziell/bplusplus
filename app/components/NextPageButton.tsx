'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { navItems, type NavSection } from '@/app/data/navigation'

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

// Get the hrefs of main/parent pages (pages that have children)
const mainPageHrefs = new Set(
  navItems.filter(item => item.children && item.children.length > 0).map(item => item.href)
)

export default function NextPageButton() {
  const pathname = usePathname()

  // Don't show on main section pages
  if (mainPageHrefs.has(pathname)) {
    return null
  }

  const flatPages = getFlattenedPages(navItems)

  // Find current page index
  const currentIndex = flatPages.findIndex(page => page.href === pathname)

  // Get next page (if it exists)
  const nextPage = currentIndex !== -1 && currentIndex < flatPages.length - 1
    ? flatPages[currentIndex + 1]
    : null

  if (!nextPage) {
    return null
  }

  return (
    <div className="mt-12 pt-6 border-t border-zinc-200 dark:border-zinc-700 flex justify-between">
      <div className="flex items-center gap-2">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="var(--btc)"
          viewBox="0 0 24 24"
          >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7 -7l7 7" />
        </svg>
        <span onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="cursor-pointer inline-flex items-center gap-2 text-btc hover:underline transition-colors">Top</span>
      </div>
      <Link
        href={nextPage.href}
        className="inline-flex items-center gap-2 text-btc hover:underline transition-colors"
      >
        <span>Next: {nextPage.title}</span>
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  )
}
