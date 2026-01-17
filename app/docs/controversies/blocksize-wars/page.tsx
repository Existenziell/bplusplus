import { readFileSync } from 'fs'
import { join } from 'path'
import MarkdownRenderer from '../../../components/MarkdownRenderer'

export default function BlocksizeWarsPage() {
  const content = readFileSync(
    join(process.cwd(), 'app/docs/controversies/blocksize-wars/blocksize-wars.md'),
    'utf-8'
  )

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
