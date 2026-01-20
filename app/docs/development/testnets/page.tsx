import MarkdownRenderer from '@/app/components/MarkdownRenderer'
import { readMarkdown } from '@/app/utils/readMarkdown'

export default async function TestnetsPage() {
  const content = await readMarkdown('app/docs/development/testnets/testnets.md')

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
