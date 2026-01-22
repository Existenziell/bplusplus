import Image from 'next/image'
import Link from 'next/link'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'

export const metadata = {
  title: 'Bitcoin Whitepaper - B++',
  description: 'Bitcoin: A Peer-to-Peer Electronic Cash System by Satoshi Nakamoto',
}

export default function WhitepaperPage() {
  return (
    <main className="min-h-screen page-bg flex flex-col">
      <Header />

      <div className="container mx-auto px-4 md:px-8 py-8 md:py-12 flex-grow">
        <div className="max-w-3xl mx-auto">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Bitcoin Whitepaper
            </h1>
             {/* History */}
              <p className="text-center text-sm text-zinc-600 dark:text-zinc-400 max-w-lg mx-auto leading-relaxed mt-4">
                Satoshi Nakamoto announced the whitepaper on the{' '}
                <a
                  href="https://www.metzdowd.com/pipermail/cryptography/2008-October/014810.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-btc hover:underline"
                >
                  cryptography mailing list
                </a>
                {' '}on October 31, 2008.
                The Bitcoin network launched on January 3, 2009, when Satoshi mined the Genesis Block.
              </p>
          </div>

          {/* Whitepaper Image */}
          <div className="relative aspect-[3/4] w-full max-w-xl mx-auto mb-8 rounded-md overflow-hidden shadow-lg border border-zinc-200 dark:border-zinc-700">
            <Image
              src="/images/whitepaper.jpg"
              alt="Bitcoin Whitepaper Cover"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>

          {/* Download Button */}
          <div className="flex flex-col items-center gap-4">
            <a
              href="/data/bitcoin.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-btc hover:bg-btc/90 text-white font-semibold rounded-lg transition-colors shadow-md"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Open PDF
            </a>
            <p className="text-xs text-zinc-500 dark:text-zinc-500">
              Published October 31, 2008
            </p>
          </div>

          {/* Back Link */}
          <div className="mt-12 text-center">
            <Link
              href="/"
              className="text-btc hover:underline text-sm"
            >
              &larr; Back to Home
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
