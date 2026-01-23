'use client'

import { useState, useEffect, memo } from 'react'
import Link from 'next/link'
import copyToClipboard from '@/app/utils/copyToClipboard'
import { formatNumber, formatPrice, formatDifficulty, formatBytes } from '@/app/utils/formatting'

const BTC_HEX = '#f2a900'

interface BlockchainInfo {
  blocks: number
  difficulty: number
  bestblockhash: string
}

interface MempoolInfo {
  size: number
  bytes: number
}

interface StatItem {
  label: string
  value: string | null
  href?: string
  external?: boolean
  onClick?: () => void
}

export default function LiveStats() {
  const [btcPrice, setBtcPrice] = useState<number | null>(null)
  const [satsPerUSD, setSatsPerUSD] = useState<number>(0)
  const [blockchainInfo, setBlockchainInfo] = useState<BlockchainInfo | null>(null)
  const [mempoolInfo, setMempoolInfo] = useState<MempoolInfo | null>(null)
  const [feeRate, setFeeRate] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all data in parallel
        const [priceRes, blockchainRes, mempoolRes, feeRes] = await Promise.all([
          fetch('/api/btc-price'),
          fetch('/api/bitcoin-rpc', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ method: 'getblockchaininfo' }),
          }),
          fetch('/api/bitcoin-rpc', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ method: 'getmempoolinfo' }),
          }),
          fetch('/api/bitcoin-rpc', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ method: 'estimatesmartfee', params: [6] }), // Target 6 blocks (~1 hour)
          }),
        ])

        const priceData = await priceRes.json()
        const blockchainData = await blockchainRes.json()
        const mempoolData = await mempoolRes.json()
        const feeData = await feeRes.json()

        if (priceData.price) {
          setBtcPrice(priceData.price)
          setSatsPerUSD(Math.round(100000000 / priceData.price))
        }

        if (blockchainData.result) {
          setBlockchainInfo(blockchainData.result)
        }

        if (mempoolData.result) {
          setMempoolInfo(mempoolData.result)
        }

        // Fee is returned in BTC/kvB, convert to sat/vB
        if (feeData.result?.feerate) {
          const satPerVb = Math.round(feeData.result.feerate * 100000) // BTC/kvB to sat/vB
          setFeeRate(satPerVb)
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const stats: StatItem[] = [
    {
      label: 'Block Height',
      value: blockchainInfo?.blocks ? formatNumber(blockchainInfo.blocks) : null,
      href: '/docs/mining/block-construction',
    },
    {
      label: 'Fee Rate',
      value: feeRate ? `${feeRate} sat/vB` : null,
      href: '/docs/bitcoin/transaction-fees',
    },
    {
      label: 'Difficulty',
      value: blockchainInfo?.difficulty ? formatDifficulty(blockchainInfo.difficulty) : null,
      href: '/docs/mining/difficulty',
    },
    {
      label: 'Mempool Txs',
      value: mempoolInfo?.size ? formatNumber(mempoolInfo.size) : null,
      href: '/docs/bitcoin/rpc#3-mempool-information',
    },
    {
      label: 'Mempool Size',
      value: mempoolInfo?.bytes ? formatBytes(mempoolInfo.bytes) : null,
      href: '/docs/mining/block-construction',
    },
    {
      label: 'Hex',
      value: BTC_HEX,
      onClick: () => copyToClipboard(BTC_HEX, BTC_HEX),
    },
    {
      label: 'BTC/USD',
      value: btcPrice ? formatPrice(btcPrice) : null,
      href: '/docs/bitcoin-development/price-tracking',
    },
    {
      label: 'Sats/USD',
      value: satsPerUSD ? formatNumber(satsPerUSD) : null,
      href: '/docs/glossary#sat-satoshi',
    },
  ]

  const StatCard = memo(({ stat }: { stat: StatItem }) => {
    const content = (
      <>
        <div className="text-sm md:text-xl font-bold text-btc min-h-[2rem] flex items-center justify-center" aria-live="polite" aria-atomic="true">
          {loading && !stat.value ? (
            <span className="animate-pulse text-zinc-400" aria-label="Loading">...</span>
          ) : stat.value ? (
            stat.value
          ) : (
            <span className="text-zinc-400" aria-label="No data available">—</span>
          )}
        </div>
        <div className="text-xs text-zinc-500 dark:text-zinc-400 group-hover:text-btc transition-colors">
          {stat.label}
        </div>
      </>
    )

    const className = "bg-white dark:bg-zinc-800 rounded-md p-4 text-center shadow-sm hover:shadow-md transition-shadow hover:no-underline group"

    if (stat.onClick) {
      return (
        <button
          onClick={stat.onClick}
          className={`${className} cursor-pointer w-full`}
          aria-label={`${stat.label}: ${stat.value || 'Click to copy'}`}
        >
          {content}
        </button>
      )
    }

    if (stat.href) {
      if (stat.external) {
        return (
          <a
            href={stat.href}
            target="_blank"
            rel="noopener noreferrer"
            className={className}
            aria-label={`${stat.label}: ${stat.value || 'No data'} (opens in new tab)`}
          >
            {content}
          </a>
        )
      }
      return (
        <Link
          href={stat.href}
          className={className}
          aria-label={`${stat.label}: ${stat.value || 'No data'}`}
        >
          {content}
        </Link>
      )
    }

    return (
      <div className={className} role="status" aria-label={`${stat.label}: ${stat.value || 'No data'}`}>
        {content}
      </div>
    )
  })

  StatCard.displayName = 'StatCard'

  return (
    <div className="container-content py-8 md:py-12">
      <h3 className="heading-section text-center mb-4 text-zinc-500 dark:text-zinc-300">
        Live Network Stats
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-8 gap-4 mb-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>
    </div>
  )
}
