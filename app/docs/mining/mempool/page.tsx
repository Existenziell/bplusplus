import MarkdownRenderer from '@/app/components/MarkdownRenderer'
import { readMarkdown } from '@/app/utils/readMarkdown'

export default async function MempoolPage() {
  const content = await readMarkdown('app/docs/mining/mempool/mempool.md')

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
