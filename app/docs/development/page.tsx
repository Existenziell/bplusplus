import type { Metadata } from 'next'
import MarkdownRenderer from '@/app/components/MarkdownRenderer'
import { readMarkdown } from '@/app/utils/readMarkdown'

export const metadata: Metadata = {
  title: 'Getting Started with Bitcoin Development | B++',
  description: 'Introduction to Bitcoin development, covering programming languages, development approaches, networks, and essential tools.',
  openGraph: {
    title: 'Getting Started with Bitcoin Development | B++',
    description: 'Introduction to Bitcoin development, covering programming languages, development approaches, networks, and essential tools.',
  },
}

export default async function DevelopmentPage() {
  const content = await readMarkdown('app/docs/development/overview.md')

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
