import MarkdownRenderer from '@/app/components/MarkdownRenderer'
import { readMarkdown } from '@/app/utils/readMarkdown'

export default async function HDWalletsPage() {
  const content = await readMarkdown('app/docs/wallets/hd-wallets/hd-wallets.md')

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
