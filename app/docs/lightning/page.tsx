import type { Metadata } from 'next'
import MarkdownRenderer from '@/app/components/MarkdownRenderer'
import { readMarkdown } from '@/app/utils/readMarkdown'

export const metadata: Metadata = {
  title: 'What is the Lightning Network? | B++',
  description: 'Introduction to the Lightning Network, a second-layer protocol enabling instant, low-cost Bitcoin payments through payment channels.',
  openGraph: {
    title: 'What is the Lightning Network? | B++',
    description: 'Introduction to the Lightning Network, a second-layer protocol enabling instant, low-cost Bitcoin payments through payment channels.',
  },
}

export default async function LightningPage() {
  const content = await readMarkdown('app/docs/lightning/overview.md')

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
