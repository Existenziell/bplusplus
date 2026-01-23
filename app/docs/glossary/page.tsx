import type { Metadata } from 'next'
import GlossaryRenderer from '@/app/components/GlossaryRenderer'
import { readMarkdown } from '@/app/utils/readMarkdown'
import { sections } from '@/app/utils/navigation'

export const metadata: Metadata = {
  title: 'Glossary | B++',
  description: sections.glossary.description,
  openGraph: {
    title: 'Glossary | B++',
    description: sections.glossary.description,
  },
}

export default async function GlossaryPage() {
  // Read the glossary markdown file
  const content = await readMarkdown('app/docs/glossary/terms.md')

  return (
    <div>
      <h1 className="heading-page mb-8">Glossary</h1>
      <GlossaryRenderer content={content} />
    </div>
  )
}
