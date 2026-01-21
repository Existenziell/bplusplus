'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

interface GlossaryEntry {
  term: string
  definition: string
}

interface GlossaryTooltipProps {
  href: string
  children: React.ReactNode
  glossaryData: Record<string, GlossaryEntry>
}

export default function GlossaryTooltip({ href, children, glossaryData }: GlossaryTooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [position, setPosition] = useState<'top' | 'bottom'>('top')
  const linkRef = useRef<HTMLAnchorElement>(null)
  const tooltipRef = useRef<HTMLSpanElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Extract the term slug from the href (e.g., /docs/glossary#transaction -> transaction)
  const slug = href.split('#')[1] || ''
  const entry = glossaryData[slug]

  // Determine if tooltip should appear above or below the link
  useEffect(() => {
    if (isVisible && linkRef.current) {
      const rect = linkRef.current.getBoundingClientRect()
      const spaceAbove = rect.top
      const tooltipHeight = 150 // Approximate max tooltip height

      if (spaceAbove < tooltipHeight + 20) {
        setPosition('bottom')
      } else {
        setPosition('top')
      }
    }
  }, [isVisible])

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true)
    }, 200) // Small delay to prevent accidental triggers
  }

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      setIsVisible(false)
    }, 100)
  }

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  // If no glossary entry found, render as regular link
  if (!entry) {
    return (
      <Link href={href}>
        {children}
      </Link>
    )
  }

  return (
    <span className="relative inline">
      <Link
        ref={linkRef}
        href={href}
        className="glossary-link"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleMouseEnter}
        onBlur={handleMouseLeave}
      >
        {children}
      </Link>

      {isVisible && (
        <span
          ref={tooltipRef}
          role="tooltip"
          className={`
            block fixed z-[9999] w-64 sm:w-72 p-2.5
            bg-zinc-100 dark:bg-zinc-800
            border border-zinc-300 dark:border-zinc-600
            rounded-md shadow-lg
            text-xs text-zinc-600 dark:text-zinc-400 font-normal
            transition-opacity duration-150
          `}
          style={{
            left: linkRef.current ? linkRef.current.getBoundingClientRect().left + linkRef.current.getBoundingClientRect().width / 2 : 0,
            transform: 'translateX(-50%)',
            ...(position === 'top'
              ? { bottom: linkRef.current ? window.innerHeight - linkRef.current.getBoundingClientRect().top + 8 : 0 }
              : { top: linkRef.current ? linkRef.current.getBoundingClientRect().bottom + 8 : 0 }
            ),
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Arrow */}
          <span
            className={`
              block absolute left-1/2 -translate-x-1/2 w-2.5 h-2.5
              bg-zinc-100 dark:bg-zinc-800
              border-zinc-300 dark:border-zinc-600
              transform rotate-45
              ${position === 'top'
                ? 'bottom-[-6px] border-r border-b'
                : 'top-[-6px] border-l border-t'
              }
            `}
          />

          {/* Content */}
          <span className="relative block font-normal">
            <span className="block font-medium text-btc mb-1 text-sm" style={{ lineHeight: 1.2 }}>
              {entry.term}
            </span>
            <span className="block text-xs font-normal" style={{ lineHeight: 1.3 }}>
              {entry.definition}
            </span>
          </span>
        </span>
      )}
    </span>
  )
}
