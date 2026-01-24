import { describe, it, expect } from 'vitest'
import { stripMarkdown, truncateDefinition, parseGlossary } from '@/scripts/lib/glossary-parse.js'

describe('stripMarkdown', () => {
  it('removes links but keeps text: [text](url) -> text', () => {
    expect(stripMarkdown('See [Bitcoin](https://bitcoin.org) for more.')).toBe('See Bitcoin for more.')
  })
  it('removes bold **x**', () => {
    expect(stripMarkdown('**bold**')).toBe('bold')
  })
  it('removes italic *x*', () => {
    expect(stripMarkdown('*italic*')).toBe('italic')
  })
  it('removes underscore emphasis _x_', () => {
    expect(stripMarkdown('_emphasis_')).toBe('emphasis')
  })
  it('removes inline code backticks', () => {
    expect(stripMarkdown('Use `OP_DUP` here.')).toBe('Use OP_DUP here.')
  })
  it('collapses whitespace', () => {
    expect(stripMarkdown('a   b\n\nc')).toBe('a b c')
  })
})

describe('truncateDefinition', () => {
  it('returns as-is when under maxLength', () => {
    const short = 'Short definition.'
    expect(truncateDefinition(short, 300)).toBe(short)
  })
  it('truncates at sentence boundary when possible', () => {
    const long = 'First sentence. Second sentence. Third sentence. ' + 'x'.repeat(400)
    const out = truncateDefinition(long, 100)
    expect(out.endsWith('...')).toBe(true)
    expect(out.length).toBeLessThan(long.length)
    expect(out).toContain('First sentence.')
  })
  it('truncates at word boundary when no sentence in range', () => {
    const noPeriod = 'one two three four five six seven eight nine ten ' + 'a'.repeat(300)
    const out = truncateDefinition(noPeriod, 50)
    expect(out.endsWith('...')).toBe(true)
  })
})

describe('parseGlossary', () => {
  it('parses ### term blocks and accumulates definitions', () => {
    const md = `## A

### Term One
Definition for one.

### Term Two
Definition for two.`
    const g = parseGlossary(md)
    expect(g['term-one']).toEqual({ term: 'Term One', definition: 'Definition for one.' })
    expect(g['term-two']).toEqual({ term: 'Term Two', definition: 'Definition for two.' })
  })
  it('skips ## section headers', () => {
    const md = `## A
### A-Term
A definition.`
    const g = parseGlossary(md)
    expect(g['a-term']).toEqual({ term: 'A-Term', definition: 'A definition.' })
  })
})
