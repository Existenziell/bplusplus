import type { Metadata } from 'next'

const SITE_URL = 'https://bplusplus.info'
const DEFAULT_OG_IMAGE = '/og/og.webp'

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
