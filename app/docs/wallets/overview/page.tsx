import MarkdownRenderer from '@/app/components/MarkdownRenderer'
import { readMarkdown } from '@/app/utils/readMarkdown'

export default async function WalletsOverviewPage() {
  const content = await readMarkdown('app/docs/wallets/overview/overview.md')

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
