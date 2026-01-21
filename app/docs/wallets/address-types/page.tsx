import MarkdownRenderer from '@/app/components/MarkdownRenderer'
import { readMarkdown } from '@/app/utils/readMarkdown'

export default async function AddressTypesPage() {
  const content = await readMarkdown('app/docs/wallets/address-types/address-types.md')

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
