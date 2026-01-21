import Link from 'next/link'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'

export const metadata = {
  title: '404 - Block Not Found | B++',
  description: 'The page you are looking for does not exist.',
}

export default function NotFound() {
  return (
    <main className="min-h-screen page-bg flex flex-col">
      <Header />
      
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          {/* 404 Number with Bitcoin styling */}
          <div className="mb-6">
            <span className="text-8xl md:text-9xl font-bold text-btc">4</span>
            <span className="text-8xl md:text-9xl font-bold text-zinc-300 dark:text-zinc-700">0</span>
            <span className="text-8xl md:text-9xl font-bold text-btc">4</span>
          </div>
          
          {/* Message */}
          <h1 className="text-2xl md:text-3xl font-bold mb-4 text-zinc-900 dark:text-zinc-100">
            Block Not Found
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mb-8">
            This page doesn&apos;t exist on the blockchain. Perhaps it was orphaned, or maybe it never existed in the first place.
          </p>
          
          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-btc text-zinc-900 font-semibold rounded-md hover:bg-btc/90 transition-colors hover:no-underline"
            >
              <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Back to Genesis
            </Link>
            <Link
              href="/docs/fundamentals/what-is-bitcoin"
              className="inline-flex items-center justify-center px-6 py-3 bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 font-semibold rounded-md hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors hover:no-underline"
            >
              Start Learning
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  )
}
