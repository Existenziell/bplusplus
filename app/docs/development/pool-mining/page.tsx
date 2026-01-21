import MarkdownRenderer from '@/app/components/MarkdownRenderer'
import { readMarkdown } from '@/app/utils/readMarkdown'

export default async function PoolMiningPage() {
  const content = await readMarkdown('app/docs/development/pool-mining/pool-mining.md')

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
