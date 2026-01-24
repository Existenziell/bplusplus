import { describe, it, expect } from 'vitest'
import { generateSlug } from '@/scripts/lib/slug.js'

describe('generateSlug', () => {
  it('converts "Satoshi Nakamoto" to "satoshi-nakamoto"', () => {
    expect(generateSlug('Satoshi Nakamoto')).toBe('satoshi-nakamoto')
  })

  it('keeps hyphen in "SHA-256"', () => {
    expect(generateSlug('SHA-256')).toBe('sha-256')
  })

  it('trims and collapses spaces in "  spaces  "', () => {
    expect(generateSlug('  spaces  ')).toBe('spaces')
  })

  it('lowercases "CamelCase"', () => {
    expect(generateSlug('CamelCase')).toBe('camelcase')
  })

  it('collapses trailing hyphens in "Trailing--hyphens---"', () => {
    expect(generateSlug('Trailing--hyphens---')).toBe('trailing-hyphens')
  })

  it('lowercases "UPPER"', () => {
    expect(generateSlug('UPPER')).toBe('upper')
  })

  it('strips special chars in "Special!@#chars"', () => {
    expect(generateSlug('Special!@#chars')).toBe('specialchars')
  })

  it('returns empty string for ""', () => {
    expect(generateSlug('')).toBe('')
  })
})
