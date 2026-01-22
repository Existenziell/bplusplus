import MarkdownRenderer from '@/app/components/MarkdownRenderer'
import { readMarkdown } from '@/app/utils/readMarkdown'

export default async function GameTheoryPage() {
  const content = await readMarkdown('app/docs/fundamentals/game-theory/game-theory.md')

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
