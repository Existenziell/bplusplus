import MarkdownRenderer from '@/app/components/MarkdownRenderer'
import { readMarkdown } from '@/app/utils/readMarkdown'

export default async function TransactionsPage() {
  const content = await readMarkdown('app/docs/development/transactions/transactions.md')

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
