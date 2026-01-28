import { describe, it, expect } from 'vitest'
import { generatePageMetadata, SITE_URL, DEFAULT_OG_IMAGE } from '@/app/utils/metadata'

describe('generatePageMetadata', () => {
  it('returns fullTitle as "Title | BitcoinDev"', () => {
    const meta = generatePageMetadata({ title: 'Foo', description: 'Desc' })
    expect(meta.title).toBe('Foo | BitcoinDev')
  })

  it('returns description as given', () => {
    const meta = generatePageMetadata({ title: 'T', description: 'My description' })
    expect(meta.description).toBe('My description')
  })

  it('builds openGraph.url from SITE_URL and path when path is provided', () => {
    const meta = generatePageMetadata({ title: 'T', description: 'D', path: '/docs/bitcoin' })
    expect(meta.openGraph?.url).toBe(`${SITE_URL}/docs/bitcoin`)
  })

  it('uses SITE_URL only when path is default empty', () => {
    const meta = generatePageMetadata({ title: 'T', description: 'D' })
    expect(meta.openGraph?.url).toBe(SITE_URL)
  })

  it('uses default ogImage for openGraph.images[0].url when not overridden', () => {
    const meta = generatePageMetadata({ title: 'T', description: 'D' })
    expect(meta.openGraph?.images?.[0]?.url).toBe(DEFAULT_OG_IMAGE)
  })

  it('uses overridden ogImage when provided', () => {
    const custom = '/custom/og.png'
    const meta = generatePageMetadata({ title: 'T', description: 'D', ogImage: custom })
    expect(meta.openGraph?.images?.[0]?.url).toBe(custom)
    expect(meta.twitter?.images?.[0]).toMatchObject({ url: custom, width: 1200, height: 630 })
  })

  it('sets twitter.card to summary_large_image', () => {
    const meta = generatePageMetadata({ title: 'T', description: 'D' })
    expect(meta.twitter?.card).toBe('summary_large_image')
  })
})
