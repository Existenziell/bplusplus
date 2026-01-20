import MarkdownRenderer from '@/app/components/MarkdownRenderer'
import { readMarkdown } from '@/app/utils/readMarkdown'

export default async function ProblemsPage() {
  const content = await readMarkdown('app/docs/fundamentals/problems/problems.md')

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
