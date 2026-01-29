import { Ubuntu } from 'next/font/google'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { DEFAULT_OG_IMAGE, OG_LOGO, SITE_URL, getSiteStructuredData } from '@/app/utils/metadata'
import './globals.css'
import { ThemeProvider } from 'next-themes'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Header from '@/app/components/Header'
import StickyBar from '@/app/components/StickyBar'
import Notification from '@/app/components/Notification'
import { GlossaryProvider } from '@/app/contexts/GlossaryContext'
import { StickyScrollProvider } from '@/app/contexts/StickyScrollContext'
import { SearchModalProvider } from '@/app/contexts/SearchModalContext'
import SearchModalWrapper from '@/app/components/SearchModalWrapper'

const ubuntu = Ubuntu({
  weight: '400',
  style: 'normal',
  subsets: ['latin'],
  display: 'swap', // Ensure text is visible while font loads
  variable: '--font-ubuntu',
  preload: true,
})

export const metadata: Metadata = {
  title: 'BitcoinDev',
  description:
    "Bitcoin Education | Open knowledge. Open source. A developer's guide with docs, CLI terminal, Stack Lab, and code examples. Always free.",
  icons: {
    icon: [
      { url: '/icons/favicon/favicon.ico', sizes: 'any' },
      { url: '/icons/favicon/favicon.svg', type: 'image/svg+xml' },
      { url: '/icons/favicon/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'manifest',
        url: '/icons/favicon/site.webmanifest',
      },
    ],
  },
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: 'BitcoinDev',
    description:
      "Bitcoin Education | Open knowledge. Open source. A developer's guide with docs, CLI terminal, Stack Lab, and code examples. Always free.",
    url: SITE_URL,
    siteName: 'BitcoinDev',
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'BitcoinDev - Bitcoin Education',
      },
    ],
    locale: 'en_US',
    type: 'website',
    // og:logo not in Next.js OpenGraph types; we emit it in <head>
    logo: OG_LOGO,
  } as import('next').Metadata['openGraph'] & { logo?: string },
  twitter: {
    card: 'summary_large_image',
    title: 'BitcoinDev',
    description:
      "Bitcoin Education | Open knowledge. Open source. A developer's guide with docs, CLI terminal, Stack Lab, and code examples. Always free.",
    images: [
      { url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: 'BitcoinDev - Bitcoin Education' },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang='en' suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <meta property="og:logo" content={`${SITE_URL}${OG_LOGO}`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: getSiteStructuredData() }}
        />
        {/* Preconnect to Vercel Analytics/Speed Insights origins */}
        <link rel="preconnect" href="https://vitals.vercel-insights.com" />
        <link rel="dns-prefetch" href="https://vitals.vercel-insights.com" />
      </head>
      <body className={`${ubuntu.className} flex flex-col min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <GlossaryProvider>
            <StickyScrollProvider>
              <SearchModalProvider>
                <Notification />
                <div className="flex-shrink-0">
                  <Header />
                </div>
                <StickyBar />
                <div className="flex-1 flex flex-col">
                  {children}
                </div>
                <SearchModalWrapper />
                <Analytics />
                <SpeedInsights />
              </SearchModalProvider>
            </StickyScrollProvider>
          </GlossaryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
