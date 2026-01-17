import { readFileSync } from 'fs'
import { join } from 'path'
import MarkdownRenderer from '../../../components/MarkdownRenderer'

export default function WalletsOverviewPage() {
  const content = readFileSync(
    join(process.cwd(), 'app/docs/wallets/overview/overview.md'),
    'utf-8'
  )

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
