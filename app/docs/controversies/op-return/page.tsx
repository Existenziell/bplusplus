import { readFileSync } from 'fs'
import { join } from 'path'
import MarkdownRenderer from '../../../components/MarkdownRenderer'

export default function OPReturnControversyPage() {
  const content = readFileSync(
    join(process.cwd(), 'app/docs/controversies/op-return/debate.md'),
    'utf-8'
  )

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
