'use client'

import { useState } from 'react'
import DocsNavigation from './DocsNavigation'

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="md:hidden mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-200 px-4 py-2 rounded-lg flex items-center justify-between transition-colors"
        aria-label="Toggle navigation menu"
      >
        <span className="font-semibold">Navigation</span>
        <svg
          className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="mt-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg p-4 max-h-[70vh] overflow-y-auto border border-zinc-300 dark:border-zinc-700">
          <DocsNavigation />
        </div>
      )}
    </div>
  )
}
