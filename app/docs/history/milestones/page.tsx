import MarkdownRenderer from '@/app/components/MarkdownRenderer'
import { readMarkdown } from '@/app/utils/readMarkdown'

export default async function HistoryOverviewPage() {
  const content = await readMarkdown('app/docs/history/milestones/overview.md')

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
