import MarkdownRenderer from '@/app/components/MarkdownRenderer'
import { readMarkdown } from '@/app/utils/readMarkdown'

export default async function MtGoxPage() {
  const content = await readMarkdown('app/docs/controversies/mt-gox/mt-gox.md')

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
