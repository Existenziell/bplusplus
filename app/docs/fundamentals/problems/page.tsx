import { readFileSync } from 'fs'
import { join } from 'path'
import MarkdownRenderer from '../../../components/MarkdownRenderer'

export default function ProblemsPage() {
  const content = readFileSync(
    join(process.cwd(), 'app/docs/fundamentals/problems/problems.md'),
    'utf-8'
  )

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
