'use client'

import Link from 'next/link'
import { useDocNavigation } from '@/app/hooks/useDocNavigation'

export default function NextPageButton() {
  const { nextPage, isMainSectionPage } = useDocNavigation()

  // Don't show on main section pages or if no next page
  if (isMainSectionPage || !nextPage) {
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
        <span
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="cursor-pointer inline-flex items-center gap-2 text-btc hover:underline transition-colors"
        >
          Top
        </span>
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
