import { readFile } from 'fs/promises'
import { join } from 'path'
import MarkdownRenderer from '@/app/components/MarkdownRenderer'

export default async function GlossaryPage() {
  const content = await readFile(
    join(process.cwd(), 'app/docs/glossary/terms.md'),
    'utf-8'
  )

  return (
    <div>
      <h1 className="text-5xl font-bold mb-4">Bitcoin Development Glossary</h1>
      <p className="text-xl text-zinc-400 mb-8">
        A comprehensive glossary of Bitcoin and Lightning Network development terms.
      </p>
      <div className="glossary-content">
        <MarkdownRenderer content={content} />
      </div>
    </div>
  )
}
