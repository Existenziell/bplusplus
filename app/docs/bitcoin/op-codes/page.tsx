import MarkdownRenderer from '@/app/components/MarkdownRenderer'
import { readMarkdown } from '@/app/utils/readMarkdown'

export default async function OpCodesPage() {
  const content = await readMarkdown('app/docs/bitcoin/op-codes/op-codes.md')

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
