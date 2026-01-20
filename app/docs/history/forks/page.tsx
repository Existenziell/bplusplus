import MarkdownRenderer from '@/app/components/MarkdownRenderer'
import { readMarkdown } from '@/app/utils/readMarkdown'

export default async function ForksPage() {
  const content = await readMarkdown('app/docs/history/forks.md')

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
