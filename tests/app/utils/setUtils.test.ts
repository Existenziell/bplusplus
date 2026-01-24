import { describe, it, expect } from 'vitest'
import { toggleInSet } from '@/app/utils/setUtils'

describe('toggleInSet', () => {
  it('adds value when absent', () => {
    const set = new Set([1, 2])
    const result = toggleInSet(set, 3)
    expect(result.has(3)).toBe(true)
    expect(result.size).toBe(3)
    expect(set.has(3)).toBe(false) // original unchanged
  })

  it('removes value when present', () => {
    const set = new Set([1, 2, 3])
    const result = toggleInSet(set, 2)
    expect(result.has(2)).toBe(false)
    expect(result.size).toBe(2)
    expect(set.has(2)).toBe(true) // original unchanged
  })

  it('works with empty set', () => {
    const set = new Set<number>()
    const result = toggleInSet(set, 1)
    expect(result.has(1)).toBe(true)
    expect(result.size).toBe(1)
  })
})
