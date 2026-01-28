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
  fee?: number,
  txid?: string // Add txid for debugging
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
    const inputValues: number[] = []
    const inputValue = vin.reduce((sum, input) => {
      if (input.prevout && input.prevout.value !== undefined) {
        inputValues.push(input.prevout.value)
        return sum + input.prevout.value
      }
      return sum
    }, 0)
    
    // If we have input values, use them (more accurate)
    if (inputValue > 0) {
      // [BlockUtils] Debug: Log details for high-value transactions
      if (inputValue > 1000) {
        const sampleInputs = vin.slice(0, 3).map((input, idx) => ({
          index: idx,
          hasPrevout: !!input.prevout,
          prevoutValue: input.prevout?.value,
        }))
        console.log('[BlockUtils] High-value transaction (using inputs):', {
          txid: txid || 'unknown',
          totalInputValue: inputValue,
          inputCount: vin.length,
          inputsWithValues: inputValues.length,
          sampleInputValues: inputValues.slice(0, 10), // First 10 input values
          sampleInputs: sampleInputs,
          averageInputValue: inputValues.length > 0 ? inputValue / inputValues.length : 0,
        })
      }
      
      // [BlockUtils] Sanity check: warn if value seems unreasonably high
      // Typical large transactions are < 10,000 BTC. If we see > 1,000,000, might be satoshis
      if (inputValue > 1000000) {
        console.warn('[BlockUtils] WARNING: Suspiciously high input value detected:', {
          txid: txid || 'unknown',
          value: inputValue,
          valueInBTC: inputValue,
          valueInSats: inputValue * 100000000,
          possibleIssue: inputValue > 100000000 ? 'Value might be in satoshis instead of BTC!' : 'Unusually large transaction',
          inputCount: vin.length,
          sampleInputValues: inputValues.slice(0, 5), // Only show first 5
        })
      }
      return inputValue
    }
  }

  // Fallback: if inputs aren't available (shouldn't happen with verbosity 3, but handle gracefully),
  // use the largest output value as approximation
  // Note: With verbosity 3, prevout data should be available for unpruned blocks
  if (vout && vout.length > 0) {
    const outputValues = vout.map(output => output.value || 0)
    const largestOutput = Math.max(...outputValues)
    
    // [BlockUtils] Debug: Log fallback calculation (should be rare with verbosity 3)
    if (largestOutput > 1000) {
      console.log('[BlockUtils] High-value transaction (using fallback - largest output):', {
        txid: txid || 'unknown',
        calculatedValue: largestOutput,
        outputCount: vout.length,
        allOutputValues: outputValues,
        largestOutput: largestOutput,
        sumOfAllOutputs: outputValues.reduce((a, b) => a + b, 0),
        fee: fee || 0,
        inputCount: vin?.length || 0,
        hasPrevoutValues: vin?.some(input => input.prevout?.value !== undefined) || false,
        note: 'Using largest output as approximation (prevout data not available)',
      })
    }
    
    // [BlockUtils] Sanity check for fallback value
    if (largestOutput > 1000000) {
      console.warn('[BlockUtils] WARNING: Suspiciously high fallback value detected:', {
        txid: txid || 'unknown',
        value: largestOutput,
        possibleIssue: largestOutput > 100000000 ? 'Value might be in satoshis instead of BTC!' : 'Unusually large transaction',
        outputCount: vout.length,
        sampleOutputValues: outputValues.slice(0, 5), // Only show first 5
      })
    }
    return largestOutput
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
    const value = calculateTransactionValue(tx.vin, tx.vout, tx.fee, tx.txid)

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
