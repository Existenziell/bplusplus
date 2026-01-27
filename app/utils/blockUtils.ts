/**
 * Block data processing utilities for blockchain visualization.
 * Transforms Bitcoin RPC responses into formats suitable for visualization.
 */

export interface ProcessedTransaction {
  txid: string
  vsize: number // Virtual size in vBytes
  fee: number // Fee in BTC
  feeRate: number // Fee rate in sat/vB
  value: number // Total output value in BTC
}

export interface ProcessedBlock {
  height: number
  hash: string
  timestamp: number
  size: number
  txCount: number
  transactions: ProcessedTransaction[]
}

/**
 * Calculate fee rate in sat/vB from transaction data.
 */
export function calculateTransactionFeeRate(tx: {
  vsize: number
  fee?: number
}): number {
  if (!tx.fee || tx.vsize === 0) {
    return 0
  }
  // Fee is in BTC, convert to sats and divide by vsize
  return Math.round((tx.fee * 100000000) / tx.vsize)
}

/**
 * Calculate total output value from transaction outputs.
 */
export function calculateTransactionValue(vout: Array<{ value?: number }>): number {
  if (!vout || vout.length === 0) {
    return 0
  }
  return vout.reduce((sum, output) => sum + (output.value || 0), 0)
}

/**
 * Process raw block data from RPC into visualization format.
 */
export function processBlockData(block: {
  height: number
  hash: string
  time: number
  size: number
  tx: Array<{
    txid: string
    vsize: number
    fee?: number
    vout: Array<{ value?: number }>
  }>
}): ProcessedBlock {
  const transactions: ProcessedTransaction[] = block.tx.map((tx) => {
    const feeRate = calculateTransactionFeeRate(tx)
    const value = calculateTransactionValue(tx.vout)

    return {
      txid: tx.txid,
      vsize: tx.vsize,
      fee: tx.fee || 0,
      feeRate,
      value,
    }
  })

  return {
    height: block.height,
    hash: block.hash,
    timestamp: block.time,
    size: block.size,
    txCount: block.tx.length,
    transactions,
  }
}

/**
 * Format block size for display.
 */
export function formatBlockSize(bytes: number): string {
  if (bytes >= 1e6) {
    return `${(bytes / 1e6).toFixed(2)} MB`
  }
  if (bytes >= 1e3) {
    return `${(bytes / 1e3).toFixed(0)} KB`
  }
  return `${bytes} B`
}

/**
 * Format timestamp to readable date string.
 */
export function formatBlockTimestamp(timestamp: number): string {
  const date = new Date(timestamp * 1000)
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
  })
}

/**
 * Truncate hash for display (first 8...last 8 characters).
 */
export function truncateHash(hash: string, startLength = 8, endLength = 8): string {
  if (hash.length <= startLength + endLength) {
    return hash
  }
  return `${hash.slice(0, startLength)}...${hash.slice(-endLength)}`
}
