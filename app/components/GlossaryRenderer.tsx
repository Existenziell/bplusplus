'use client'

import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import Link from 'next/link'
import { ArrowRight, ExternalLinkIcon } from '@/app/components/Icons'

interface GlossaryRendererProps {
  content: string
}

interface GlossaryEntry {
  term: string
  slug: string
  definition: string
}

interface GlossarySection {
  letter: string
  slug: string
  entries: GlossaryEntry[]
}

// Generate slug from text (same as GitHub markdown)
function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Parse the markdown content into structured sections and entries
function parseGlossaryContent(content: string): GlossarySection[] {
  const sections: GlossarySection[] = []
  const lines = content.split('\n')

  let currentSection: GlossarySection | null = null
  let currentEntry: GlossaryEntry | null = null
  let currentDefinitionLines: string[] = []

  for (const line of lines) {
    // Check for section header (## A, ## B, etc.)
    const sectionMatch = line.match(/^## (.+)$/)
    if (sectionMatch) {
      // Save previous entry if exists
      if (currentEntry && currentSection) {
        currentEntry.definition = currentDefinitionLines.join('\n').trim()
        currentSection.entries.push(currentEntry)
        currentEntry = null
        currentDefinitionLines = []
      }

      // Save previous section if exists
      if (currentSection) {
        sections.push(currentSection)
      }

      const letter = sectionMatch[1].trim()
      currentSection = {
        letter,
        slug: generateSlug(letter),
        entries: []
      }
      continue
    }

    // Check for term header (### Term Name)
    const termMatch = line.match(/^### (.+)$/)
    if (termMatch && currentSection) {
      // Save previous entry if exists
      if (currentEntry) {
        currentEntry.definition = currentDefinitionLines.join('\n').trim()
        currentSection.entries.push(currentEntry)
        currentDefinitionLines = []
      }

      const term = termMatch[1].trim()
      currentEntry = {
        term,
        slug: generateSlug(term),
        definition: ''
      }
      continue
    }

    // Accumulate definition content
    if (currentEntry) {
      currentDefinitionLines.push(line)
    }
  }

  // Save last entry and section
  if (currentEntry && currentSection) {
    currentEntry.definition = currentDefinitionLines.join('\n').trim()
    currentSection.entries.push(currentEntry)
  }
  if (currentSection) {
    sections.push(currentSection)
  }

  return sections
}

// Mini markdown renderer for definitions (inline content only)
function DefinitionRenderer({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        p: ({ children }) => <p className="mb-4 leading-7 last:mb-0">{children}</p>,
        a: ({ href, children }) => {
          if (href?.startsWith('/')) {
            return <Link href={href} className="text-btc hover:underline">{children}</Link>
          }
          if (href?.startsWith('#')) {
            return <a href={href} className="text-btc hover:underline">{children}</a>
          }
          return (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-btc hover:underline external-link group inline-flex items-center"
            >
              {children}
              <span className="inline-block w-0 group-hover:w-3 overflow-hidden transition-all duration-200 ml-0.5">
                <ExternalLinkIcon className="opacity-0 group-hover:opacity-70 transition-opacity duration-200" />
              </span>
            </a>
          )
        },
        code: ({ children }) => (
          <code className="bg-zinc-200 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-sm font-mono text-btc">
            {children}
          </code>
        ),
        strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
        em: ({ children }) => <em>{children}</em>,
      }}
    >
      {content}
    </ReactMarkdown>
  )
}

export default function GlossaryRenderer({ content }: GlossaryRendererProps) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null)
  const sections = React.useMemo(() => parseGlossaryContent(content), [content])

  // Handle initial hash and hash changes
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.slice(1) // Remove the #
      if (hash) {
        setActiveSlug(hash)

        // Scroll to the element after a brief delay to allow expansion
        setTimeout(() => {
          const element = document.getElementById(hash)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        }, 100)
      }
    }

    // Check on mount
    handleHash()

    // Listen for hash changes
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  // Handle clicking on a term to update URL hash
  const handleTermClick = (slug: string, isOpen: boolean) => {
    if (isOpen) {
      // Opening - update hash
      window.history.pushState(null, '', `#${slug}`)
      setActiveSlug(slug)
    } else {
      // Closing - clear hash if it matches
      if (activeSlug === slug) {
        window.history.pushState(null, '', window.location.pathname)
        setActiveSlug(null)
      }
    }
  }

  return (
    <div className="glossary-accordion">
      {sections.map((section) => (
        <div key={section.slug} className="mb-8">
          {/* Section letter header */}
          <h2
            id={section.slug}
            className="text-4xl sm:text-5xl font-bold mt-12 mb-6 text-btc border-b-2 border-btc pb-3 first:mt-4"
          >
            {section.letter}
          </h2>

          {/* Entries as collapsible details elements */}
          <div className="space-y-2">
            {section.entries.map((entry) => (
              <details
                key={entry.slug}
                id={entry.slug}
                className="glossary-entry group"
                open={activeSlug === entry.slug}
                onToggle={(e) => {
                  const details = e.currentTarget as HTMLDetailsElement
                  handleTermClick(entry.slug, details.open)
                }}
              >
                <summary className="glossary-summary cursor-pointer list-none flex items-center gap-2 py-3 px-4 rounded-lg bg-zinc-100 dark:bg-zinc-800/50 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors">
                  {/* Chevron icon */}
                  <ArrowRight className="w-4 h-4 text-secondary transition-transform duration-200 group-open:rotate-90 flex-shrink-0" />
                  <span className="heading-subsection">
                    {entry.term}
                  </span>
                </summary>

                <div className="glossary-definition px-4 py-4 ml-6 border-l-2 border-zinc-200 dark:border-zinc-700 mt-2 text-zinc-800 dark:text-zinc-200">
                  <DefinitionRenderer content={entry.definition} />
                </div>
              </details>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
