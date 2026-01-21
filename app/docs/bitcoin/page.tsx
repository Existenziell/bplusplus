import type { Metadata } from 'next'
import MarkdownRenderer from '@/app/components/MarkdownRenderer'
import { readMarkdown } from '@/app/utils/readMarkdown'

export const metadata: Metadata = {
  title: 'The Bitcoin Protocol | B++',
  description: 'Deep technical documentation of the Bitcoin protocol, including cryptography, consensus, script system, and RPC interfaces.',
  openGraph: {
    title: 'The Bitcoin Protocol | B++',
    description: 'Deep technical documentation of the Bitcoin protocol, including cryptography, consensus, script system, and RPC interfaces.',
  },
}

export default async function BitcoinPage() {
  const content = await readMarkdown('app/docs/bitcoin/overview.md')

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
