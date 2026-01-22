import Image from 'next/image'
import Link from 'next/link'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import { DownloadPDFIcon, HomeIcon } from '@/app/components/Icons'

export const metadata = {
  title: 'Bitcoin Whitepaper - B++',
  description: 'Bitcoin: A Peer-to-Peer Electronic Cash System by Satoshi Nakamoto',
}

export default function WhitepaperPage() {
  return (
    <main className="min-h-screen page-bg flex flex-col">
      <Header />

      <div className="container-content py-8 md:py-12 flex-grow">
        <div className="max-w-3xl mx-auto">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="heading-page text-center mb-2">
              Bitcoin Whitepaper
            </h1>
             {/* History */}
              <p className="text-center text-sm text-secondary max-w-lg mx-auto leading-relaxed mt-4">
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
              <DownloadPDFIcon />
              Open PDF
            </a>
            <p className="text-xs text-zinc-500 dark:text-zinc-500">
              Published October 31, 2008
            </p>
          </div>

          {/* Back Link */}
          <div className="mt-12 text-center flex flex-row items-center justify-center gap-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-btc hover:underline transition-colors"
            >
              <HomeIcon />
              <span>Back Home</span>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
