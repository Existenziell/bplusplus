import MarkdownRenderer from '@/app/components/MarkdownRenderer'
import { readMarkdown } from '@/app/utils/readMarkdown'

export default async function ConsensusPage() {
  const content = await readMarkdown('app/docs/fundamentals/consensus/consensus.md')

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
