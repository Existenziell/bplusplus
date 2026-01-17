import { readFileSync } from 'fs'
import { join } from 'path'
import MarkdownRenderer from '../../../components/MarkdownRenderer'

export default function ProofOfWorkPage() {
  const content = readFileSync(
    join(process.cwd(), 'app/docs/mining/proof-of-work.md'),
    'utf-8'
  )

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
