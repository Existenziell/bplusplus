import MarkdownRenderer from '@/app/components/MarkdownRenderer'
import { readMarkdown } from '@/app/utils/readMarkdown'

export default async function EconomicsPage() {
  const content = await readMarkdown('app/docs/mining/economics.md')

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
