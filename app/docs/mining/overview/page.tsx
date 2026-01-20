import MarkdownRenderer from '@/app/components/MarkdownRenderer'
import { readMarkdown } from '@/app/utils/readMarkdown'

export default async function MiningOverviewPage() {
  const content = await readMarkdown('app/docs/mining/overview.md')

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
