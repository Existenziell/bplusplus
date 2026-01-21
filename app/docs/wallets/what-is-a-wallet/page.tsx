import MarkdownRenderer from '@/app/components/MarkdownRenderer'
import { readMarkdown } from '@/app/utils/readMarkdown'

export default async function WalletsOverviewPage() {
  const content = await readMarkdown('app/docs/wallets/what-is-a-wallet/what-is-a-wallet.md')

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
