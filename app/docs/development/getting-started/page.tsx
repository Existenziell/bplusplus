import MarkdownRenderer from '@/app/components/MarkdownRenderer'
import { readMarkdown } from '@/app/utils/readMarkdown'

export default async function GettingStartedPage() {
  const content = await readMarkdown('app/docs/development/getting-started/getting-started.md')

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
