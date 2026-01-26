import type { Metadata } from 'next'
import { generatePageMetadata } from '@/app/utils/metadata'
import DocsAccordionNavigation from '@/app/components/DocsAccordionNavigation'

export const metadata: Metadata = generatePageMetadata({
  title: 'Documentation',
  description: 'Explore the complete Bitcoin documentation. Learn about fundamentals, protocol details, development guides, Lightning Network, and more.',
  path: '/docs',
})

export default function DocsOverviewPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="heading-page mb-4">Documentation</h1>
        <p className="text-secondary text-lg max-w-3xl">
          Welcome to the B++ documentation. Search for topics to discover content that interests you.
        </p>
      </div>
      
      <DocsAccordionNavigation />
    </div>
  )
}
