import GlossaryRenderer from '@/app/components/GlossaryRenderer'
import { readMarkdown } from '@/app/utils/readMarkdown'
import { sections } from '@/app/utils/navigation'
import { generatePageMetadata } from '@/app/utils/metadata'

export const metadata = generatePageMetadata({
  title: 'Glossary',
  description: sections.glossary.description,
  path: '/docs/glossary',
})

export default async function GlossaryPage() {
  // Read the glossary markdown file
  const content = await readMarkdown('app/docs/glossary/terms.md')

  return (
    <div>
      <h1 className="heading-page">Glossary</h1>
      <GlossaryRenderer content={content} />
    </div>
  )
}
