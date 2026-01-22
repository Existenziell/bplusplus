import MarkdownRenderer from '@/app/components/MarkdownRenderer'
import { readMarkdown } from '@/app/utils/readMarkdown'

export default async function CypherpunkPhilosophyPage() {
  const content = await readMarkdown('app/docs/fundamentals/cypherpunk-philosophy/cypherpunk-philosophy.md')

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
