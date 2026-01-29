'use client'

import { formatNumber } from '@/app/utils/formatting'
import { formatBlockSize } from '@/app/utils/blockUtils'

interface BlockHeaderProps {
  height: number
  txCount: number
  size: number
}

export default function BlockHeader({
  height,
  txCount,
  size,
}: BlockHeaderProps) {
  return (
    <div className="bg-white dark:bg-gray-800 w-48 h-48 px-6 py-4 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Block Info */}
        <div className="flex-1">
          <div className="flex flex-col gap-2 mb-3">
            <div>
              <div className="text-secondary">Current Block</div>
              <div className="text-gray-800 dark:text-gray-200 font-semibold">
                {formatNumber(height)}
              </div>
            </div>
            <div>
              <div className="text-secondary">Transactions</div>
              <div className="text-gray-800 dark:text-gray-200 font-semibold">
                {formatNumber(txCount)}
              </div>
            </div>
            <div>
              <div className="text-secondary">Block Size</div>
              <div className="text-gray-800 dark:text-gray-200 font-semibold">
                {formatBlockSize(size)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
