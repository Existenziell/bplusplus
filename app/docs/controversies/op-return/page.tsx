import MarkdownRenderer from '@/app/components/MarkdownRenderer'
import { readMarkdown } from '@/app/utils/readMarkdown'

export default async function OpReturnPage() {
  const content = await readMarkdown('app/docs/controversies/op-return/debate.md')

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
