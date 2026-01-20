import type { Metadata } from 'next'
import MarkdownRenderer from '@/app/components/MarkdownRenderer'
import { readMarkdown } from '@/app/utils/readMarkdown'

export const metadata: Metadata = {
  title: 'Bitcoin Glossary | B++',
  description: 'Glossary of Bitcoin terms, concepts, and technical vocabulary.',
  openGraph: {
    title: 'Bitcoin Glossary | B++',
    description: 'Glossary of Bitcoin terms, concepts, and technical vocabulary.',
  },
}

export default async function GlossaryPage() {
  const content = await readMarkdown('app/docs/glossary/terms.md')

  return (
    <div>
      <h1 className="text-5xl font-bold mb-12">Bitcoin Glossary</h1>
      <div className="glossary-content">
        <MarkdownRenderer content={content} />
      </div>
    </div>
  )
}
