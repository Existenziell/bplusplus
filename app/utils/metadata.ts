import type { Metadata } from 'next'

// Site and OG config
export const SITE_URL = 'https://bplusplus.info'
export const DEFAULT_OG_IMAGE = '/og/og.png?v=3'
export const OG_LOGO = '/logo/logo.png'

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
  const fullTitle = `${title} | B++`
  const url = `${SITE_URL}${path}`

  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: 'B++',
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
      images: [ogImage],
    },
  }
}
