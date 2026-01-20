import MarkdownRenderer from '@/app/components/MarkdownRenderer'
import { readMarkdown } from '@/app/utils/readMarkdown'

export default async function WalletTransactionsPage() {
  const content = await readMarkdown('app/docs/wallets/transactions/creation.md')

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
