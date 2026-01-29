import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import {
  getTodayBitcoinEvent,
  BITCOIN_HISTORY_EVENTS,
} from '@/app/utils/bitcoinHistoryDates'

describe('getTodayBitcoinEvent', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns null when today matches no event', () => {
    vi.setSystemTime(new Date('2026-01-29'))

    const result = getTodayBitcoinEvent()

    expect(result).toBeNull()
  })

  it('returns exact-year event when today matches a dated event', () => {
    vi.setSystemTime(new Date('2024-04-20'))

    const result = getTodayBitcoinEvent()

    expect(result).not.toBeNull()
    expect(result?.eventName).toBe('Fourth Bitcoin Halving')
    expect(result?.year).toBe(2024)
    expect(result?.month).toBe(4)
    expect(result?.day).toBe(20)
  })

  it('returns null for same month/day but different year when event has year', () => {
    vi.setSystemTime(new Date('2026-04-20'))

    const result = getTodayBitcoinEvent()

    expect(result).toBeNull()
  })

  it('returns annual event when today matches month/day and event has no year', () => {
    vi.setSystemTime(new Date('2026-05-22'))

    const result = getTodayBitcoinEvent()

    expect(result).not.toBeNull()
    expect(result?.eventName).toBe('Pizza Day')
    expect(result?.year).toBeUndefined()
    expect(result?.month).toBe(5)
    expect(result?.day).toBe(22)
  })

  it('returns Birthday Bitcoin on Jan 3 (annual)', () => {
    vi.setSystemTime(new Date('2026-01-03'))

    const result = getTodayBitcoinEvent()

    expect(result).not.toBeNull()
    expect(result?.eventName).toBe('Birthday Bitcoin')
    expect(result?.year).toBeUndefined()
  })

  it('returns First Bitcoin Transaction Day on Jan 12, 2009 only', () => {
    vi.setSystemTime(new Date('2009-01-12'))

    const result = getTodayBitcoinEvent()

    expect(result).not.toBeNull()
    expect(result?.eventName).toBe('First Bitcoin Transaction Day')
    expect(result?.year).toBe(2009)
  })

  it('returns null on Jan 12 for non-2009 year', () => {
    vi.setSystemTime(new Date('2026-01-12'))

    const result = getTodayBitcoinEvent()

    expect(result).toBeNull()
  })

  it('prioritizes exact year match over annual when same date exists', () => {
    vi.setSystemTime(new Date('2008-10-31'))

    const result = getTodayBitcoinEvent()

    expect(result).not.toBeNull()
    expect(result?.eventName).toBe('Bitcoin Whitepaper Day')
    expect(result?.year).toBe(2008)
  })
})

describe('BITCOIN_HISTORY_EVENTS', () => {
  it('contains events', () => {
    expect(BITCOIN_HISTORY_EVENTS.length).toBeGreaterThan(0)
  })
})
