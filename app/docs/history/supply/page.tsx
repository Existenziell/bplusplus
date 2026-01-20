import MarkdownRenderer from '@/app/components/MarkdownRenderer'
import { readMarkdown } from '@/app/utils/readMarkdown'

export default async function SupplyPage() {
  const content = await readMarkdown('app/docs/history/supply.md')

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
