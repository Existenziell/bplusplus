import MarkdownRenderer from '@/app/components/MarkdownRenderer'
import { readMarkdown } from '@/app/utils/readMarkdown'

export default async function AttacksPage() {
  const content = await readMarkdown('app/docs/mining/attacks/attacks.md')

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
