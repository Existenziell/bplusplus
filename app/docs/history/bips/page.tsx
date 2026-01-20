import MarkdownRenderer from '@/app/components/MarkdownRenderer'
import { readMarkdown } from '@/app/utils/readMarkdown'

export default async function BipsPage() {
  const content = await readMarkdown('app/docs/history/bips.md')

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
