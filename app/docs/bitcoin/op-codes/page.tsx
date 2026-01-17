import { readFileSync } from 'fs'
import { join } from 'path'
import MarkdownRenderer from '../../../components/MarkdownRenderer'

export default function OPCodesPage() {
  const content = readFileSync(
    join(process.cwd(), 'app/docs/bitcoin/op-codes/codes.md'),
    'utf-8'
  )

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
