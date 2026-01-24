import Image from 'next/image'
import Link from 'next/link'
import { DownloadPDFIcon } from '@/app/components/Icons'

const relatedTopics = [
  { href: '/docs/fundamentals/problems', title: 'Problems Bitcoin Solved', description: 'The fundamental challenges the whitepaper addresses' },
  { href: '/docs/fundamentals/blockchain', title: 'The Blockchain', description: 'How blocks are cryptographically chained, as described in the whitepaper' },
  { href: '/docs/mining/proof-of-work', title: 'Proof of Work', description: 'The mining mechanism that secures the network' },
  { href: '/docs/bitcoin/consensus', title: 'Consensus', description: 'How the network agrees on a single transaction history' },
  { href: '/docs/history/people#satoshi-nakamoto', title: 'Satoshi Nakamoto', description: 'The anonymous creator of the whitepaper' },
  { href: '/docs/fundamentals/cypherpunk-philosophy', title: 'Cypherpunk Philosophy', description: 'The intellectual roots of Bitcoin' },
]

export default function WhitepaperPage() {
  return (
    <div className="max-w-4xl mx-auto">
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

      {/* Related Topics */}
      <section className="mt-20 pt-8 border-t border-zinc-200 dark:border-zinc-700">
        <h2 className="text-xl font-semibold mb-4">Related Topics</h2>
        <ul className="space-y-2">
          {relatedTopics.map(({ href, title, description }) => (
            <li key={href}>
              <Link
                href={href}
                className="text-btc hover:underline font-medium"
              >
                {title}
              </Link>
              <span className="text-secondary"> — {description}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
