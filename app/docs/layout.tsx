import type { ReactNode } from 'react'
import DocsNavigation from '../components/DocsNavigation'
import MobileNav from '../components/MobileNav'
import Header from '../components/Header'
import Footer from '../components/Footer'

// Force static generation for all doc pages - they only read from filesystem
export const dynamic = 'force-static'

export default function DocsLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <main className="min-h-screen bg-gradient-linear from-zinc-100 via-zinc-50 to-zinc-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 text-zinc-800 dark:text-zinc-200">
      <Header showBreadcrumbs />

      {/* Content Area */}
      <div className="container mx-auto px-4 md:px-8 py-4 md:py-8">
        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          <div className="hidden md:block md:sticky md:top-52 md:self-start md:max-h-[calc(100vh-12rem)] md:overflow-y-auto">
            <DocsNavigation />
          </div>
          <div className="flex-1 w-full">
            <MobileNav />
            {children}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
