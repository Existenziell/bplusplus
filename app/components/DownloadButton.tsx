'use client'

import { usePathname } from 'next/navigation'

// Pages that have downloadable MD content
const downloadablePaths = new Set([
  // Fundamentals
  '/docs/fundamentals/overview',
  '/docs/fundamentals/problems',
  '/docs/fundamentals/trilemma',
  '/docs/fundamentals/decentralization',
  '/docs/fundamentals/trust-model',
  '/docs/fundamentals/monetary-properties',
  '/docs/fundamentals/consensus',
  '/docs/fundamentals/cryptography',

  // History
  '/docs/history/overview',
  '/docs/history/halvings',
  '/docs/history/milestones',
  '/docs/history/forks',
  '/docs/history/supply',
  '/docs/history/bips',

  // Bitcoin
  '/docs/bitcoin/script',
  '/docs/bitcoin/op-codes',
  '/docs/bitcoin/rpc',
  '/docs/bitcoin/blocks',
  '/docs/bitcoin/subsidy',

  // Mining
  '/docs/mining/overview',
  '/docs/mining/proof-of-work',
  '/docs/mining/difficulty',
  '/docs/mining/economics',
  '/docs/mining/mempool',
  '/docs/mining/block-construction',
  '/docs/mining/pools',
  '/docs/mining/hardware',
  '/docs/mining/attacks',

  // Wallets
  '/docs/wallets/overview',
  '/docs/wallets/coin-selection',
  '/docs/wallets/multisig',
  '/docs/wallets/transactions',

  // Lightning
  '/docs/lightning/basics',
  '/docs/lightning/routing',
  '/docs/lightning/channels',
  '/docs/lightning/onion',

  // Development
  '/docs/development/getting-started',
  '/docs/development/monitoring',
  '/docs/development/mining',
  '/docs/development/tools',

  // Controversies
  '/docs/controversies/op-return',
  '/docs/controversies/blocksize-wars',
  '/docs/controversies/energy-consumption',
  '/docs/controversies/mt-gox',
  '/docs/controversies/craig-wright',

  // Glossary
  '/docs/glossary',
])

export default function DownloadButton() {
  const pathname = usePathname()

  // Don't show button if current page doesn't have downloadable content
  if (!downloadablePaths.has(pathname)) {
    return null
  }

  const handleDownload = () => {
    const downloadUrl = `/api/download-md?path=${encodeURIComponent(pathname)}`
    window.location.href = downloadUrl
  }

  return (
    <button
      onClick={handleDownload}
      className="inline-flex items-center gap-1 px-2 py-1 text-xs text-zinc-500 dark:text-zinc-500 hover:text-btc dark:hover:text-btc transition-colors"
      title="Download markdown file"
    >
      <svg
        className="w-3 h-3"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
        />
      </svg>
      <span>.md</span>
    </button>
  )
}
