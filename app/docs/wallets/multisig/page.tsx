import MarkdownRenderer from '@/app/components/MarkdownRenderer'
import { readMarkdown } from '@/app/utils/readMarkdown'

export default async function MultisigPage() {
  const content = await readMarkdown('app/docs/wallets/multisig/concepts.md')

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
