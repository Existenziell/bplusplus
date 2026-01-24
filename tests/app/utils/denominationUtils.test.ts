import { describe, it, expect } from 'vitest'
import { toSats, fromSats, formatForUnit } from '@/app/utils/denominationUtils'

describe('toSats', () => {
  it('"1", "btc" → 100_000_000', () => {
    expect(toSats('1', 'btc')).toBe(100_000_000)
  })

  it('"1000", "sat" → 1000', () => {
    expect(toSats('1000', 'sat')).toBe(1000)
  })

  it('"0.5", "mbtc" → 50_000', () => {
    expect(toSats('0.5', 'mbtc')).toBe(50_000)
  })

  it('"", "btc" → null', () => {
    expect(toSats('', 'btc')).toBe(null)
  })

  it('"x", "btc" → null', () => {
    expect(toSats('x', 'btc')).toBe(null)
  })

  it('invalid unitId → null', () => {
    expect(toSats('1', 'unknown')).toBe(null)
  })
})

describe('fromSats', () => {
  it('100_000_000, "btc" → 1', () => {
    expect(fromSats(100_000_000, 'btc')).toBe(1)
  })

  it('100_000_000, "unknown" → 0', () => {
    expect(fromSats(100_000_000, 'unknown')).toBe(0)
  })
})

describe('formatForUnit', () => {
  it('1_234_567, "sat" (decimals 0) produces formatted number with commas', () => {
    const result = formatForUnit(1_234_567, 'sat')
    expect(result).toBe('1,234,567')
  })

  it('1.5, "btc" produces string with decimal digits', () => {
    const result = formatForUnit(1.5, 'btc')
    expect(result.length).toBeGreaterThan(0)
    expect(result).toMatch(/\d/)
  })
})
