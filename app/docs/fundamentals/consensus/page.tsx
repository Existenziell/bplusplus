import { readFileSync } from 'fs'
import { join } from 'path'
import MarkdownRenderer from '../../../components/MarkdownRenderer'

export default function ConsensusPage() {
  const content = readFileSync(
    join(process.cwd(), 'app/docs/fundamentals/consensus/consensus.md'),
    'utf-8'
  )

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
