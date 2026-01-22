import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import MarkdownRenderer from '@/app/components/MarkdownRenderer'
import { readMarkdown } from '@/app/utils/readMarkdown'
import { pathToMdFile, docPages, sections } from '@/app/utils/navigation'

// Force static generation for all doc pages - they only read from filesystem
export const dynamic = 'force-static'

interface PageProps {
  params: {
    slug: string[]
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const path = `/docs/${params.slug.join('/')}`
  const page = docPages.find(p => p.path === path)

  if (!page) {
    return {
      title: 'Page Not Found | B++',
    }
  }

  // Get section description for overview pages
  const sectionInfo = sections[page.section]
  const description = sectionInfo
    ? sectionInfo.description
    : `${page.title} - Bitcoin development documentation`

  return {
    title: `${page.title} | B++`,
    description,
    openGraph: {
      title: `${page.title} | B++`,
      description,
    },
  }
}

export default async function DocPage({ params }: PageProps) {
  // Reconstruct the path from slug segments
  const path = `/docs/${params.slug.join('/')}`

  // Look up the markdown file for this path
  const mdFile = pathToMdFile[path]

  // If path doesn't exist in our mapping, return 404
  if (!mdFile) {
    notFound()
  }

  // Read and render the markdown content
  const content = await readMarkdown(mdFile)

  return (
    <div>
      <MarkdownRenderer content={content} />
    </div>
  )
}
