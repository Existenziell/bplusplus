import MarkdownRenderer from '@/app/components/MarkdownRenderer'
import { readMarkdown } from '@/app/utils/readMarkdown'

export default async function UTXOsPage() {
  const content = await readMarkdown('app/docs/fundamentals/utxos/utxos.md')

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
