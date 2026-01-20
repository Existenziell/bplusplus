import MarkdownRenderer from '@/app/components/MarkdownRenderer'
import { readMarkdown } from '@/app/utils/readMarkdown'

export default async function BitcoinScriptPage() {
  const content = await readMarkdown('app/docs/bitcoin/script/execution.md')

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
