import MarkdownRenderer from '@/app/components/MarkdownRenderer'
import { readMarkdown } from '@/app/utils/readMarkdown'

export default async function WatchtowersPage() {
  const content = await readMarkdown('app/docs/lightning/watchtowers/watchtowers.md')

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
