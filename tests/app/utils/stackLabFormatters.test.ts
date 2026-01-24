import { describe, it, expect } from 'vitest'
import {
  bytesToHex,
  formatStackItem,
  parseStackItem,
} from '@/app/utils/stackLabFormatters'

describe('bytesToHex', () => {
  it('Uint8Array([0xab, 0xcd]) → "abcd"', () => {
    expect(bytesToHex(new Uint8Array([0xab, 0xcd]))).toBe('abcd')
  })

  it('with maxBytes: 1 returns only first byte', () => {
    expect(bytesToHex(new Uint8Array([0xab, 0xcd]), 1)).toBe('ab')
  })
})

describe('formatStackItem', () => {
  it('formats number', () => {
    expect(formatStackItem(42)).toBe('42')
  })

  it('formats boolean', () => {
    expect(formatStackItem(true)).toBe('true')
    expect(formatStackItem(false)).toBe('false')
  })

  it('formats short string as-is', () => {
    expect(formatStackItem('hello')).toBe('hello')
  })

  it('truncates long 0x string', () => {
    const long = '0x123456789012345678901234567890'
    expect(formatStackItem(long)).toMatch(/^0x[\da-f]+\.\.\.$/)
    expect(formatStackItem(long).length).toBeLessThan(long.length)
  })

  it('formats Uint8Array', () => {
    const arr = new Uint8Array([0xab, 0xcd, 0xef])
    expect(formatStackItem(arr)).toMatch(/^0x[\da-f]+$/)
    expect(formatStackItem(arr)).toBe('0xabcdef')
  })
})

describe('parseStackItem', () => {
  it('" 42 " → 42', () => {
    expect(parseStackItem(' 42 ')).toBe(42)
  })

  it('"hello" → "hello"', () => {
    expect(parseStackItem('hello')).toBe('hello')
  })

  it('"" → null', () => {
    expect(parseStackItem('')).toBe(null)
  })

  it('"   " → null', () => {
    expect(parseStackItem('   ')).toBe(null)
  })
})
