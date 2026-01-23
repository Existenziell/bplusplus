'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { navItems, type NavSection } from '@/app/utils/navigation'

export type { NavSection as NavItem }

export { navItems }

// Find which section contains the current path
function findActiveSectionHref(pathname: string): string | null {
  for (const section of navItems) {
    if (pathname === section.href || pathname.startsWith(section.href + '/')) {
      return section.href
    }
  }
  return null
}

export default function DocsNavigation() {
  const pathname = usePathname()

  // Initialize with the section that contains the current page expanded
  const [expandedSections, setExpandedSections] = useState<Set<string>>(() => {
    const activeSection = findActiveSectionHref(pathname)
    return activeSection ? new Set([activeSection]) : new Set()
  })

  // Update expanded sections when pathname changes (e.g., navigation)
  useEffect(() => {
    const activeSection = findActiveSectionHref(pathname)
    if (activeSection && !expandedSections.has(activeSection)) {
      setExpandedSections(prev => {
        const newSet = new Set(prev)
        newSet.add(activeSection)
        return newSet
      })
    }
  }, [pathname, expandedSections])

  const isActive = (href: string) => {
    if (pathname === href) return true
    // Check if current path starts with this href (for parent sections)
    if (pathname.startsWith(href + '/')) return true
    return false
  }

  const toggleSection = (href: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev)
      if (newSet.has(href)) {
        newSet.delete(href)
      } else {
        newSet.add(href)
      }
      return newSet
    })
  }

  const isExpanded = (href: string) => expandedSections.has(href)

  return (
    <nav className="w-full md:w-64 flex-shrink-0 md:pr-8 sticky top-0">
      <div>
        <div className="mb-8">
          <ul className="space-y-1">
            <li>
              <Link
                href="/author"
                className={`block py-1 leading-tight transition-colors ${
                  pathname === '/author'
                    ? 'text-btc font-semibold'
                    : 'text-zinc-700 dark:text-zinc-300 hover:text-btc hover:underline'
                }`}
              >
                About B++
              </Link>
            </li>
            <li>
              <Link
                href="/whitepaper"
                className={`block py-1 leading-tight transition-colors ${
                  pathname === '/whitepaper'
                    ? 'text-btc font-semibold'
                    : 'text-zinc-700 dark:text-zinc-300 hover:text-btc hover:underline'
                }`}
              >
                Bitcoin Whitepaper
              </Link>
            </li>
            <li>
              <Link
                href="/terminal"
                className={`block py-1 leading-tight transition-colors ${
                  pathname === '/terminal'
                    ? 'text-btc font-semibold'
                    : 'text-zinc-700 dark:text-zinc-300 hover:text-btc hover:underline'
                }`}
              >
                Bitcoin CLI Terminal
              </Link>
            </li>
          </ul>
        </div>
        <h2 className="text-base text-zinc-900 dark:text-zinc-100 mb-3">
          Docs
        </h2>
        <ul className="space-y-1">
          {navItems.map((item) => {
            const itemActive = isActive(item.href)
            const hasChildren = item.children && item.children.length > 0
            const expanded = isExpanded(item.href)

            return (
              <li key={item.href}>
                <div className="flex items-center">
                  {hasChildren && (
                    <button
                      onClick={() => toggleSection(item.href)}
                      className="mr-1 p-1 text-zinc-500 hover:text-btc transition-colors"
                      aria-label={expanded ? 'Collapse section' : 'Expand section'}
                    >
                      <svg
                        className={`w-3 h-3 transition-transform ${expanded ? 'rotate-90' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  )}
                  <Link
                    href={item.href}
                    onClick={() => hasChildren && !expanded && toggleSection(item.href)}
                    className={`block py-1 leading-tight transition-colors ${
                      itemActive
                        ? 'text-btc font-semibold'
                        : 'text-zinc-700 dark:text-zinc-300 hover:text-btc hover:underline'
                    }`}
                  >
                    {item.title}
                  </Link>
                </div>
                {hasChildren && expanded && (
                  <ul className="ml-5 mt-1 space-y-0">
                    {item.children!.map((child) => {
                      const childActive = pathname === child.href
                      return (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className={`block text-sm py-1 leading-tight transition-colors ${
                              childActive
                                ? 'text-btc font-semibold'
                                : 'text-secondary hover:text-btc hover:underline'
                            }`}
                          >
                            {child.title}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
