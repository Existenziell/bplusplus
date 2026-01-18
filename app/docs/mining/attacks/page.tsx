import { readFileSync } from 'fs'
import path from 'path'
import MarkdownRenderer from '../../../components/MarkdownRenderer'

export default function AttacksPage() {
  const content = readFileSync(
    path.join(process.cwd(), 'app/docs/mining/attacks/attacks.md'),
    'utf-8'
  )
  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
