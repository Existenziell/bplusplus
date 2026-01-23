'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { navItems } from '@/app/utils/navigation'
import { ArrowRight } from '@/app/components/Icons'

// Shared pathname matching logic
function matchesPath(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(href + '/')
}

// Find which section contains the current path
function findActiveSectionHref(pathname: string): string | null {
  for (const section of navItems) {
    if (matchesPath(pathname, section.href)) {
      return section.href
    }
  }
  return null
}

// Static navigation links
const staticLinks = [
  { href: '/whitepaper', title: 'Bitcoin Whitepaper' },
  { href: '/terminal', title: 'Bitcoin CLI Terminal' },
  { href: '/stack-lab', title: 'Stack Lab' },
]

const footerLinks = [
  { href: '/docs/glossary', title: 'Glossary' },
  { href: '/author', title: 'About B++' },
]

// Helper function to get link className based on active state
function getLinkClassName(isActive: boolean, size: 'default' | 'sm' = 'default'): string {
  const baseClasses = size === 'sm' 
    ? 'block text-sm py-1 leading-tight transition-colors'
    : 'block py-1 leading-tight transition-colors'
  
  if (isActive) {
    return `${baseClasses} text-btc font-semibold`
  }
  
  return size === 'sm'
    ? `${baseClasses} text-secondary hover:text-btc hover:underline`
    : `${baseClasses} text-zinc-700 dark:text-zinc-300 hover:text-btc hover:underline`
}

export default function DocsNavigation() {
  const pathname = usePathname()

  // Memoize active section calculation
  const activeSection = useMemo(() => findActiveSectionHref(pathname), [pathname])

  // Initialize with the section that contains the current page expanded
  const [expandedSections, setExpandedSections] = useState<Set<string>>(() => {
    return activeSection ? new Set([activeSection]) : new Set()
  })

  // Update expanded sections when pathname changes (e.g., navigation)
  useEffect(() => {
    if (activeSection) {
      setExpandedSections(prev => {
        if (!prev.has(activeSection)) {
          const newSet = new Set(prev)
          newSet.add(activeSection)
          return newSet
        }
        return prev
      })
    }
  }, [activeSection])

  const isActive = (href: string) => matchesPath(pathname, href)

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
        <div className="mb-6">
          <ul className="space-y-1">
            {staticLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={getLinkClassName(isActive(link.href))}
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <h2 className="text-base text-zinc-700 dark:text-zinc-300 mb-1">
          Docs:
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
                      <ArrowRight
                        className={`w-3 h-3 transition-transform ${expanded ? 'rotate-90' : ''}`}
                      />
                    </button>
                  )}
                  <Link
                    href={item.href}
                    onClick={() => hasChildren && !expanded && toggleSection(item.href)}
                    className={getLinkClassName(itemActive)}
                  >
                    {item.title}
                  </Link>
                </div>
                {hasChildren && expanded && (
                  <ul className="ml-5 mt-1 space-y-0">
                    {item.children!.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className={getLinkClassName(isActive(child.href), 'sm')}
                        >
                          {child.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            )
          })}
        </ul>
      </div>

      <div className="mt-6">
        <ul className="space-y-1">
          {footerLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={getLinkClassName(isActive(link.href))}
              >
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
