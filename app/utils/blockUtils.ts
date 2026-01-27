/**
 * Block data processing utilities for blockchain visualization.
 * Transforms Bitcoin RPC responses into formats suitable for visualization.
 */

export interface ProcessedTransaction {
  txid: string
  vsize: number // Virtual size in vBytes
  fee: number // Fee in BTC
  feeRate: number // Fee rate in sat/vB
  value: number // Total input value in BTC (economic value being moved)
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
 * Calculate total input value from transaction inputs.
 * This represents the total economic value being moved in the transaction.
 * For coinbase transactions (which have no inputs), returns the output value.
 */
export function calculateTransactionValue(
  vin: Array<{ prevout?: { value?: number }; coinbase?: string }> | undefined,
  vout: Array<{ value?: number }> | undefined,
  fee?: number
): number {
  // For coinbase transactions (first tx in block, has coinbase field instead of inputs)
  // Use output value (block reward + fees)
  if (vin && vin.length > 0 && vin[0].coinbase) {
    if (!vout || vout.length === 0) {
      return 0
    }
    return vout.reduce((sum, output) => sum + (output.value || 0), 0)
  }

  // For regular transactions, calculate from inputs (total value being moved)
  // This is more accurate than summing outputs, which includes change
  if (vin && vin.length > 0) {
    const inputValue = vin.reduce((sum, input) => {
      if (input.prevout && input.prevout.value !== undefined) {
        return sum + input.prevout.value
      }
      return sum
    }, 0)
    
    // If we have input values, use them (more accurate)
    if (inputValue > 0) {
      return inputValue
    }
  }

  // Fallback: if inputs aren't available, calculate from outputs + fee
  // This approximates input value but is less accurate
  if (vout && vout.length > 0) {
    const outputValue = vout.reduce((sum, output) => sum + (output.value || 0), 0)
    // Add fee to get approximate input value
    return outputValue + (fee || 0)
  }

  return 0
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
    vin?: Array<{ prevout?: { value?: number }; coinbase?: string }>
    vout: Array<{ value?: number }>
  }>
}): ProcessedBlock {
  const transactions: ProcessedTransaction[] = block.tx.map((tx) => {
    const feeRate = calculateTransactionFeeRate(tx)
    const value = calculateTransactionValue(tx.vin, tx.vout, tx.fee)

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
