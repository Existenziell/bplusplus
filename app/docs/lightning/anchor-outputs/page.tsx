import MarkdownRenderer from '@/app/components/MarkdownRenderer'
import { readMarkdown } from '@/app/utils/readMarkdown'

export default async function AnchorOutputsPage() {
  const content = await readMarkdown('app/docs/lightning/anchor-outputs/anchor-outputs.md')

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
