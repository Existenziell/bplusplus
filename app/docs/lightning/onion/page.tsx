import MarkdownRenderer from '@/app/components/MarkdownRenderer'
import { readMarkdown } from '@/app/utils/readMarkdown'

export default async function OnionRoutingPage() {
  const content = await readMarkdown('app/docs/lightning/onion/routing.md')

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
