import MarkdownRenderer from '@/app/components/MarkdownRenderer'
import { readMarkdown } from '@/app/utils/readMarkdown'

export default async function CraigWrightPage() {
  const content = await readMarkdown('app/docs/controversies/craig-wright/craig-wright.md')

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
