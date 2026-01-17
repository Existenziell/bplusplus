import { readFile } from 'fs/promises'
import { join } from 'path'
import MarkdownRenderer from '@/app/components/MarkdownRenderer'

export default async function MultisigPage() {
  const content = await readFile(
    join(process.cwd(), 'app/docs/wallets/multisig/concepts.md'),
    'utf-8'
  )

  return (
    <div>
      <h1 className="text-5xl font-bold mb-8">Multisig Wallets</h1>
      <MarkdownRenderer content={content} />
    </div>
  )
}
