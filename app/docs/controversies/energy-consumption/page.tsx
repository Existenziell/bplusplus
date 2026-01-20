import MarkdownRenderer from '@/app/components/MarkdownRenderer'
import { readMarkdown } from '@/app/utils/readMarkdown'

export default async function EnergyConsumptionPage() {
  const content = await readMarkdown('app/docs/controversies/energy-consumption/energy-consumption.md')

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
