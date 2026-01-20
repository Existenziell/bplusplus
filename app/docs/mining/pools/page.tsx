import MarkdownRenderer from '@/app/components/MarkdownRenderer'
import { readMarkdown } from '@/app/utils/readMarkdown'

export default async function PoolsPage() {
  const content = await readMarkdown('app/docs/mining/pools/pools.md')

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
