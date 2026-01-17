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
      <h1 className="text-5xl font-bold mb-8">Energy Consumption</h1>
      <MarkdownRenderer content={content} />
    </div>
  )
}
