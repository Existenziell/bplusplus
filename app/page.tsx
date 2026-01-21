import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/app/components/Footer'
import Header from '@/app/components/Header'
import QuoteRotator from '@/app/components/QuoteRotator'
import LiveStats from '@/app/components/LiveStats'
import HorizontalNav from '@/app/components/HorizontalNav'

export default function Home() {
  return (
    <main className="min-h-screen page-bg">
      <Header />

      {/* Hero Section */}
      <div className="bg-zinc-100 dark:bg-zinc-800/50 border-y border-zinc-200 dark:border-zinc-700">
        <div className="container mx-auto px-4 md:px-8 py-8 md:py-8">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <QuoteRotator />
            <div className="relative aspect-video overflow-hidden rounded-md border border-zinc-200 dark:border-zinc-700">
              <Image
                src="/images/hope.jpg"
                alt="Bitcoin inspiration"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Start Reading CTA */}
      <div className="container mx-auto px-4 md:px-8 py-8 md:py-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-1 text-zinc-900 dark:text-zinc-100">
            A Developer&apos;s Guide to Bitcoin
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            From fundamental concepts to advanced protocol implementations.<br />Open source and always free.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/docs/fundamentals/what-is-bitcoin"
              className="inline-flex items-center justify-center px-6 py-3 bg-btc text-zinc-900 font-semibold rounded-md hover:bg-btc/90 transition-colors hover:no-underline"
            >
              Start Reading
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/terminal"
              className="inline-flex items-center justify-center px-6 py-3 bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 font-semibold rounded-md hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors hover:no-underline"
            >
              Try the Terminal
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Horizontal Navigation */}
      <HorizontalNav />

      {/* Live Stats */}
      <LiveStats />

      <Footer />
    </main>
  )
}
