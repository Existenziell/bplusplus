import MarkdownRenderer from '@/app/components/MarkdownRenderer'
import { readMarkdown } from '@/app/utils/readMarkdown'

export default async function TrampolinePage() {
  const content = await readMarkdown('app/docs/lightning/trampoline/trampoline.md')

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
