import Image from 'next/image'
import Link from 'next/link'
import { DownloadPDFIcon, HomeIcon } from '@/app/components/Icons'

export default function WhitepaperPage() {
  return (
    <div className="max-w-4xl mx-auto">
          {/* Title */}
          <div className="text-center mb-6">
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

            {/* Download Button */}
            <div className="flex flex-col items-center mb-6">
            <a
              href="/data/bitcoin.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-btc hover:bg-btc/90 text-white font-semibold rounded-lg transition-colors shadow-md"
            >
              <DownloadPDFIcon />
              Open PDF
            </a>
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
  )
}
