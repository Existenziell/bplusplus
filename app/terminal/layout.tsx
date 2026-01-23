import type { Metadata } from 'next'
import { generatePageMetadata } from '@/app/utils/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'Bitcoin CLI Terminal',
  description: 'Interactive Bitcoin CLI terminal for executing RPC commands on the Bitcoin network',
  path: '/terminal',
})

export default function TerminalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
