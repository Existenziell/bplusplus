import MarkdownRenderer from '@/app/components/MarkdownRenderer'
import { readMarkdown } from '@/app/utils/readMarkdown'

export default async function MilestonesPage() {
  const content = await readMarkdown('app/docs/history/milestones.md')

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
