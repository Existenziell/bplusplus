import MarkdownRenderer from '@/app/components/MarkdownRenderer'
import { readMarkdown } from '@/app/utils/readMarkdown'

export default async function PriceTrackingPage() {
  const content = await readMarkdown('app/docs/development/price-tracking/price-tracking.md')

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
