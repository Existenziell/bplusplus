import { readFile } from 'fs/promises'
import { join } from 'path'
import MarkdownRenderer from '@/app/components/MarkdownRenderer'

export default async function CoinSelectionPage() {
  const content = await readFile(
    join(process.cwd(), 'app/docs/wallets/coin-selection/algorithms.md'),
    'utf-8'
  )

  return (
    <div>
      <h1 className="text-5xl font-bold mb-8">Coin Selection Algorithms</h1>
      <MarkdownRenderer content={content} />
    </div>
  )
}
