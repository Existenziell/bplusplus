import { readFileSync } from 'fs'
import { join } from 'path'
import MarkdownRenderer from '../../../components/MarkdownRenderer'

export default function DecentralizationPage() {
  const content = readFileSync(
    join(process.cwd(), 'app/docs/fundamentals/decentralization/decentralization.md'),
    'utf-8'
  )

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
