import { describe, it, expect } from 'vitest'
import { normalize, rank, snippet, search } from '@/app/utils/searchLogic'
import type { IndexEntry } from '@/app/utils/searchLogic'

describe('normalize', () => {
  it('"  Foo-Bar  " → "foobar"', () => {
    expect(normalize('  Foo-Bar  ')).toBe('foobar')
  })
})

describe('rank', () => {
  it('returns 3 when normalized title equals query', () => {
    const rec: IndexEntry = { path: '/a', title: 'Exact Title', section: 's', body: 'x' }
    expect(rank(rec, 'exacttitle')).toBe(3)
  })

  it('returns 3 when a keyword matches query', () => {
    const rec: IndexEntry = {
      path: '/a',
      title: 'Other',
      section: 's',
      body: 'x',
      keywords: ['exactkey'],
    }
    expect(rank(rec, 'exactkey')).toBe(3)
  })

  it('returns 2 when title includes query', () => {
    const rec: IndexEntry = { path: '/a', title: 'Partial Match Here', section: 's', body: 'x' }
    expect(rank(rec, 'partial')).toBe(2)
  })

  it('returns 1 when no title or keyword match', () => {
    const rec: IndexEntry = { path: '/a', title: 'Other', section: 's', body: 'x' }
    expect(rank(rec, 'nomatch')).toBe(1)
  })
})

describe('snippet', () => {
  it('returns body when short', () => {
    expect(snippet('Short.')).toBe('Short.')
  })

  it('truncates with … when long', () => {
    const long = 'a'.repeat(200)
    const result = snippet(long)
    expect(result.length).toBeLessThan(long.length)
    expect(result.endsWith('…')).toBe(true)
  })
})

describe('search', () => {
  const fixture: IndexEntry[] = [
    { path: '/docs/bitcoin', title: 'Bitcoin Protocol', section: 'bitcoin', body: 'The Bitcoin protocol overview. Bitcoin.' },
    { path: '/docs/fundamentals', title: 'Fundamentals', section: 'fundamentals', body: 'Bitcoin fundamentals. Learn about Bitcoin.' },
    { path: '/other', title: 'Other', section: 'x', body: 'No bitcoin here.' },
  ]

  it('returns non-empty list for "bitcoin"', () => {
    const results = search('bitcoin', fixture)
    expect(results.length).toBeGreaterThan(0)
  })

  it('ranks exact-title match first for "bitcoin"', () => {
    const results = search('bitcoin', fixture)
    expect(results[0].title).toBe('Bitcoin Protocol')
  })

  it('each result has path, title, section, snippet', () => {
    const results = search('bitcoin', fixture)
    for (const r of results) {
      expect(r).toHaveProperty('path')
      expect(r).toHaveProperty('title')
      expect(r).toHaveProperty('section')
      expect(r).toHaveProperty('snippet')
      expect(r.snippet.length).toBeGreaterThan(0)
    }
  })
})
