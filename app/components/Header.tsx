'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import ThemeToggle from '@/app/components/ThemeToggle'
import { SearchIcon } from '@/app/components/Icons'
import { useStickyScroll } from '@/app/contexts/StickyScrollContext'
import { useSearchModal } from '@/app/contexts/SearchModalContext'

const siteTitleClassName =
  'absolute left-1/2 -translate-x-1/2 pl-11 font-extrabold engraved text-6xl hidden lg:block pointer-events-none'

export default function Header() {
  const pathname = usePathname()
  const { isSticky, headerRef } = useStickyScroll()
  const { openSearch } = useSearchModal()
  const showSearchInHeader = !isSticky
  const isHomePage = pathname === '/'

  return (
    <>
      <header ref={headerRef} className="page-bg relative">
        <div className="container-content py-4">
          <div className="flex justify-between items-center relative">
            <Link href="/" className="flex items-center gap-2 flex-shrink-0" aria-label="BitcoinDev Home">
              <Image
                src="/icons/logo/logo.png"
                alt="BitcoinDev Logo"
                width={100}
                height={100}
                className="opacity-80 dark:invert"
              />
            </Link>
            {isHomePage ? (
              <h1 className={siteTitleClassName}>BitcoinDev</h1>
            ) : (
              <span className={siteTitleClassName}>BitcoinDev</span>
            )}
            <div className="flex-shrink-0 flex items-center gap-1">
                <div 
                  className={`transition-all duration-200 will-change-transform ${
                    showSearchInHeader 
                      ? 'opacity-100 translate-x-0' 
                      : 'opacity-0 translate-x-2 pointer-events-none'
                  }`}
                >
                  <button
                    type="button"
                    onClick={openSearch}
                    className="btn-icon"
                    aria-label="Search (⌘K)"
                    title="Search (⌘K)"
                  >
                    <SearchIcon className="w-5 h-5" />
                  </button>
                </div>
                <ThemeToggle />
              </div>
          </div>
        </div>
      </header>
    </>
  )
}
