import MarkdownRenderer from '@/app/components/MarkdownRenderer'
import { readMarkdown } from '@/app/utils/readMarkdown'

export default async function SubsidyPage() {
  const content = await readMarkdown('app/docs/bitcoin/subsidy/equation.md')

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
