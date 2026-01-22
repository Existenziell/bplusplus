import MarkdownRenderer from '@/app/components/MarkdownRenderer'
import { readMarkdown } from '@/app/utils/readMarkdown'

export default async function IncentivesPage() {
  const content = await readMarkdown('app/docs/fundamentals/incentives/incentives.md')

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
