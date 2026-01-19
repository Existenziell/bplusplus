import { readFile } from 'fs/promises'
import { join } from 'path'
import MarkdownRenderer from '@/app/components/MarkdownRenderer'

export default async function EnergyConsumptionPage() {
  const content = await readFile(
    join(process.cwd(), 'app/docs/controversies/energy-consumption/energy-consumption.md'),
    'utf-8'
  )

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
