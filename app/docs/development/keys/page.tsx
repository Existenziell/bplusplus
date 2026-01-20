import MarkdownRenderer from '@/app/components/MarkdownRenderer'
import { readMarkdown } from '@/app/utils/readMarkdown'

export default async function KeysPage() {
  const content = await readMarkdown('app/docs/development/keys/keys.md')

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
