'use client'

import Link from 'next/link'
import { useDocNavigation } from '@/app/hooks/useDocNavigation'

export default function NextPageButton() {
  const { previousPage, nextPage } = useDocNavigation()

  // Don't show if no navigation available
  if (!previousPage && !nextPage) {
    return null
  }

  return (
    <div className="mt-12 pt-6 border-t border-zinc-200 dark:border-zinc-700 flex justify-between items-center">
      {/* Previous Page */}
      <div className="flex-1">
        {previousPage ? (
          <Link
            href={previousPage.href}
            className="inline-flex items-center gap-2 text-btc hover:underline transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="hidden sm:inline">Prev: {previousPage.title}</span>
            <span className="sm:hidden">Prev</span>
          </Link>
        ) : (
          <div />
        )}
      </div>

      {/* Top - Centered */}
      <div className="flex-1 flex justify-center">
        <span
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="cursor-pointer inline-flex items-center gap-2 text-btc hover:underline transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
          <span>Top</span>
        </span>
      </div>

      {/* Next Page */}
      <div className="flex-1 flex justify-end">
        {nextPage ? (
          <Link
            href={nextPage.href}
            className="inline-flex items-center gap-2 text-btc hover:underline transition-colors"
          >
            <span className="hidden sm:inline">Next: {nextPage.title}</span>
            <span className="sm:hidden">Next</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  )
}
