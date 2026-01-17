import { readFile } from 'fs/promises'
import { join } from 'path'
import MarkdownRenderer from '@/app/components/MarkdownRenderer'

export default async function BitcoinBlocksPage() {
  const content = await readFile(
    join(process.cwd(), 'app/docs/bitcoin/blocks/propagation.md'),
    'utf-8'
  )

  return (
    <div>
      <h1 className="text-5xl font-bold mb-8">Block Propagation</h1>
      <MarkdownRenderer content={content} />
    </div>
  )
}
