import MarkdownRenderer from '@/app/components/MarkdownRenderer'
import { readMarkdown } from '@/app/utils/readMarkdown'

export default async function BlocksizeWarsPage() {
  const content = await readMarkdown('app/docs/controversies/blocksize-wars/blocksize-wars.md')

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
