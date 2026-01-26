import GlossaryRenderer from '@/app/components/GlossaryRenderer'
import { sections } from '@/app/utils/navigation'
import { generatePageMetadata } from '@/app/utils/metadata'
import mdContent from '@/public/data/md-content.json'

export const metadata = generatePageMetadata({
  title: 'Glossary',
  description: sections.glossary.description,
  path: '/docs/glossary',
})

export default async function GlossaryPage() {
  // Get glossary content from pre-generated md-content.json (same as other doc pages)
  const entry = (mdContent as Record<string, { content: string }>)['/docs/glossary']
  const content = entry?.content || ''

  return (
    <div>
      <h1 className="heading-page">Glossary</h1>
      <GlossaryRenderer content={content} />
    </div>
  )
}
