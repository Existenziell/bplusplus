import MarkdownRenderer from '@/app/components/MarkdownRenderer'
import { readMarkdown } from '@/app/utils/readMarkdown'

export default async function WhatIsMiningPage() {
  const content = await readMarkdown('app/docs/mining/what-is-mining/what-is-mining.md')

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
