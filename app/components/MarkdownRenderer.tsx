'use client'

import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import Link from 'next/link'
import CodeBlock from './CodeBlock'

interface MarkdownRendererProps {
  content: string
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
  if (React.isValidElement(children) && children.props.children) {
    return extractText(children.props.children)
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

// YouTube embed component
function YouTubeEmbed({ videoId }: { videoId: string }) {
  return (
    <div className="my-6">
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        <iframe
          className="absolute top-0 left-0 w-full h-full rounded-lg"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </div>
  )
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="markdown-content prose prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeHighlight]}
        components={{
          h1: ({ children, ...props }: any) => {
            const text = extractText(children)
            const id = generateSlug(text)
            return (
              <h1 id={id} {...props}>
                {children}
              </h1>
            )
          },
          h2: ({ children, ...props }: any) => {
            const text = extractText(children)
            const id = generateSlug(text)
            return (
              <h2 id={id} {...props}>
                {children}
              </h2>
            )
          },
          h3: ({ children, ...props }: any) => {
            const text = extractText(children)
            const id = generateSlug(text)
            return (
              <h3 id={id} {...props}>
                {children}
              </h3>
            )
          },
          h4: ({ children, ...props }: any) => {
            const text = extractText(children)
            const id = generateSlug(text)
            return (
              <h4 id={id} {...props}>
                {children}
              </h4>
            )
          },
          h5: ({ children, ...props }: any) => {
            const text = extractText(children)
            const id = generateSlug(text)
            return (
              <h5 id={id} {...props}>
                {children}
              </h5>
            )
          },
          h6: ({ children, ...props }: any) => {
            const text = extractText(children)
            const id = generateSlug(text)
            return (
              <h6 id={id} {...props}>
                {children}
              </h6>
            )
          },
          p: ({ children, ...props }: any) => {
            // Check if paragraph contains only a YouTube link
            const childrenArray = React.Children.toArray(children)
            if (childrenArray.length === 1) {
              const child = childrenArray[0] as any
              // Check if it's a link element
              if (React.isValidElement(child)) {
                const href = child.props?.href
                if (href && (href.includes('youtube.com') || href.includes('youtu.be'))) {
                  const videoId = getYouTubeVideoId(href)
                  if (videoId) {
                    // Return embed directly instead of wrapping in p
                    return <YouTubeEmbed videoId={videoId} />
                  }
                }
              }
            }
            // Default paragraph rendering
            return <p {...props}>{children}</p>
          },
          a: ({ href, children, ...props }: any) => {
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
            // YouTube video embeds - return regular link, p component will handle embedding
            // Don't embed here to avoid nesting issues
            // External links
            return (
              <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
                {children}
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
            const codeElement = React.Children.toArray(children)[0] as any

            if (codeElement && (codeElement.type === 'code' || codeElement.props?.className?.includes('language-'))) {
              const className = codeElement.props?.className || ''
              const match = /language-(\w+)/.exec(className)
              const language = match ? match[1] : ''

              // Use CodeBlock component for code blocks with language labels
              // This prevents the pre from being wrapped in a p tag
              return (
                <CodeBlock language={language} className={className} {...props}>
                  {codeElement.props?.children}
                </CodeBlock>
              )
            }

            // Fallback to default pre rendering
            return (
              <pre className="hljs bg-zinc-900 rounded-lg p-4 overflow-x-auto mb-4 border border-zinc-700" {...props}>
                {children}
              </pre>
            )
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
