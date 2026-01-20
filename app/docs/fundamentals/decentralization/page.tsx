import MarkdownRenderer from '@/app/components/MarkdownRenderer'
import { readMarkdown } from '@/app/utils/readMarkdown'

export default async function DecentralizationPage() {
  const content = await readMarkdown('app/docs/fundamentals/decentralization/decentralization.md')

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
