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
      <header className="pb-4 bg-gradient-linear from-zinc-100 via-zinc-50 to-zinc-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900">
        <div className="page-bg">
          <div className="container-content pt-4">
            <div className="flex justify-between items-center">
              <Link href="/" className="text-center" aria-label="B++ Home">
                <Image src="/logo/logo.png" alt="B++ Logo" width={80} height={80} />
              </Link>
              <div className="flex-shrink-0 items-center gap-2 flex-row hidden md:flex opacity-40 -rotate-3" aria-hidden="true">
                <Image
                  src="/icons/satoshi-black.svg"
                  alt=""
                  width={40}
                  height={40}
                  className="dark:invert"
                />
                <Image
                  src="/icons/bitcoin.svg"
                  alt=""
                  width={30}
                  height={30}
                  className="dark:invert translate-y-1"
                />
              </div>
              <div className="flex-shrink-0 flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setSearchOpen(true)}
                  className="p-2 rounded-md text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200/50 dark:hover:bg-zinc-700/50 transition-colors"
                  aria-label="Search (⌘K)"
                >
                  <SearchIcon className="w-5 h-5" title="Search (⌘K)" />
                </button>
                <ThemeToggle />
              </div>
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
