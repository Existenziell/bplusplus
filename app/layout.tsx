import { Ubuntu } from 'next/font/google'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import './globals.css'
import { AppContextProvider } from '@/app/context/AppContext'
import { ThemeProvider } from '@/app/context/ThemeContext'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

const ubuntu = Ubuntu({
  weight: '400',
  style: 'normal',
  subsets: ['latin'],
  display: 'swap', // Ensure text is visible while font loads
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
    <html lang='en' suppressHydrationWarning>
      <head>
        {/* Favicon links */}
        <link rel="icon" href="/favicon/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        {/* Preconnect to Vercel Analytics/Speed Insights origins */}
        <link rel="preconnect" href="https://vitals.vercel-insights.com" />
        <link rel="dns-prefetch" href="https://vitals.vercel-insights.com" />
        {/*
          Inline script to prevent dark mode flicker on page load.
          Runs synchronously before paint to apply the correct theme class
          based on localStorage or system preference.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var isDark = theme === 'dark' || (theme !== 'light' && systemDark);
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={ubuntu.className}>
        <ThemeProvider>
          <AppContextProvider>
            {children}
            <Analytics />
            <SpeedInsights />
          </AppContextProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
