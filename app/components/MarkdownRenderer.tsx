'use client'

import React, { useMemo } from 'react'
import ReactMarkdown from 'react-markdown'
import type { Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import Link from 'next/link'
import CodeBlock, { MultiLanguageCodeBlock } from '@/app/components/CodeBlock'
import GlossaryTooltip from '@/app/components/GlossaryTooltip'
import { ExternalLinkIcon } from '@/app/components/Icons'
import { useGlossary } from '@/app/contexts/GlossaryContext'

interface MarkdownRendererProps {
  content: string
}

interface CodeGroupBlock {
  id: string
  languages: { lang: string; code: string }[]
}

// Parse :::code-group blocks and extract code blocks within them
function parseCodeGroups(content: string): { processedContent: string; codeGroups: CodeGroupBlock[] } {
  const codeGroups: CodeGroupBlock[] = []
  let groupCounter = 0

  // Match :::code-group ... ::: blocks
  const codeGroupRegex = /:::code-group\s*\n([\s\S]*?)\n:::/g

  const processedContent = content.replace(codeGroupRegex, (match, groupContent) => {
    const groupId = `code-group-${groupCounter++}`
    const languages: { lang: string; code: string }[] = []

    // Extract individual code blocks from the group
    const codeBlockRegex = /```(\w+)\s*\n([\s\S]*?)```/g
    let codeMatch

    while ((codeMatch = codeBlockRegex.exec(groupContent)) !== null) {
      const lang = codeMatch[1]
      const code = codeMatch[2].trim()
      languages.push({ lang, code })
    }

    if (languages.length > 0) {
      codeGroups.push({ id: groupId, languages })
      // Return a placeholder that we'll render as the MultiLanguageCodeBlock
      return `<div data-code-group-id="${groupId}"></div>`
    }

    // If no code blocks found, return original content
    return match
  })

  return { processedContent, codeGroups }
}

// Generate slug from text (same as GitHub markdown)
function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces, underscores, and multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
}

// Extract text content from React children
function extractText(children: React.ReactNode): string {
  if (typeof children === 'string') {
    return children
  }
  if (typeof children === 'number') {
    return String(children)
  }
  if (Array.isArray(children)) {
    return children.map(extractText).join('')
  }
  if (React.isValidElement(children)) {
    const props = children.props as { children?: React.ReactNode }
    if (props && props.children) {
      return extractText(props.children)
    }
  }
  return ''
}

// Extract YouTube video ID from URL
function getYouTubeVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match && match[1]) {
      return match[1]
    }
  }
  return null
}

// Lazy-loading YouTube embed component using Intersection Observer
function YouTubeEmbed({ videoId }: { videoId: string }) {
  const [isVisible, setIsVisible] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const iframeRef = React.useRef<HTMLIFrameElement>(null)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '100px' } // Load when within 100px of viewport
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Set credentialless attribute to reduce cookie warnings
  React.useEffect(() => {
    if (isVisible && iframeRef.current) {
      iframeRef.current.setAttribute('credentialless', '')
    }
  }, [isVisible])

  return (
    <div className="my-6" ref={containerRef}>
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        {isVisible ? (
          <iframe
            ref={iframeRef}
            className="absolute top-0 left-0 w-full h-full rounded-md"
            src={`https://www.youtube-nocookie.com/embed/${videoId}?modestbranding=1&rel=0`}
            title="YouTube video player"
            loading="lazy"
            allow="accelerometer; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : (
          <div className="absolute top-0 left-0 w-full h-full rounded-md bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
            <div className="text-zinc-500 dark:text-zinc-400">Loading video...</div>
          </div>
        )}
      </div>
    </div>
  )
}

// Memoize plugin arrays at module level to prevent recreation
const remarkPlugins = [remarkGfm]
// rehype-highlight runs at BUILD TIME for static pages (not runtime) - this is optimal
const rehypePlugins = [rehypeRaw, rehypeHighlight]

