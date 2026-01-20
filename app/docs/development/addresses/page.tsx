import MarkdownRenderer from '@/app/components/MarkdownRenderer'
import { readMarkdown } from '@/app/utils/readMarkdown'

export default async function AddressesPage() {
  const content = await readMarkdown('app/docs/development/addresses/addresses.md')

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
