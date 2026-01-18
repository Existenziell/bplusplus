import { readFileSync } from 'fs'
import path from 'path'
import MarkdownRenderer from '../../../components/MarkdownRenderer'

export default function HardwarePage() {
  const content = readFileSync(
    path.join(process.cwd(), 'app/docs/mining/hardware/hardware.md'),
    'utf-8'
  )
  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
