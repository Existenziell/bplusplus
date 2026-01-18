import { readFileSync } from 'fs'
import path from 'path'
import MarkdownRenderer from '../../../components/MarkdownRenderer'

export default function CraigWrightPage() {
  const content = readFileSync(
    path.join(process.cwd(), 'app/docs/controversies/craig-wright/craig-wright.md'),
    'utf-8'
  )
  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
