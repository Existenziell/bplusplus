import { Ubuntu } from 'next/font/google'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import './globals.css'
import { AppContextProvider } from './context/AppContext'
import { ThemeProvider } from './context/ThemeContext'

const ubuntu = Ubuntu({ weight: '400', style: 'normal', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'B++',
  description: 'Bitcoin Education | Hopium for the masses',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={ubuntu.className}>
        <ThemeProvider>
          <AppContextProvider>{children}</AppContextProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
