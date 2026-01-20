import MarkdownRenderer from '@/app/components/MarkdownRenderer'
import { readMarkdown } from '@/app/utils/readMarkdown'

export default async function LightningRoutingPage() {
  const htlcContent = await readMarkdown('app/docs/lightning/routing/htlc.md')
  const feesContent = await readMarkdown('app/docs/lightning/routing/fees.md')
  const mppContent = await readMarkdown('app/docs/lightning/routing/mpp.md')

  return (
    <div>
      <MarkdownRenderer content={htlcContent} />
      <div className="mt-12">
        <MarkdownRenderer content={feesContent} />
      </div>
      <div className="mt-12">
        <MarkdownRenderer content={mppContent} />
      </div>
    </div>
  )
}
