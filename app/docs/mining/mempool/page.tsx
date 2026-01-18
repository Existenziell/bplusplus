import { readFileSync } from 'fs'
import path from 'path'
import MarkdownRenderer from '../../../components/MarkdownRenderer'

export default function MempoolPage() {
  const content = readFileSync(
    path.join(process.cwd(), 'app/docs/mining/mempool/mempool.md'),
    'utf-8'
  )
  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
