'use client'

import { useState } from 'react'
import Link from 'next/link'
import { navItems } from '@/app/utils/navigation'
import { ChevronDown, ArrowRight } from '@/app/components/Icons'

export default function HorizontalNav() {
  const [isOpen, setIsOpen] = useState(false)
  // Initialize with all sections expanded
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(navItems.map(item => item.href))
  )

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

  return (
    <div className="border-y border-zinc-200 dark:border-zinc-700 bg-white/50 dark:bg-zinc-800/50">
      <div className="container mx-auto px-4 md:px-8">
        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full py-4 flex items-center justify-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-btc transition-colors"
        >
          <span>Explore B++</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Tree Navigation */}
        {isOpen && (
          <div className="pb-6 border-t border-zinc-200 dark:border-zinc-700 pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-2">
              {navItems.map((section) => {
                const hasChildren = section.children && section.children.length > 0
                const isExpanded = expandedSections.has(section.href)

                return (
                  <div key={section.href} className="mb-2">
                    {/* Section Header */}
                    <div className="flex items-center">
                      {hasChildren && (
                        <button
                          onClick={() => toggleSection(section.href)}
                          className="mr-1 p-1 text-zinc-500 hover:text-btc transition-colors"
                          aria-label={isExpanded ? 'Collapse section' : 'Expand section'}
                        >
                          <ArrowRight className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                        </button>
                      )}
                      {!hasChildren && <span className="w-5" />}
                      <Link
                        href={section.href}
                        className="font-medium text-zinc-800 dark:text-zinc-200 hover:text-btc transition-colors"
                      >
                        {section.title}
                      </Link>
                    </div>

                    {/* Children */}
                    {hasChildren && isExpanded && (
                      <ul className="ml-6 mt-1 space-y-1 border-l border-zinc-200 dark:border-zinc-700 pl-3">
                        {section.children!.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-btc transition-colors"
                            >
                              {child.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
