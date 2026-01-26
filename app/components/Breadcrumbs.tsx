'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useDocNavigation } from '@/app/hooks/useDocNavigation'

interface BreadcrumbsProps {
  isSticky?: boolean
}

export default function Breadcrumbs({ isSticky = false }: BreadcrumbsProps) {
  const { pathname, breadcrumbs } = useDocNavigation()

  // Don't show breadcrumbs on homepage
  if (pathname === '/') {
    return null
  }

  // Check if first breadcrumb is "Home"
  const firstCrumb = breadcrumbs[0]
  const showLogoInsteadOfHome = isSticky && firstCrumb?.label === 'Home'

  return (
    <nav className="py-2" aria-label="Breadcrumb">
      <ol className="flex items-center flex-wrap space-x-2 text-xs sm:text-sm text-secondary">
        {breadcrumbs.map((crumb, index) => {
          const isFirst = index === 0
          const isLast = index === breadcrumbs.length - 1
          const shouldShowLogo = isFirst && showLogoInsteadOfHome

          return (
            <li key={crumb.href} className="flex items-center">
              {index > 0 && (
                <span className="mx-2 text-gray-500 dark:text-gray-400">/</span>
              )}
              {shouldShowLogo ? (
                <>
                  {/* Logo - hidden on mobile, shown on desktop */}
                  <Link
                    href={crumb.href}
                    className="hidden md:flex items-center hover:opacity-80 transition-opacity"
                    aria-label="B++ Home"
                  >
                    <Image
                      src="/icons/love.png"
                      alt="B++ Logo"
                      width={42}
                      height={42}
                      className="opacity-80 dark:invert"
                    />
                  </Link>
                  {/* Text link - shown on mobile, hidden on desktop when logo is active */}
                  <Link
                    href={crumb.href}
                    className="md:hidden hover:text-btc hover:underline transition-colors text-gray-700 dark:text-gray-400"
                  >
                    {crumb.label}
                  </Link>
                </>
              ) : isLast ? (
                <span className="text-gray-800 dark:text-gray-300" aria-current="page">{crumb.label}</span>
              ) : (
                <Link
                  href={crumb.href}
                  className="hover:text-btc hover:underline transition-colors text-gray-700 dark:text-gray-400"
                >
                  {crumb.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
