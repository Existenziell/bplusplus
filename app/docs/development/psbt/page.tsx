import MarkdownRenderer from '@/app/components/MarkdownRenderer'
import { readMarkdown } from '@/app/utils/readMarkdown'

export default async function PsbtPage() {
  const content = await readMarkdown('app/docs/development/psbt/psbt.md')

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
