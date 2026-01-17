import { readFileSync } from 'fs'
import { join } from 'path'
import MarkdownRenderer from '../../../components/MarkdownRenderer'

export default function FundamentalsOverviewPage() {
  const content = readFileSync(
    join(process.cwd(), 'app/docs/fundamentals/overview/overview.md'),
    'utf-8'
  )

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
