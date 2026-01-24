'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useDocNavigation } from '@/app/hooks/useDocNavigation'
import { ArrowLeft, ArrowRight, UpArrow } from '@/app/components/Icons'

export default function PageNavigation() {
  const pathname = usePathname()
  const { previousPage, nextPage } = useDocNavigation()
  const isGlossaryPage = pathname === '/docs/glossary'

  // For glossary page, only show "Top" link
  if (isGlossaryPage) {
    return (
      <div className="mt-12 pt-6 border-t border-zinc-200 dark:border-zinc-700 flex justify-center">
        <span
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="cursor-pointer inline-flex items-center gap-2 text-btc hover:underline transition-colors"
        >
          <UpArrow className="w-8 h-8 " />
        </span>
      </div>
    )
  }

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
            <ArrowLeft />
            <span className="hidden md:inline">{previousPage.title}</span>
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
          <UpArrow className="w-8 h-8" />
        </span>
      </div>

      {/* Next Page */}
      <div className="flex-1 flex justify-end">
        {nextPage ? (
          <Link
            href={nextPage.href}
            className="inline-flex items-center gap-2 text-btc hover:underline transition-colors"
          >
            <span className="hidden md:inline">{nextPage.title}</span>
            <ArrowRight />
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  )
}
