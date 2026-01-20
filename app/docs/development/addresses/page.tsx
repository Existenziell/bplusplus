import { readFileSync } from 'fs'
import path from 'path'
import MarkdownRenderer from '../../../components/MarkdownRenderer'

export default function AddressesPage() {
  const content = readFileSync(
    path.join(process.cwd(), 'app/docs/development/addresses/addresses.md'),
    'utf-8'
  )
  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
