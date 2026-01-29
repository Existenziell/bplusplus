'use client'

import { formatNumber } from '@/app/utils/formatting'
import { formatBlockSize, formatBlockTimestamp, truncateHash } from '@/app/utils/blockUtils'
import copyToClipboard from '@/app/utils/copyToClipboard'
import { CopyIcon } from '@/app/components/Icons'

interface BlockHeaderProps {
  height: number
  hash: string
  timestamp: number
  txCount: number
  size: number
  compact?: boolean
  lastUpdated?: Date
  isRefreshing?: boolean
  miner?: string
  isTemplate?: boolean
}

export default function BlockHeader({
  height,
  hash,
  timestamp,
  txCount,
  size,
  compact = false,
  lastUpdated,
  isRefreshing = false,
  miner,
  isTemplate = false,
}: BlockHeaderProps) {
  const handleCopyHash = () => {
    copyToClipboard(hash, 'Block hash')
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Block Info */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <h2 className="text-2xl font-bold text-btc">{formatNumber(height)}</h2>
          </div>
          
          <div className="flex flex-col gap-2">
            {!isTemplate && (
              <>
                <div>
                  <div className="text-secondary mb-1">Hash</div>
                  <div className="flex items-center gap-2">
                    <code className="font-mono text-gray-800 dark:text-gray-200 break-all">
                      {truncateHash(hash)}
                    </code>
                    <button
                      onClick={handleCopyHash}
                      className="p-1 text-secondary hover:text-btc transition-colors"
                      aria-label="Copy block hash"
                      title="Copy full hash"
                    >
                      <CopyIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div>
                  <div className="text-secondary mb-1">Timestamp</div>
                  <div className="text-gray-800 dark:text-gray-200">
                    {formatBlockTimestamp(timestamp)}
                  </div>
                </div>
                <div>
                  <div className="text-secondary mb-1">Miner</div>
                  <div className="text-gray-800 dark:text-gray-200">{miner ?? '—'}</div>
                </div>
              </>
            )}
            <div>
              <div className="text-secondary mb-1">Transactions</div>
              <div className="text-gray-800 dark:text-gray-200 font-semibold">
                {formatNumber(txCount)}
              </div>
            </div>
            
            <div>
              <div className="text-secondary mb-1">Block Size</div>
              <div className="text-gray-800 dark:text-gray-200 font-semibold">
                {formatBlockSize(size)}
              </div>
            </div>
            {lastUpdated && (
              <div className="text-xs text-secondary text-right md:text-left">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
