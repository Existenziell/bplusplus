import { describe, it, expect } from 'vitest'
import { formatNumber, formatPrice, formatDifficulty, formatBytes } from '@/app/utils/formatting'

describe('formatNumber', () => {
  it('1234567 → "1,234,567"', () => {
    expect(formatNumber(1234567)).toBe('1,234,567')
  })
})

describe('formatPrice', () => {
  it('50000 includes $ and 50,000', () => {
    const result = formatPrice(50000)
    expect(result).toContain('$')
    expect(result).toContain('50')
    expect(result).toContain('000')
  })
})

describe('formatDifficulty', () => {
  it('1e12 → "1.00T"', () => {
    expect(formatDifficulty(1e12)).toBe('1.00T')
  })

  it('999 → "999"', () => {
    expect(formatDifficulty(999)).toBe('999')
  })
})

describe('formatBytes', () => {
  it('500 → "500 B"', () => {
    expect(formatBytes(500)).toBe('500 B')
  })

  it('1500 → "2 KB"', () => {
    expect(formatBytes(1500)).toBe('2 KB')
  })

  it('2e6 → "2.0 MB"', () => {
    expect(formatBytes(2e6)).toBe('2.0 MB')
  })
})
