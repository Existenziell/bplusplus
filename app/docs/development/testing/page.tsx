import MarkdownRenderer from '@/app/components/MarkdownRenderer'
import { readMarkdown } from '@/app/utils/readMarkdown'

export default async function TestingPage() {
  const content = await readMarkdown('app/docs/development/testing/testing.md')

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
