import MarkdownRenderer from '@/app/components/MarkdownRenderer'
import { readMarkdown } from '@/app/utils/readMarkdown'

export default async function HardwarePage() {
  const content = await readMarkdown('app/docs/mining/hardware/hardware.md')

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
