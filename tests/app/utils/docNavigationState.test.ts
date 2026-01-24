import { describe, it, expect } from 'vitest'
import { getFlattenedPages, pathnameToDocNavigationState } from '@/app/utils/docNavigationState'
import type { NavSection } from '@/app/utils/navigation'

const fixtureNavItems: NavSection[] = [
  { title: 'Bitcoin Protocol', href: '/docs/bitcoin', children: [{ title: 'Cryptography', href: '/docs/bitcoin/cryptography' }, { title: 'Bitcoin Script', href: '/docs/bitcoin/script' }, { title: 'OP Codes', href: '/docs/bitcoin/op-codes' }] },
  { title: 'Mining', href: '/docs/mining', children: [{ title: 'Proof-of-Work', href: '/docs/mining/proof-of-work' }] },
]

const flatPages = [
  { title: 'Bitcoin Protocol', href: '/docs/bitcoin' },
  { title: 'Cryptography', href: '/docs/bitcoin/cryptography' },
  { title: 'Bitcoin Script', href: '/docs/bitcoin/script' },
  { title: 'OP Codes', href: '/docs/bitcoin/op-codes' },
  { title: 'Mining', href: '/docs/mining' },
  { title: 'Proof-of-Work', href: '/docs/mining/proof-of-work' },
]
const mainPageHrefs = new Set(['/docs/bitcoin', '/docs/mining'])
const routeLabels: Record<string, string> = {
  bitcoin: 'The Bitcoin Protocol',
  script: 'Bitcoin Script',
  cryptography: 'Cryptography',
  'op-codes': 'OP Codes',
  mining: 'Mining',
  'proof-of-work': 'Proof-of-Work',
}
const downloadablePaths = new Set(['/docs/bitcoin/cryptography', '/docs/bitcoin/script', '/docs/bitcoin/op-codes', '/docs/mining/proof-of-work'])
const ctx = { flatPages, mainPageHrefs, routeLabels, downloadablePaths }

describe('getFlattenedPages', () => {
  it('flattens section and children in order', () => {
    const pages = getFlattenedPages(fixtureNavItems)
    expect(pages).toHaveLength(6)
    expect(pages[0]).toEqual({ title: 'Bitcoin Protocol', href: '/docs/bitcoin' })
    expect(pages[1]).toEqual({ title: 'Cryptography', href: '/docs/bitcoin/cryptography' })
    expect(pages[2]).toEqual({ title: 'Bitcoin Script', href: '/docs/bitcoin/script' })
  })
})

describe('pathnameToDocNavigationState', () => {
  it('/docs/bitcoin/script has correct breadcrumbs, prev/next, isDownloadable', () => {
    const state = pathnameToDocNavigationState('/docs/bitcoin/script', ctx)
    expect(state.breadcrumbs[0]).toEqual({ label: 'Home', href: '/' })
    expect(state.breadcrumbs.some((b) => b.label === 'The Bitcoin Protocol' && b.href === '/docs/bitcoin')).toBe(true)
    expect(state.breadcrumbs.some((b) => b.label === 'Bitcoin Script' && b.href === '/docs/bitcoin/script')).toBe(true)
    expect(state.previousPage).toEqual({ title: 'Cryptography', href: '/docs/bitcoin/cryptography' })
    expect(state.nextPage).toEqual({ title: 'OP Codes', href: '/docs/bitcoin/op-codes' })
    expect(state.isDownloadable).toBe(true)
    expect(state.isMainSectionPage).toBe(false)
  })

  it('/docs/bitcoin (section index) has isMainSectionPage true', () => {
    const state = pathnameToDocNavigationState('/docs/bitcoin', ctx)
    expect(state.isMainSectionPage).toBe(true)
  })

  it('/ has previousPage and nextPage null', () => {
    const state = pathnameToDocNavigationState('/', ctx)
    expect(state.previousPage).toBeNull()
    expect(state.nextPage).toBeNull()
    expect(state.breadcrumbs).toEqual([{ label: 'Home', href: '/' }])
  })

  it('unknown path has previousPage/nextPage null', () => {
    const state = pathnameToDocNavigationState('/some/unknown', ctx)
    expect(state.previousPage).toBeNull()
    expect(state.nextPage).toBeNull()
  })
})
