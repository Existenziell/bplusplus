import MarkdownRenderer from '@/app/components/MarkdownRenderer'
import { readMarkdown } from '@/app/utils/readMarkdown'

export default async function InstallBitcoinPage() {
  const content = await readMarkdown('app/docs/development/install-bitcoin/install-bitcoin.md')

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
