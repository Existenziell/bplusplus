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
  glossaryLoading?: boolean
}

export default function GlossaryTooltip({ href, children, glossaryData, glossaryLoading = false }: GlossaryTooltipProps) {
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

  const shouldShowTooltip = Boolean(entry) || glossaryLoading

  return (
    <span className="relative inline">
      <Link
        ref={linkRef}
        href={href}
        className="glossary-link"
        onMouseEnter={shouldShowTooltip ? handleMouseEnter : undefined}
        onMouseLeave={shouldShowTooltip ? handleMouseLeave : undefined}
        onFocus={shouldShowTooltip ? handleMouseEnter : undefined}
        onBlur={shouldShowTooltip ? handleMouseLeave : undefined}
        aria-describedby={shouldShowTooltip && isVisible ? `glossary-tooltip-${slug}` : undefined}
      >
        {children}
      </Link>

      {shouldShowTooltip && isVisible && (
        <span
          ref={tooltipRef}
          id={`glossary-tooltip-${slug}`}
          role="tooltip"
          className={`
            block fixed z-[9999] w-64 sm:w-72 p-4 pt-2
            bg-gray-100 dark:bg-gray-800
            border border-gray-300 dark:border-gray-600
            rounded-md shadow-lg
            text-xs text-secondary font-normal
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
              block absolute left-1/2 -translateX-1/2 w-2.5 h-2.5
              bg-gray-100 dark:bg-gray-800
              border-gray-300 dark:border-gray-600
              transform rotate-45
              ${position === 'top'
                ? 'bottom-[-6px] border-r border-b'
                : 'top-[-6px] border-l border-t'
              }
            `}
          />

          {/* Content */}
          <span className="relative block font-normal">
            {entry ? (
              <>
                <span className="block font-medium text-btc mb-1 text-base">
                  {entry.term}
                </span>
                <span className="block text-sm font-normal" style={{ lineHeight: 1.4 }}>
                  {entry.definition}
                  {entry.definition.endsWith('...') && (
                    <Link
                      href={href}
                      className="ml-1 text-btc hover:underline font-medium"
                      onClick={() => {
                        // Close tooltip when clicking "more"
                        setIsVisible(false)
                      }}
                      onMouseDown={(e) => {
                        // Prevent tooltip from closing on mousedown
                        e.stopPropagation()
                      }}
                    >
                      more
                    </Link>
                  )}
                </span>
              </>
            ) : (
              <>
                <span className="block font-medium text-btc mb-1 text-base">Loading…</span>
                <span className="block text-sm font-normal" style={{ lineHeight: 1.4 }}>
                  Fetching glossary definition.
                </span>
              </>
            )}
          </span>
        </span>
      )}
    </span>
  )
}
