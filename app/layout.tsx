import React from 'react'
import { Ubuntu } from 'next/font/google'
import type { Metadata } from 'next'

import './globals.css'
import { AppContextProvider } from './context/AppContext'
import { DisplayContextProvider } from './context/DisplayContext'

const ubuntu = Ubuntu({ weight: '400', style: 'italic', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'B++',
  description: 'Bitcoin Education | Hopium for the masses',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={ubuntu.className}>
        <DisplayContextProvider>
          <AppContextProvider>{children}</AppContextProvider>
        </DisplayContextProvider>
      </body>
    </html>
  )
}
