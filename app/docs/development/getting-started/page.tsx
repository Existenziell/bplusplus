import { readFileSync } from 'fs'
import path from 'path'
import MarkdownRenderer from '../../../components/MarkdownRenderer'

export default function GettingStartedPage() {
  const content = readFileSync(
    path.join(process.cwd(), 'app/docs/development/getting-started/getting-started.md'),
    'utf-8'
  )
  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
