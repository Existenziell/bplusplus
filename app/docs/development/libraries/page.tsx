import { readFileSync } from 'fs'
import path from 'path'
import MarkdownRenderer from '../../../components/MarkdownRenderer'

export default function LibrariesPage() {
  const content = readFileSync(
    path.join(process.cwd(), 'app/docs/development/libraries/libraries.md'),
    'utf-8'
  )
  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
