import MarkdownRenderer from '@/app/components/MarkdownRenderer'
import { readMarkdown } from '@/app/utils/readMarkdown'

export default async function ZeroConfPage() {
  const content = await readMarkdown('app/docs/lightning/zero-conf/zero-conf.md')

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
