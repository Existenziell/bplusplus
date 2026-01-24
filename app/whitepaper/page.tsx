import Image from 'next/image'
import { DownloadPDFIcon } from '@/app/components/Icons'

export default function WhitepaperPage() {
  return (
    <div>
      {/* Title */}
      <div className="text-center mb-6">
        <h1 className="heading-page text-center">
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
          className="btn-primary"
        >
          <DownloadPDFIcon />
          Open PDF
        </a>
      </div>

      {/* Whitepaper Image */}
      <div className="relative aspect-[3/4] w-full max-w-xl mx-auto mb-8 rounded-md overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
        <Image
          src="/images/whitepaper.jpg"
          alt="Bitcoin Whitepaper Cover"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 768px"
          priority
        />
      </div>
    </div>
  )
}
