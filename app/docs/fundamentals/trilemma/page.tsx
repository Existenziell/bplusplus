import MarkdownRenderer from '@/app/components/MarkdownRenderer'
import { readMarkdown } from '@/app/utils/readMarkdown'

export default async function TrilemmaPage() {
  const content = await readMarkdown('app/docs/fundamentals/trilemma/trilemma.md')

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
