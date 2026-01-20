import { readFile } from 'fs/promises'
import { join } from 'path'
import MarkdownRenderer from '@/app/components/MarkdownRenderer'
import Image from 'next/image'

export default async function SubsidyPage() {
  const content = await readFile(
    join(process.cwd(), 'app/docs/bitcoin/subsidy/equation.md'),
    'utf-8'
  )

  return (
    <div>
      <div className="mb-8">
        <Image
          src="/graphs/subsidy-equation.webp"
          alt="Subsidy Equation Graph"
          width={1000}
          height={564}
          className="shadow-xl rounded-md w-auto h-auto mb-8"
          priority
        />
      </div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
