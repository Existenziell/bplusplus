import { readFile } from 'fs/promises'
import { join } from 'path'
import MarkdownRenderer from '@/app/components/MarkdownRenderer'

export default async function BitcoinScriptPage() {
  const content = await readFile(
    join(process.cwd(), 'app/docs/bitcoin/script/execution.md'),
    'utf-8'
  )

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
