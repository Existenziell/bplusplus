import { describe, it, expect } from 'vitest'
import { excerpt, parsePeopleSections } from '@/scripts/lib/search-index-helpers.js'

describe('excerpt', () => {
  it('returns as-is when short or under maxLen', () => {
    expect(excerpt('Short.')).toBe('Short.')
    expect(excerpt('x'.repeat(100), 500)).toBe('x'.repeat(100))
  })
  it('returns empty string for null/undefined', () => {
    expect(excerpt(null)).toBe('')
    expect(excerpt(undefined)).toBe('')
  })
  it('truncates at sentence or word boundary when over maxLen', () => {
    const long = 'First. Second. ' + 'a'.repeat(500)
    const out = excerpt(long, 50)
    expect(out.length).toBeLessThan(long.length)
    expect(out.length).toBeLessThanOrEqual(51)
  })
  it('appends … when cutting at word boundary (no . or space in second half)', () => {
    const noLateSpace = 'one two three ' + 'a'.repeat(400)
    const out = excerpt(noLateSpace, 30)
    expect(out.endsWith('…')).toBe(true)
  })
})

describe('parsePeopleSections', () => {
  it('returns [] for null or empty', () => {
    expect(parsePeopleSections(null)).toEqual([])
    expect(parsePeopleSections('')).toEqual([])
  })
  it('splits on ## and extracts slug, title, body', () => {
    const md = `Intro text.

## Alice

Alice bio here.

## Bob

Bob bio.`
    const sections = parsePeopleSections(md)
    expect(sections.length).toBe(2)
    expect(sections[0].slug).toBe('alice')
    expect(sections[0].title).toBe('Alice')
    expect(sections[0].body).toContain('Alice bio')
    expect(sections[1].slug).toBe('bob')
    expect(sections[1].title).toBe('Bob')
    expect(sections[1].body).toContain('Bob bio')
  })
  it('filters out slug "you"', () => {
    const md = `## You

Your entry.`
    const sections = parsePeopleSections(md)
    expect(sections.length).toBe(0)
  })
})
