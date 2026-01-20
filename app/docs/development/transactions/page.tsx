import { readFileSync } from 'fs'
import path from 'path'
import MarkdownRenderer from '../../../components/MarkdownRenderer'

export default function TransactionsPage() {
  const content = readFileSync(
    path.join(process.cwd(), 'app/docs/development/transactions/transactions.md'),
    'utf-8'
  )
  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
