import MarkdownRenderer from '@/app/components/MarkdownRenderer'
import { readMarkdown } from '@/app/utils/readMarkdown'

export default async function CoinSelectionPage() {
  const content = await readMarkdown('app/docs/wallets/coin-selection/algorithms.md')

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
