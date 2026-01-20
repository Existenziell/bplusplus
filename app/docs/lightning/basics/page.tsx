import MarkdownRenderer from '@/app/components/MarkdownRenderer'
import { readMarkdown } from '@/app/utils/readMarkdown'

export default async function LightningBasicsPage() {
  const content = await readMarkdown('app/docs/lightning/basics/getting-started.md')

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
