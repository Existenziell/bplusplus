import MarkdownRenderer from '@/app/components/MarkdownRenderer'
import { readMarkdown } from '@/app/utils/readMarkdown'

export default async function BlocksPage() {
  const content = await readMarkdown('app/docs/bitcoin/blocks/blocks.md')

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
