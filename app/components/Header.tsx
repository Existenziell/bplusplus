'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import ThemeToggle from '@/app/components/ThemeToggle'
import Breadcrumbs from '@/app/components/Breadcrumbs'
import DownloadMarkdownButton from '@/app/components/DownloadMarkdownButton'

export default function Header() {
  const pathname = usePathname()
  const showBreadcrumbs = Boolean(pathname && pathname !== '/')

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
                  className="dark:invert"
                />
              </div>
              <div className="flex-shrink-0">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </header>
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
