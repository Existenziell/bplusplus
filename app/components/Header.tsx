import Link from 'next/link'
import Image from 'next/image'
import ThemeToggle from '@/app/components/ThemeToggle'
import Breadcrumbs from '@/app/components/Breadcrumbs'
import DownloadMarkdownButton from '@/app/components/DownloadMarkdownButton'

interface HeaderProps {
  showBreadcrumbs?: boolean
}

export default function Header({ showBreadcrumbs = false }: HeaderProps) {
  return (
    <>
      <header className="mb-4">
        <div className="page-bg">
          <div className="container-content pt-4">
            <div className="flex justify-between items-center">
              <Link href="/" className="text-center" aria-label="B++ Home">
                <Image src="/logo/logo.png" alt="B++ Logo" width={80} height={80} />
              </Link>
              <div className="flex-shrink-0 items-center gap-2 flex-row hidden md:flex opacity-40" aria-hidden="true">
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
