import { readFile } from 'fs/promises'
import { join } from 'path'
import MarkdownRenderer from '@/app/components/MarkdownRenderer'

export default async function LightningRoutingPage() {
  const htlcContent = await readFile(
    join(process.cwd(), 'app/docs/lightning/routing/htlc.md'),
    'utf-8'
  )
  const feesContent = await readFile(
    join(process.cwd(), 'app/docs/lightning/routing/fees.md'),
    'utf-8'
  )
  const mppContent = await readFile(
    join(process.cwd(), 'app/docs/lightning/routing/mpp.md'),
    'utf-8'
  )

  return (
    <div>
      <h1 className="text-5xl font-bold mb-8">Lightning Routing & HTLCs</h1>
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
