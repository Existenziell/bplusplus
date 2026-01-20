import type { Metadata } from 'next'
import { readFileSync } from 'fs'
import { join } from 'path'
import MarkdownRenderer from '../../../components/MarkdownRenderer'

export const metadata: Metadata = {
  title: 'Cryptography in Bitcoin | B++',
  description: 'Understand the cryptographic foundations of Bitcoin, including SHA-256, elliptic curve cryptography, digital signatures, and Merkle trees.',
  openGraph: {
    title: 'Cryptography in Bitcoin | B++',
    description: 'Understand the cryptographic foundations of Bitcoin, including SHA-256, elliptic curve cryptography, digital signatures, and Merkle trees.',
  },
}

export default function CryptographyPage() {
  const content = readFileSync(
    join(process.cwd(), 'app/docs/fundamentals/cryptography/cryptography.md'),
    'utf-8'
  )

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
