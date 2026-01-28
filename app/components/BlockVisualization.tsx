'use client'

import { useState, useEffect, useCallback } from 'react'
import { bitcoinRpc } from '@/app/utils/bitcoinRpc'
import { processBlockData, ProcessedBlock } from '@/app/utils/blockUtils'
import BlockHeader from '@/app/components/BlockHeader'
import TransactionTreemap from '@/app/components/TransactionTreemap'

interface BlockVisualizationProps {
  initialBlockHash?: string
}

export default function BlockVisualization({ initialBlockHash }: BlockVisualizationProps) {
  const [blockData, setBlockData] = useState<ProcessedBlock | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [currentBlockHash, setCurrentBlockHash] = useState<string | null>(initialBlockHash || null)
  const [showNewBlockNotification, setShowNewBlockNotification] = useState(false)
  const [newBlockHeight, setNewBlockHeight] = useState<number | null>(null)

  const fetchBlockData = useCallback(async (blockHash: string) => {
    try {
      setIsRefreshing(true)
      setError(null)

      // Fetch full block with transactions and prevout data (verbosity 3)
      // Verbosity 2 doesn't include prevout data, verbosity 3 does (requires undo info)
      const blockResponse = await bitcoinRpc('getblock', [blockHash, 3])

      if (blockResponse.error) {
        throw new Error(blockResponse.error.message || 'Failed to fetch block data')
      }

      const rawBlock = blockResponse.result as {
        height: number
        hash: string
        time: number
        size: number
        tx: Array<{
          txid: string
          vsize: number
          fee?: number
          vin?: Array<{ prevout?: { value?: number }; coinbase?: string }>
          vout: Array<{ value?: number }>
        }>
      }

      const processed = processBlockData(rawBlock)
      
      // Check if this is a new block (not initial load)
      const isNewBlock = currentBlockHash !== null && blockHash !== currentBlockHash
      
      if (isNewBlock) {
        // Show new block notification
        setNewBlockHeight(processed.height)
        setShowNewBlockNotification(true)
        
        // Hide notification after animation completes
        setTimeout(() => {
          setShowNewBlockNotification(false)
        }, 3000) // Show for 3 seconds
      }
      
      setBlockData(processed)
      setCurrentBlockHash(blockHash)
      setLastUpdated(new Date())
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch block data'
      setError(errorMessage)
      console.error('Error fetching block data:', err)
    } finally {
      setLoading(false)
      setIsRefreshing(false)
    }
  }, [])

  const fetchLatestBlock = useCallback(async () => {
    try {
      const chainInfo = await bitcoinRpc('getblockchaininfo')

      if (chainInfo.error) {
        throw new Error(chainInfo.error.message || 'Failed to fetch blockchain info')
      }

      const bestBlockHash = (chainInfo.result as { bestblockhash: string }).bestblockhash

      // Only fetch if block hash changed
      if (bestBlockHash !== currentBlockHash) {
        await fetchBlockData(bestBlockHash)
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch latest block'
      setError(errorMessage)
      console.error('Error fetching latest block:', err)
    }
  }, [currentBlockHash, fetchBlockData])

  // Initial load
  useEffect(() => {
    if (initialBlockHash) {
      fetchBlockData(initialBlockHash)
    } else {
      fetchLatestBlock()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Only run on mount

  // Auto-refresh polling
  useEffect(() => {
    const interval = setInterval(() => {
      fetchLatestBlock()
    }, 30000) // Poll every 30 seconds

    return () => clearInterval(interval)
  }, [fetchLatestBlock])

  if (loading && !blockData) {
    return (
      <div className="w-full flex items-center justify-start py-12">
        <div className="text-center">
          <div className="animate-pulse text-btc text-lg mb-2">Loading block data...</div>
          <div className="text-secondary text-sm">Fetching latest block from blockchain</div>
        </div>
      </div>
    )
  }

  if (error && !blockData) {
    return (
      <div className="w-full flex items-center justify-center py-12">
        <div className="text-center">
          <div className="text-red-600 dark:text-red-400 text-lg mb-2">Error</div>
          <div className="text-secondary text-sm mb-4">{error}</div>
          <button
            onClick={() => fetchLatestBlock()}
            className="btn-primary"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  if (!blockData) {
    return null
  }

  return (
    <div className="space-y-6 relative">
      {/* New Block Notification */}
      {showNewBlockNotification && newBlockHeight !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl border-2 border-btc max-w-md w-full mx-4 animate-scaleIn">
            <div className="text-center">
              {/* Animated Block Icon */}
              <div className="mb-6 flex justify-center">
                <div className="relative">
                  <div className="w-20 h-20 bg-btc rounded-lg shadow-lg animate-bounce flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    </svg>
                  </div>
                  {/* Pulse effect */}
                  <div className="absolute inset-0 w-20 h-20 bg-btc rounded-lg opacity-20 animate-ping"></div>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-btc mb-2">New Block Mined!</h3>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-1">
                Block #{newBlockHeight.toLocaleString()}
              </p>
              <p className="text-sm text-secondary">Loading block data...</p>
            </div>
          </div>
        </div>
      )}

      <BlockHeader
        height={blockData.height}
        hash={blockData.hash}
        timestamp={blockData.timestamp}
        txCount={blockData.txCount}
        size={blockData.size}
        lastUpdated={lastUpdated || undefined}
        isRefreshing={isRefreshing}
      />

      <TransactionTreemap transactions={blockData.transactions} />

      {error && blockData && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 text-sm text-yellow-800 dark:text-yellow-200">
          <div className="font-semibold mb-1">Warning</div>
          <div>{error}</div>
        </div>
      )}
    </div>
  )
}
