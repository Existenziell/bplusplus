import MarkdownRenderer from '@/app/components/MarkdownRenderer'
import { readMarkdown } from '@/app/utils/readMarkdown'

export default async function TrustModelPage() {
  const content = await readMarkdown('app/docs/fundamentals/trust-model/trust-model.md')

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
