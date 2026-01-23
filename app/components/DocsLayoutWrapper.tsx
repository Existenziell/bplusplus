import type { ReactNode } from 'react'
import DocsNavigation from '@/app/components/DocsNavigation'
import MobileNav from '@/app/components/MobileNav'
import PageNavigation from '@/app/components/PageNavigation'
import Footer from '@/app/components/Footer'

interface DocsLayoutWrapperProps {
  children: ReactNode
  showPageNavigation?: boolean
}

/**
 * Layout wrapper for /docs, /whitepaper, /terminal, /author, /stack-lab.
 * Header is in the root layout so it stays mounted across navigations (no logo flicker).
 */
export default function DocsLayoutWrapper({
  children,
  showPageNavigation = false,
}: DocsLayoutWrapperProps) {
  return (
    <main className="min-h-screen page-bg flex flex-col">
      <div className="container-content py-4 md:py-8 flex-grow">
        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          <div className="hidden md:block md:w-64 md:flex-shrink-0 md:self-start md:overflow-y-auto">
            <DocsNavigation />
          </div>
          <div className="flex-1 min-w-0">
            <MobileNav />
            {children}
            {showPageNavigation && <PageNavigation />}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
