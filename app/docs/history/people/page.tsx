import MarkdownRenderer from '@/app/components/MarkdownRenderer'
import { readMarkdown } from '@/app/utils/readMarkdown'

export default async function PeoplePage() {
  const content = await readMarkdown('app/docs/history/people/people.md')

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
