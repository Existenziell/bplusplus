import { readFile } from 'fs/promises'
import { join } from 'path'
import MarkdownRenderer from '@/app/components/MarkdownRenderer'

export default async function MonitoringPage() {
  const content = await readFile(
    join(process.cwd(), 'app/docs/development/monitoring/blockchain.md'),
    'utf-8'
  )

  return (
    <div>
      <h1 className="text-5xl font-bold mb-8">Blockchain Monitoring</h1>
      <MarkdownRenderer content={content} />
    </div>
  )
}
