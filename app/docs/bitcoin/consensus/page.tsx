import type { Metadata } from 'next'
import MarkdownRenderer from '@/app/components/MarkdownRenderer'
import { readMarkdown } from '@/app/utils/readMarkdown'

export const metadata: Metadata = {
  title: 'Consensus Mechanism | B++',
  description: 'How Bitcoin achieves agreement among network participants about transaction validity and blockchain state without a central authority.',
  openGraph: {
    title: 'Consensus Mechanism | B++',
    description: 'How Bitcoin achieves agreement among network participants about transaction validity and blockchain state without a central authority.',
  },
}

export default async function ConsensusPage() {
  const content = await readMarkdown('app/docs/bitcoin/consensus/consensus.md')

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
