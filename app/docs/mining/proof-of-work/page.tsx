import MarkdownRenderer from '@/app/components/MarkdownRenderer'
import { readMarkdown } from '@/app/utils/readMarkdown'

export default async function ProofOfWorkPage() {
  const content = await readMarkdown('app/docs/mining/proof-of-work/proof-of-work.md')

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
