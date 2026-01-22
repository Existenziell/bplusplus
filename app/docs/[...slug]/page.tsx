import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import MarkdownRenderer from '@/app/components/MarkdownRenderer'
import GlossaryRenderer from '@/app/components/GlossaryRenderer'
import { readMarkdown } from '@/app/utils/readMarkdown'
import { pathToMdFile, docPages, sections } from '@/app/utils/navigation'

// Force static generation for all doc pages - they only read from filesystem
export const dynamic = 'force-static'

// Generate static params for all doc pages at build time
export async function generateStaticParams() {
  return docPages.map((page) => {
    // Remove '/docs/' prefix and split into slug array
    const slug = page.path.replace('/docs/', '').split('/').filter(Boolean)
    return { slug }
  })
}

interface PageProps {
  params: {
    slug: string[]
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  // Handle case where slug might be undefined or empty
  if (!params?.slug || !Array.isArray(params.slug) || params.slug.length === 0) {
    return {
      title: 'Page Not Found | B++',
    }
  }

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
  // Handle case where slug might be undefined or empty
  if (!params?.slug || !Array.isArray(params.slug) || params.slug.length === 0) {
    notFound()
  }

  // Reconstruct the path from slug segments
  const path = `/docs/${params.slug.join('/')}`

  // Look up the markdown file for this path
  const mdFile = pathToMdFile[path]

  // If path doesn't exist in our mapping, return 404
  if (!mdFile) {
    notFound()
  }

  // Read and render the markdown content
  try {
    const content = await readMarkdown(mdFile)

    // Use GlossaryRenderer for glossary page, MarkdownRenderer for all other pages
    const isGlossaryPage = path === '/docs/glossary'

    return (
      <div>
        {isGlossaryPage ? (
          <GlossaryRenderer content={content} />
        ) : (
          <MarkdownRenderer content={content} />
        )}
      </div>
    )
  } catch (error) {
    // Log error in production for debugging
    console.error(`Error reading markdown file ${mdFile}:`, error)
    notFound()
  }
}
