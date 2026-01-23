import type { ReactNode } from 'react'
import DocsNavigation from '@/app/components/DocsNavigation'
import MobileNav from '@/app/components/MobileNav'
import PageNavigation from '@/app/components/PageNavigation'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'

interface DocsLayoutWrapperProps {
  children: ReactNode
  showBreadcrumbs?: boolean
  showPageNavigation?: boolean
  contentPadding?: 'default' | 'large'
}

/**
 * Shared layout wrapper for pages that should display the docs navigation.
 * Used by /docs, /whitepaper, /terminal, and /author pages.
 */
export default function DocsLayoutWrapper({
  children,
  showBreadcrumbs = false,
  showPageNavigation = false,
  contentPadding = 'default',
}: DocsLayoutWrapperProps) {
  const paddingClass = contentPadding === 'large' ? 'py-8 md:py-12' : 'py-4 md:py-8'

  return (
    <main className="min-h-screen page-bg flex flex-col">
      <Header showBreadcrumbs={showBreadcrumbs} />

      {/* Content Area */}
      <div className={`container-content ${paddingClass} flex-grow`}>
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
