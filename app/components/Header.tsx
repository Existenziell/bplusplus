import Link from 'next/link'
import Image from 'next/image'
import Metrics from './Metrics'
import Notification from './Notification'
import ThemeToggle from './ThemeToggle'
import Breadcrumbs from './Breadcrumbs'

interface HeaderProps {
  showBreadcrumbs?: boolean
}

export default function Header({ showBreadcrumbs = false }: HeaderProps) {
  return (
    <header>
      <Notification />
      {/* Sticky Header and Metrics */}
      <div className="sticky top-0 z-10 bg-gradient-linear from-zinc-100 via-zinc-50 to-zinc-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900">
        <div className="container mx-auto px-4 md:px-8 pt-4">
          <div className="flex justify-between items-start mb-2">
            <div className="flex-shrink-0 items-center gap-2 flex-row hidden md:flex" aria-hidden="true">
              <Image
                src="/icons/satoshi.svg"
                alt=""
                width={50}
                height={50}
                className="opacity-20 dark:invert"
                priority
              />
              <Image
                src="/icons/bitcoin.svg"
                alt=""
                width={40}
                height={40}
                className="opacity-20 dark:invert"
                priority
              />
            </div>
            <Link href="/" className="text-center hover:opacity-80 transition-opacity no-underline hover:no-underline">
              <h1 className='text-4xl sm:text-5xl md:text-6xl'>B++</h1>
            </Link>
            <div className="flex-shrink-0">
              <ThemeToggle />
            </div>
          </div>
          <Metrics />
          {showBreadcrumbs && <Breadcrumbs />}
        </div>
      </div>
    </header>
  )
}
