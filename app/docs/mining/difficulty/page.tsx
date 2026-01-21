import MarkdownRenderer from '@/app/components/MarkdownRenderer'
import { readMarkdown } from '@/app/utils/readMarkdown'

export default async function DifficultyPage() {
  const content = await readMarkdown('app/docs/mining/difficulty/difficulty.md')

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
