import MarkdownRenderer from '@/app/components/MarkdownRenderer'
import { readMarkdown } from '@/app/utils/readMarkdown'

export default async function MonitoringPage() {
  const content = await readMarkdown('app/docs/development/monitoring/blockchain.md')

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
