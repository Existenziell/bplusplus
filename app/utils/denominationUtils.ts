/**
 * Bitcoin denomination conversion utilities.
 * All math uses satoshis as the base; units match the Monetary Properties table.
 */

import { formatNumber } from './formatting'

export interface DenomUnit {
  id: string
  label: string
  name: string
  satsPerUnit: number
  decimals: number
}

export const UNITS: DenomUnit[] = [
  { id: 'sat', label: 'Satoshi', name: 'Satoshi', satsPerUnit: 1, decimals: 0 },
  { id: 'ubtc', label: 'µBTC', name: 'Microbit', satsPerUnit: 100, decimals: 2 },
  { id: 'mbtc', label: 'mBTC', name: 'Millibit', satsPerUnit: 100_000, decimals: 5 },
  { id: 'cbtc', label: 'cBTC', name: 'Centibit', satsPerUnit: 1_000_000, decimals: 6 },
  { id: 'dbtc', label: 'dBTC', name: 'Decibit', satsPerUnit: 10_000_000, decimals: 7 },
  { id: 'btc', label: 'BTC', name: 'Bitcoin', satsPerUnit: 100_000_000, decimals: 8 },
  { id: 'dabtc', label: 'daBTC', name: 'DecaBit', satsPerUnit: 1_000_000_000, decimals: 9 },
  { id: 'hbtc', label: 'hBTC', name: 'Hectobit', satsPerUnit: 10_000_000_000, decimals: 10 },
  { id: 'kbtc', label: 'kBTC', name: 'Kilobit', satsPerUnit: 100_000_000_000, decimals: 11 },
  { id: 'mbtc_big', label: 'MBTC', name: 'Megabit', satsPerUnit: 100_000_000_000_000, decimals: 14 },
]

const UNIT_MAP = new Map(UNITS.map((u) => [u.id, u]))

function parseValue(value: string): number | null {
  const stripped = value.trim().replace(/,/g, '')
  if (stripped === '') return null
  const n = parseFloat(stripped)
  if (Number.isNaN(n) || !Number.isFinite(n)) return null
  return n
}

/**
 * Convert a user input (string) in the given unit to satoshis.
 * Returns null for empty, invalid, or infinite input.
 */
export function toSats(value: string, unitId: string): number | null {
  const parsed = parseValue(value)
  if (parsed === null) return null
  const unit = UNIT_MAP.get(unitId)
  if (!unit) return null
  return parsed * unit.satsPerUnit
}

/**
 * Convert satoshis to the given unit.
 */
export function fromSats(sats: number, unitId: string): number {
  const unit = UNIT_MAP.get(unitId)
  if (!unit) return 0
  return sats / unit.satsPerUnit
}

/**
 * Format a numeric value in the given unit for display (decimals, thousand separators).
 */
export function formatForUnit(value: number, unitId: string): string {
  const unit = UNIT_MAP.get(unitId)
  if (!unit) return String(value)
  const { decimals } = unit
  if (decimals === 0) {
    return formatNumber(Math.round(value))
  }
  return value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: decimals })
}
