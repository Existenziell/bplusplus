import { readFileSync } from 'fs'
import path from 'path'
import MarkdownRenderer from '../../../components/MarkdownRenderer'

export default function MiningPoolsPage() {
  const content = readFileSync(
    path.join(process.cwd(), 'app/docs/mining/pools/pools.md'),
    'utf-8'
  )
  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
