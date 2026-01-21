import type { Metadata } from 'next'
import MarkdownRenderer from '@/app/components/MarkdownRenderer'
import { readMarkdown } from '@/app/utils/readMarkdown'

export const metadata: Metadata = {
  title: 'Bitcoin Controversies | B++',
  description: "Major debates and controversies that have shaped Bitcoin's development, from the Blocksize Wars to energy consumption debates.",
  openGraph: {
    title: 'Bitcoin Controversies | B++',
    description: "Major debates and controversies that have shaped Bitcoin's development, from the Blocksize Wars to energy consumption debates.",
  },
}

export default async function ControversiesPage() {
  const content = await readMarkdown('app/docs/controversies/overview.md')

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
