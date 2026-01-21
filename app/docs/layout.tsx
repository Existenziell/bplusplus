import type { ReactNode } from 'react'
import DocsNavigation from '@/app/components/DocsNavigation'
import MobileNav from '@/app/components/MobileNav'
import NextPageButton from '@/app/components/NextPageButton'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'

// Force static generation for all doc pages - they only read from filesystem
export const dynamic = 'force-static'

export default function DocsLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <main className="min-h-screen page-bg">
      <Header showBreadcrumbs />

      {/* Content Area */}
      <div className="container mx-auto px-4 md:px-8 py-4 md:py-8">
        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          <div className="hidden md:block md:w-64 md:flex-shrink-0 md:self-start md:overflow-y-auto">
            <DocsNavigation />
          </div>
          <div className="flex-1 min-w-0">
            <MobileNav />
            {children}
            <NextPageButton />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
