import { readFileSync } from 'fs'
import { join } from 'path'
import MarkdownRenderer from '../../../components/MarkdownRenderer'

export default function TrustModelPage() {
  const content = readFileSync(
    join(process.cwd(), 'app/docs/fundamentals/trust-model/trust-model.md'),
    'utf-8'
  )

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