// Factory function to create heading components (h1-h6)
// Using any for props is acceptable here - react-markdown handles internal typing
// and we're mostly just extracting text and passing props through
const createHeading = (level: number) => {
  const HeadingComponent = ({ children, ...props }: any) => {
    const text = extractText(children)
    const id = generateSlug(text)
    // Extract node from props to avoid passing it to the DOM element
    const { node, ...htmlProps } = props

    const Tag = `h${level}` as keyof React.JSX.IntrinsicElements
    return (
      <Tag id={id} {...htmlProps}>
        {children}
      </Tag>
    )
  }
  HeadingComponent.displayName = `Heading${level}`
  return HeadingComponent
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // Use glossary data from context (loaded once globally)
  const { glossaryData } = useGlossary()

  // Memoize the parsing of code groups - this is expensive regex processing
  const { processedContent, codeGroupMap } = useMemo(() => {
    const { processedContent: finalContent, codeGroups } = parseCodeGroups(content)
    const codeGroupMap = new Map(codeGroups.map(g => [g.id, g]))
    return { processedContent: finalContent, codeGroupMap }
  }, [content])

  // Memoize components object to prevent recreation on every render
  // Using any for component props is acceptable - react-markdown handles internal typing
  // and we're mostly passing props through or accessing specific known properties
  const components = useMemo<Components>(() => ({
    // Handle code group placeholders
    div: ({ node, children, ...props }: any) => {
      const codeGroupId = props['data-code-group-id']
      if (codeGroupId && codeGroupMap.has(codeGroupId)) {
        const group = codeGroupMap.get(codeGroupId)!
        return (
          <MultiLanguageCodeBlock
            languages={group.languages.map(({ lang, code }) => ({
              lang,
              code,
              className: `language-${lang}`
            }))}
          />
        )
      }
      return <div {...props}>{children}</div>
    },
    h1: createHeading(1),
    h2: createHeading(2),
    h3: createHeading(3),
    h4: createHeading(4),
    h5: createHeading(5),
    h6: createHeading(6),
    p: ({ children, ...props }: any) => {
      // Check if paragraph contains a YouTube embed (set by a component)
      const childrenArray = React.Children.toArray(children)

      // Check if paragraph contains a YouTube embed span
      for (const child of childrenArray) {
        if (React.isValidElement(child)) {
          const childProps = child.props as { 'data-youtube-embed'?: string }
          const videoId = childProps?.['data-youtube-embed']

          if (videoId) {
            // Extract text content from other children (excluding the embed)
            const otherChildren = childrenArray.filter(c => c !== child)
            const otherText = otherChildren.map(extractText).join('').trim()

            // If paragraph only contains the YouTube embed (or embed + minimal whitespace), return just the embed
            if (otherText === '' || childrenArray.length === 1) {
              return <YouTubeEmbed videoId={videoId} />
            }
          }
        }
      }

      // Also check for direct YouTube links (fallback for cases where a component didn't catch it)
      for (const child of childrenArray) {
        if (React.isValidElement(child)) {
          const childProps = child.props as { href?: string }
          const href = childProps?.href

          if (href && typeof href === 'string' && (href.includes('youtube.com') || href.includes('youtu.be'))) {
            const videoId = getYouTubeVideoId(href)
            if (videoId) {
              const otherChildren = childrenArray.filter(c => c !== child)
              const otherText = otherChildren.map(extractText).join('').trim()

              if (otherText === '' || childrenArray.length === 1) {
                return <YouTubeEmbed videoId={videoId} />
              }
            }
          }
        }
      }

      // Default paragraph rendering
      return <p {...props}>{children}</p>
    },
    a: ({ href, children, ...props }: any) => {
      // YouTube video embeds - check first
      if (href && typeof href === 'string' && (href.includes('youtube.com') || href.includes('youtu.be'))) {
        const videoId = getYouTubeVideoId(href)
        if (videoId) {
          // Return embed with a marker so p component can detect and replace the paragraph
          return (
            <span data-youtube-embed={videoId} style={{ display: 'block' }}>
              <YouTubeEmbed videoId={videoId} />
            </span>
          )
        }
      }
      // Glossary links with tooltip
      if (href?.startsWith('/docs/glossary#')) {
        return (
          <GlossaryTooltip href={href} glossaryData={glossaryData}>
            {children}
          </GlossaryTooltip>
        )
      }
      // Internal Next.js links
      if (href?.startsWith('/')) {
        return (
          <Link href={href} {...props}>
            {children}
          </Link>
        )
      }
      // Anchor links (same page)
      if (href?.startsWith('#')) {
        return (
          <a href={href} {...props}>
            {children}
          </a>
        )
      }
      // External links
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="external-link group inline-flex items-center"
          {...props}
        >
          {children}
          <span className="inline-block w-0 group-hover:w-3 overflow-hidden transition-all duration-200 ml-0.5">
            <ExternalLinkIcon className="opacity-0 group-hover:opacity-70 transition-opacity duration-200" />
          </span>
        </a>
      )
    },
    code: ({ inline, className, children, ...props }: any) => {
      // Only handle inline code here
      if (inline) {
        return (
          <code className="inline-code" {...props}>
            {children}
          </code>
        )
      }
      // For block-level code, return the code element as-is
      // The pre component will handle the wrapper
      return (
        <code className={className} {...props}>
          {children}
        </code>
      )
    },
    pre: ({ children, ...props }: any) => {
      // In react-markdown, pre contains a code element as its child
      // Extract the code element and its properties
      const codeElement = React.Children.toArray(children)[0]

      if (React.isValidElement(codeElement) && codeElement.type === 'code') {
        const className = (codeElement.props as { className?: string })?.className || ''
        const match = /language-(\w+)/.exec(className)
        const language = match ? match[1] : ''

        // Use CodeBlock component for code blocks with language labels
        // This prevents the pre from being wrapped in a p tag
        return (
          <CodeBlock language={language} className={className} {...props}>
            {(codeElement.props as { children?: React.ReactNode })?.children}
          </CodeBlock>
        )
      }

      // Fallback to default pre rendering
      return (
        <pre className="hljs bg-zinc-100 dark:bg-zinc-900 rounded-lg p-4 overflow-x-auto mb-4 border border-zinc-300 dark:border-zinc-700" {...props}>
          {children}
        </pre>
      )
    },
  }), [codeGroupMap, glossaryData])

  return (
    <div className="markdown-content prose prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={remarkPlugins}
        rehypePlugins={rehypePlugins}
        components={components}
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  )
}
