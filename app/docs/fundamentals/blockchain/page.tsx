import MarkdownRenderer from '@/app/components/MarkdownRenderer'
import { readMarkdown } from '@/app/utils/readMarkdown'

export default async function BlockchainPage() {
  const content = await readMarkdown('app/docs/fundamentals/blockchain/blockchain.md')

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
