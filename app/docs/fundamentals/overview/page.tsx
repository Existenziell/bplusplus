import type { Metadata } from 'next'
import MarkdownRenderer from '@/app/components/MarkdownRenderer'
import { readMarkdown } from '@/app/utils/readMarkdown'

export const metadata: Metadata = {
  title: 'What is Bitcoin? | B++',
  description: 'High-level introduction to Bitcoin, including what it is, how it works, and what makes it unique as a decentralized digital currency.',
  openGraph: {
    title: 'What is Bitcoin? | B++',
    description: 'High-level introduction to Bitcoin, including what it is, how it works, and what makes it unique as a decentralized digital currency.',
  },
}

export default async function FundamentalsOverviewPage() {
  const content = await readMarkdown('app/docs/fundamentals/overview/overview.md')

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
