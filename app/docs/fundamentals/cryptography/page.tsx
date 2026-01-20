import type { Metadata } from 'next'
import MarkdownRenderer from '@/app/components/MarkdownRenderer'
import { readMarkdown } from '@/app/utils/readMarkdown'

export const metadata: Metadata = {
  title: 'Bitcoin Cryptography | B++',
  description: 'Explore the cryptographic foundations of Bitcoin including SHA-256, ECDSA, Schnorr signatures, and Merkle trees.',
  openGraph: {
    title: 'Bitcoin Cryptography | B++',
    description: 'Explore the cryptographic foundations of Bitcoin including SHA-256, ECDSA, Schnorr signatures, and Merkle trees.',
  },
}

export default async function CryptographyPage() {
  const content = await readMarkdown('app/docs/fundamentals/cryptography/cryptography.md')

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
