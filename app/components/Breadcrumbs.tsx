'use client'

import Link from 'next/link'
import { useDocNavigation } from '@/app/hooks/useDocNavigation'

export default function Breadcrumbs() {
  const { pathname, breadcrumbs } = useDocNavigation()

  // Don't show breadcrumbs on homepage
  if (pathname === '/') {
    return null
  }

  return (
    <nav className="py-2" aria-label="Breadcrumb">
      <ol className="flex items-center flex-wrap space-x-2 text-xs sm:text-sm text-secondary">
        {breadcrumbs.map((crumb, index) => (
          <li key={crumb.href} className="flex items-center">
            {index > 0 && (
              <span className="mx-2 text-zinc-500 dark:text-zinc-400">/</span>
            )}
            {index === breadcrumbs.length - 1 ? (
              <span className="text-zinc-800 dark:text-zinc-300">{crumb.label}</span>
            ) : (
              <Link
                href={crumb.href}
                className="hover:text-btc hover:underline transition-colors text-zinc-700 dark:text-zinc-400"
              >
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
