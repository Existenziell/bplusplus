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
    <nav className="py-1 min-h-[42px] flex items-center" aria-label="Breadcrumb">
      <ol className="flex items-center flex-wrap space-x-2 text-xs sm:text-sm text-secondary">
        {breadcrumbs.map((crumb, index) => {
          const isFirst = index === 0
          const isLast = index === breadcrumbs.length - 1
          const shouldShowLogo = isFirst && showLogoInsteadOfHome

          return (
            <li key={crumb.href} className={`flex items-center ${isFirst ? 'h-[42px] relative' : ''}`}>
              {index > 0 && (
                <span className="mx-2 text-gray-500 dark:text-gray-400">/</span>
              )}
              {isFirst && firstCrumb?.label === 'Home' ? (
                <>
                  {/* Logo - hidden on mobile, shown on desktop with transition */}
                  <Link
                    href={firstCrumb.href}
                    className={`hidden md:flex items-center justify-center h-[42px] hover:opacity-80 transition-all duration-200 absolute ${
                      showLogoInsteadOfHome 
                        ? 'opacity-100 scale-100' 
                        : 'opacity-0 scale-95 pointer-events-none'
                    }`}
                    aria-label="B++ Home"
                  >
                    <Image
                      src="/logo/logo.png"
                      alt="B++ Logo"
                      width={42}
                      height={42}
                      className="opacity-80 dark:invert"
                    />
                  </Link>
                  {/* Text link - shown on mobile, hidden on desktop when logo is active, with transition */}
                  <Link
                    href={firstCrumb.href}
                    className={`md:hidden flex items-center h-[42px] hover:text-btc hover:underline transition-colors text-gray-700 dark:text-gray-400 ${
                      showLogoInsteadOfHome ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                    }`}
                  >
                    {firstCrumb.label}
                  </Link>
                  {/* Text link for desktop - transitions out when logo appears */}
                  <Link
                    href={firstCrumb.href}
                    className={`hidden md:flex items-center h-[42px] hover:text-btc hover:underline transition-all duration-200 text-gray-700 dark:text-gray-400 ${
                      showLogoInsteadOfHome 
                        ? 'opacity-0 scale-95 pointer-events-none' 
                        : 'opacity-100 scale-100'
                    }`}
                  >
                    {firstCrumb.label}
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
