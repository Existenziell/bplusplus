import MarkdownRenderer from '@/app/components/MarkdownRenderer'
import { readMarkdown } from '@/app/utils/readMarkdown'

export default async function BlockConstructionPage() {
  const content = await readMarkdown('app/docs/mining/block-construction/block-construction.md')

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
