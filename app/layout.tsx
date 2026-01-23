import { Ubuntu } from 'next/font/google'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import './globals.css'
import { ThemeProvider } from 'next-themes'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Notification from '@/app/components/Notification'
import { GlossaryProvider } from '@/app/contexts/GlossaryContext'
// Import the pre-generated glossary data (generated at build time by scripts/generate-glossary-data.js)
import glossaryData from '@/public/data/glossary.json'

const ubuntu = Ubuntu({
  weight: '400',
  style: 'normal',
  subsets: ['latin'],
  display: 'swap', // Ensure text is visible while font loads
  variable: '--font-ubuntu',
  preload: true,
})

export const metadata: Metadata = {
  title: 'B++',
  description: 'Bitcoin Education | Hopium for the masses',
  icons: {
    icon: [
      { url: '/favicon/favicon.ico', sizes: 'any' },
      { url: '/favicon/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'manifest',
        url: '/favicon/site.webmanifest',
      },
    ],
  },
  metadataBase: new URL('https://bplusplus.info'),
  openGraph: {
    title: 'B++',
    description: 'Bitcoin Education | Hopium for the masses',
    url: 'https://bplusplus.info',
    siteName: 'B++',
    images: [
      {
        url: '/og/og-image.png',
        width: 1200,
        height: 630,
        alt: 'B++ - Bitcoin Education',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'B++',
    description: 'Bitcoin Education | Hopium for the masses',
    images: ['/og/og-image.png'],
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
        {/* Preconnect to Vercel Analytics/Speed Insights origins */}
        <link rel="preconnect" href="https://vitals.vercel-insights.com" />
        <link rel="dns-prefetch" href="https://vitals.vercel-insights.com" />
        {/* Inline glossary data for instant client-side access */}
        <script
          id="glossary-data"
          type="application/json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(glossaryData),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__GLOSSARY_DATA__ = ${JSON.stringify(glossaryData)};`,
          }}
        />
      </head>
      <body className={ubuntu.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <GlossaryProvider>
            <Notification />
            {children}
            <Analytics />
            <SpeedInsights />
          </GlossaryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
