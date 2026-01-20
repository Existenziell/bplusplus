import type { Metadata } from 'next'
import { readFileSync } from 'fs'
import { join } from 'path'
import MarkdownRenderer from '../../../components/MarkdownRenderer'

export const metadata: Metadata = {
  title: 'What is Bitcoin? | B++',
  description: 'High-level introduction to Bitcoin, including what it is, how it works, and what makes it unique as a decentralized digital currency.',
  openGraph: {
    title: 'What is Bitcoin? | B++',
    description: 'High-level introduction to Bitcoin, including what it is, how it works, and what makes it unique as a decentralized digital currency.',
  },
}

export default function FundamentalsOverviewPage() {
  const content = readFileSync(
    join(process.cwd(), 'app/docs/fundamentals/overview/overview.md'),
    'utf-8'
  )

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
