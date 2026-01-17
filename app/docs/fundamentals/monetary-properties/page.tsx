import { readFileSync } from 'fs'
import { join } from 'path'
import MarkdownRenderer from '../../../components/MarkdownRenderer'

export default function MonetaryPropertiesPage() {
  const content = readFileSync(
    join(process.cwd(), 'app/docs/fundamentals/monetary-properties/monetary-properties.md'),
    'utf-8'
  )

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
