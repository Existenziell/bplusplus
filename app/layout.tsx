import React from 'react'
import type { Metadata } from 'next'
import { Ubuntu } from 'next/font/google'

import './globals.css'

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
      <body className={ubuntu.className}>{children}</body>
    </html>
  )
}
