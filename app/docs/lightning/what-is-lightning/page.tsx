import MarkdownRenderer from '@/app/components/MarkdownRenderer'
import { readMarkdown } from '@/app/utils/readMarkdown'

export default async function WhatIsLightningPage() {
  const content = await readMarkdown('app/docs/lightning/what-is-lightning/what-is-lightning.md')

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
