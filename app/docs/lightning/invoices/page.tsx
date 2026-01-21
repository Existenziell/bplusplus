import MarkdownRenderer from '@/app/components/MarkdownRenderer'
import { readMarkdown } from '@/app/utils/readMarkdown'

export default async function InvoicesPage() {
  const content = await readMarkdown('app/docs/lightning/invoices/invoices.md')

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
