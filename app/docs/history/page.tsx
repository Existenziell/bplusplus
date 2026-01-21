import type { Metadata } from 'next'
import MarkdownRenderer from '@/app/components/MarkdownRenderer'
import { readMarkdown } from '@/app/utils/readMarkdown'

export const metadata: Metadata = {
  title: 'Historical Milestones | B++',
  description: "Bitcoin's history from the Genesis Block in 2009 to present day, including key milestones, halvings, and price events.",
  openGraph: {
    title: 'Historical Milestones | B++',
    description: "Bitcoin's history from the Genesis Block in 2009 to present day, including key milestones, halvings, and price events.",
  },
}

export default async function HistoryPage() {
  const content = await readMarkdown('app/docs/history/overview.md')

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
