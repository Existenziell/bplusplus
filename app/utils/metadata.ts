import type { Metadata } from 'next'

// Site and OG config
export const SITE_URL = 'https://bitcoindev.info'
export const DEFAULT_OG_IMAGE = '/images/og/og.png'
export const OG_LOGO = '/icons/logo/logo.png'

/** JSON-LD for WebSite + Organization (root layout). */
export function getSiteStructuredData(): string {
  const data = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'BitcoinDev',
      url: SITE_URL,
      description:
        "Bitcoin Education | Open knowledge. Open source. A developer's guide with docs, CLI terminal, Stack Lab, and code examples. Always free.",
      publisher: {
        '@type': 'Organization',
        name: 'BitcoinDev',
        url: SITE_URL,
        logo: { '@type': 'ImageObject', url: `${SITE_URL}${OG_LOGO}` },
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'BitcoinDev',
      url: SITE_URL,
      logo: `${SITE_URL}${OG_LOGO}`,
    },
  ]
  return JSON.stringify(data)
}

/** JSON-LD for doc pages: BreadcrumbList + Article. */
export function getDocPageStructuredData(
  path: string,
  title: string,
  description: string,
  breadcrumbs: { label: string; href: string }[]
): string {
  const url = `${SITE_URL}${path}`
  const data = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: item.label,
        item: item.href.startsWith('http') ? item.href : `${SITE_URL}${item.href}`,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: title,
      description,
      url,
      publisher: { '@type': 'Organization', name: 'BitcoinDev', url: SITE_URL },
    },
  ]
  return JSON.stringify(data)
}

export function generatePageMetadata({
  title,
  description,
  path = '',
  ogImage = DEFAULT_OG_IMAGE,
}: {
  title: string
  description: string
  path?: string
  ogImage?: string
}): Metadata {
  const fullTitle = `${title} | BitcoinDev`
  const url = `${SITE_URL}${path}`

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: 'BitcoinDev',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
  }
}
