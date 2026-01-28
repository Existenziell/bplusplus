import type { Metadata } from 'next'
import { generatePageMetadata } from '@/app/utils/metadata'
import DocsSearch from '@/app/components/DocsSearch'

export const metadata: Metadata = generatePageMetadata({
  title: 'Documentation',
  description: 'Explore the complete Bitcoin documentation. Learn about fundamentals, protocol details, development guides, Lightning Network, and more.',
  path: '/docs',
})

export default function DocsOverviewPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="heading-page mb-4">Documentation Search</h1>
        <p className="text-secondary text-lg max-w-3xl">
          Welcome to the BitcoinDev documentation search. You can also use{` `}
          <code className="code-inline">
            <span className="text-lg inline-block align-middle">⌘</span> + K
          </code>
          {` `}to open the search modal from anywhere.
        </p>
      </div>
      
      <DocsSearch />
    </div>
  )
}
