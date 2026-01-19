import { readFile } from 'fs/promises'
import { join } from 'path'
import MarkdownRenderer from '@/app/components/MarkdownRenderer'

export default async function BitcoinRPCPage() {
  const content = await readFile(
    join(process.cwd(), 'app/docs/bitcoin/rpc/guide.md'),
    'utf-8'
  )

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
