import { readFile } from 'fs/promises'
import { join } from 'path'
import MarkdownRenderer from '@/app/components/MarkdownRenderer'

export default async function LightningBasicsPage() {
  const content = await readFile(
    join(process.cwd(), 'app/docs/lightning/basics/getting-started.md'),
    'utf-8'
  )

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
