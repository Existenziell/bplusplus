import { readFileSync } from 'fs'
import path from 'path'
import MarkdownRenderer from '../../../components/MarkdownRenderer'

export default function MtGoxPage() {
  const content = readFileSync(
    path.join(process.cwd(), 'app/docs/controversies/mt-gox/mt-gox.md'),
    'utf-8'
  )
  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
