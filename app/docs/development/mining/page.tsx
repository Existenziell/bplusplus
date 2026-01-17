import { readFile } from 'fs/promises'
import { join } from 'path'
import MarkdownRenderer from '@/app/components/MarkdownRenderer'

export default async function MiningPage() {
  const content = await readFile(
    join(process.cwd(), 'app/docs/development/mining/pool-mining.md'),
    'utf-8'
  )

  return (
    <div>
      <h1 className="text-5xl font-bold mb-8">Pool Mining</h1>
      <MarkdownRenderer content={content} />
    </div>
  )
}
