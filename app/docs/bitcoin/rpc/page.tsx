import MarkdownRenderer from '@/app/components/MarkdownRenderer'
import { readMarkdown } from '@/app/utils/readMarkdown'

export default async function RpcPage() {
  const content = await readMarkdown('app/docs/bitcoin/rpc/rpc.md')

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
