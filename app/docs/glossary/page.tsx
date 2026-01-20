import type { Metadata } from 'next'
import { readFile } from 'fs/promises'
import { join } from 'path'
import MarkdownRenderer from '@/app/components/MarkdownRenderer'

export const metadata: Metadata = {
  title: 'Bitcoin Glossary | B++',
  description: 'Glossary of Bitcoin terms, concepts, and technical vocabulary.',
  openGraph: {
    title: 'Bitcoin Glossary | B++',
    description: 'Glossary of Bitcoin terms, concepts, and technical vocabulary.',
  },
}

export default async function GlossaryPage() {
  const content = await readFile(
    join(process.cwd(), 'app/docs/glossary/terms.md'),
    'utf-8'
  )

  return (
    <div>
      <h1 className="text-5xl font-bold mb-12">Bitcoin Glossary</h1>
      <div className="glossary-content">
        <MarkdownRenderer content={content} />
      </div>
    </div>
  )
}
