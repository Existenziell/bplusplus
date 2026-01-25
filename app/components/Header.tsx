'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import ThemeToggle from '@/app/components/ThemeToggle'
import Breadcrumbs from '@/app/components/Breadcrumbs'
import DownloadMarkdownButton from '@/app/components/DownloadMarkdownButton'
import SearchModal from '@/app/components/SearchModal'
import { SearchIcon } from '@/app/components/Icons'

export default function Header() {
  const pathname = usePathname()
  const showBreadcrumbs = Boolean(pathname && pathname !== '/')
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen((open) => !open)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <header className="pb-4 page-bg">
        <div className="container-content pt-4">
          <div className="flex justify-between items-center">
              <Link href="/" className="text-center" aria-label="B++ Home">
                <Image src="/logo/logo.png" alt="" width={80} height={80} />
              </Link>
              <Image
                src="/icons/love.png"
                alt=""
                width={80}
                height={80}
                className="opacity-40 translate-x-16 dark:invert"
              />
              <div className="flex-shrink-0 flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setSearchOpen(true)}
                  className="p-2 rounded-md text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-colors"
                  aria-label="Search (⌘K)"
                  title="Search (⌘K)"
                >
                  <SearchIcon className="w-5 h-5" />
                </button>
                <ThemeToggle />
              </div>
          </div>
        </div>
      </header>
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      {/* Sticky Breadcrumbs - outside header so it can stick to viewport */}
      {showBreadcrumbs && (
        <div className="sticky top-0 z-10 page-bg">
          <div className="container-content">
            <div className="flex items-center justify-between">
              <Breadcrumbs />
              <div className="hidden md:block">
                <DownloadMarkdownButton />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
