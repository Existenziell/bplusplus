import MarkdownRenderer from '@/app/components/MarkdownRenderer'
import { readMarkdown } from '@/app/utils/readMarkdown'

export default async function HalvingsPage() {
  const content = await readMarkdown('app/docs/history/halvings.md')

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
