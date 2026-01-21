import type { Metadata } from 'next'
import MarkdownRenderer from '@/app/components/MarkdownRenderer'
import { readMarkdown } from '@/app/utils/readMarkdown'

export const metadata: Metadata = {
  title: 'What is a Wallet? | B++',
  description: 'Introduction to Bitcoin wallets, including types of wallets, how they work, security best practices, and how to create one.',
  openGraph: {
    title: 'What is a Wallet? | B++',
    description: 'Introduction to Bitcoin wallets, including types of wallets, how they work, security best practices, and how to create one.',
  },
}

export default async function WalletsPage() {
  const content = await readMarkdown('app/docs/wallets/overview.md')

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
