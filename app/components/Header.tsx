'use client'

import Link from 'next/link'
import Image from 'next/image'
import ThemeToggle from '@/app/components/ThemeToggle'
import { SearchIcon } from '@/app/components/Icons'
import { useStickyScroll } from '@/app/contexts/StickyScrollContext'
import { useSearchModal } from '@/app/contexts/SearchModalContext'

export default function Header() {
  const { isSticky, headerRef } = useStickyScroll()
  const { openSearch } = useSearchModal()
  const showSearchInHeader = !isSticky

  return (
    <>
      <header ref={headerRef} className="page-bg">
        <div className="container-content py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2" aria-label="BitcoinDev Home">
              <Image
                src="/logo/logo.png"
                alt="BitcoinDev Logo"
                width={100}
                height={100}
                className="opacity-80 dark:invert"
              />
              </Link>
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
