import Link from 'next/link'
import type { ReactNode } from 'react'
import DocsNavigation from '../components/DocsNavigation'
import MobileNav from '../components/MobileNav'
import Metrics from '../components/Metrics'
import Breadcrumbs from '../components/Breadcrumbs'
import Notification from '../components/Notification'
import ThemeToggle from '../components/ThemeToggle'

export default function DocsLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <main className="min-h-screen bg-gradient-linear from-zinc-100 via-zinc-50 to-zinc-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 text-zinc-800 dark:text-zinc-200">
      <Notification />
      {/* Sticky Header and Metrics */}
      <div className="sticky top-0 z-10 bg-gradient-linear from-zinc-100 via-zinc-50 to-zinc-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 pb-4">
        <div className="container mx-auto px-4 md:px-8 pt-4">
          <div className="flex justify-between items-start mb-4">
            <Link href="/" className="text-center flex-1 hover:opacity-80 transition-opacity no-underline hover:no-underline">
              <h1 className="text-4xl sm:text-5xl md:text-6xl mb-2">B++</h1>
              <h2 className="text-base sm:text-lg md:text-xl">Bitcoin Education</h2>
            </Link>
            <div className="flex-shrink-0">
              <ThemeToggle />
            </div>
          </div>
          <Metrics />
          <Breadcrumbs />
        </div>
      </div>

      {/* Content Area */}
      <div className="container mx-auto px-4 md:px-8 py-4 md:py-8">
        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          <div className="hidden md:block">
            <DocsNavigation />
          </div>
          <div className="flex-1 w-full">
            <MobileNav />
            {children}
          </div>
        </div>
      </div>
    </main>
  )
}
