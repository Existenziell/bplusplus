import { readFileSync } from 'fs'
import path from 'path'
import MarkdownRenderer from '../../../components/MarkdownRenderer'

export default function TestnetsPage() {
  const content = readFileSync(
    path.join(process.cwd(), 'app/docs/development/testnets/testnets.md'),
    'utf-8'
  )
  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
