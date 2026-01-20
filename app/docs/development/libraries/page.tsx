import MarkdownRenderer from '@/app/components/MarkdownRenderer'
import { readMarkdown } from '@/app/utils/readMarkdown'

export default async function LibrariesPage() {
  const content = await readMarkdown('app/docs/development/libraries/libraries.md')

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
