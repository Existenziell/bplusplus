import Link from 'next/link'
import Image from 'next/image'
import Metrics from '@/app/components/Metrics'
import ThemeToggle from '@/app/components/ThemeToggle'
import Breadcrumbs from '@/app/components/Breadcrumbs'
import DownloadButton from '@/app/components/DownloadButton'

interface HeaderProps {
  showBreadcrumbs?: boolean
}

export default function Header({ showBreadcrumbs = false }: HeaderProps) {
  return (
    <>
      <header>
        {/* Header and Metrics */}
        <div className="page-bg">
          <div className="container mx-auto px-4 md:px-8 pt-4">
            <div className="flex justify-between items-start mb-2">
              <Link href="/" className="text-center hover:opacity-60 transition-opacity no-underline hover:no-underline">
                <h1 className='text-4xl sm:text-5xl md:text-6xl text-btc dark:text-btc'>B++</h1>
              </Link>
              <Link href="/terminal" className="text-center hover:text-btc transition-opacity no-underline hover:no-underline">
              <div className="flex-shrink-0 items-center gap-2 flex-row hidden md:flex opacity-40 hover:opacity-80 transition-opacity" aria-hidden="true">
                <Image
                  src="/icons/satoshi-black.svg"
                  alt=""
                  width={50}
                  height={50}
                  className="dark:invert"
                  priority
                />
                <Image
                  src="/icons/bitcoin.svg"
                  alt=""
                  width={40}
                  height={40}
                  className="dark:invert"
                  priority
                />
                </div>
              </Link>
              <div className="flex-shrink-0">
                <ThemeToggle />
              </div>
            </div>
            <Metrics />
          </div>
        </div>
      </header>
      {/* Sticky Breadcrumbs - outside header so it can stick to viewport */}
      {showBreadcrumbs && (
        <div className="sticky top-0 z-10 page-bg">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex items-center justify-between">
              <Breadcrumbs />
              <div className="hidden md:block">
                <DownloadButton />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
