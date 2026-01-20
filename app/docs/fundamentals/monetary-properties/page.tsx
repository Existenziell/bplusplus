import MarkdownRenderer from '@/app/components/MarkdownRenderer'
import { readMarkdown } from '@/app/utils/readMarkdown'

export default async function MonetaryPropertiesPage() {
  const content = await readMarkdown('app/docs/fundamentals/monetary-properties/monetary-properties.md')

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
