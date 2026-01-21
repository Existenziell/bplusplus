import type { Metadata } from 'next'
import MarkdownRenderer from '@/app/components/MarkdownRenderer'
import { readMarkdown } from '@/app/utils/readMarkdown'

export const metadata: Metadata = {
  title: 'What is Bitcoin Mining? | B++',
  description: 'Introduction to Bitcoin mining, including how it works, the mining algorithm, hardware evolution, and why mining matters for network security.',
  openGraph: {
    title: 'What is Bitcoin Mining? | B++',
    description: 'Introduction to Bitcoin mining, including how it works, the mining algorithm, hardware evolution, and why mining matters for network security.',
  },
}

export default async function MiningPage() {
  const content = await readMarkdown('app/docs/mining/overview.md')

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
