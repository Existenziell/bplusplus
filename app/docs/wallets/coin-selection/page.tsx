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
      <MarkdownRenderer content={content} />
    </div>
  )
}
