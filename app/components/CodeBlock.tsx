'use client'

import { useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { languageNames } from '@/app/utils/languageNames'
import type { HLJSApi } from 'highlight.js'

// Dynamic import for highlight.js to reduce initial bundle size
// Only load when MultiLanguageCodeBlock is used
let hljsInstance: HLJSApi | null = null
let hljsPromise: Promise<HLJSApi> | null = null

const getHljs = (): Promise<HLJSApi> => {
  if (hljsInstance) return Promise.resolve(hljsInstance)
  if (hljsPromise) return hljsPromise

  hljsPromise = (async () => {
    const hljsModule = await import('highlight.js/lib/core')
    const hljs = hljsModule.default
    // Register only common languages to reduce bundle size
    const [javascript, typescript, python, rust, go, bash, json, sql, cpp] = await Promise.all([
      import('highlight.js/lib/languages/javascript'),
      import('highlight.js/lib/languages/typescript'),
      import('highlight.js/lib/languages/python'),
      import('highlight.js/lib/languages/rust'),
      import('highlight.js/lib/languages/go'),
      import('highlight.js/lib/languages/bash'),
      import('highlight.js/lib/languages/json'),
      import('highlight.js/lib/languages/sql'),
      import('highlight.js/lib/languages/cpp'),
    ])
    hljs.registerLanguage('javascript', javascript.default)
    hljs.registerLanguage('js', javascript.default)
    hljs.registerLanguage('typescript', typescript.default)
    hljs.registerLanguage('ts', typescript.default)
    hljs.registerLanguage('python', python.default)
    hljs.registerLanguage('rust', rust.default)
    hljs.registerLanguage('go', go.default)
    hljs.registerLanguage('bash', bash.default)
    hljs.registerLanguage('shell', bash.default)
    hljs.registerLanguage('json', json.default)
    hljs.registerLanguage('sql', sql.default)
    hljs.registerLanguage('cpp', cpp.default)
    hljs.registerLanguage('c++', cpp.default)
    hljsInstance = hljs
    return hljs
  })()

  return hljsPromise
}

// Escape HTML for fallback rendering
const escapeHtml = (code: string) =>
  code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

interface CodeBlockProps {
  language: string
  children: ReactNode
  className?: string
  [key: string]: any
}

export default function CodeBlock({ language, children, className, ...props }: CodeBlockProps) {
  const displayName = languageNames[language] || language.toUpperCase()

  return (
    <div className="code-block-wrapper my-4">
      <div className="flex items-center justify-between bg-zinc-200 dark:bg-zinc-800 px-4 py-2 rounded-t-lg border-b border-zinc-300 dark:border-zinc-700">
        <span className="text-xs font-mono text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
          {displayName}
        </span>
      </div>
      <pre className="hljs bg-zinc-100 dark:bg-zinc-900 rounded-b-lg p-4 overflow-x-auto border border-zinc-300 dark:border-zinc-700 border-t-0">
        <code className={className} {...props}>
          {children}
        </code>
      </pre>
    </div>
  )
}

interface MultiLanguageCodeBlockProps {
  languages: { lang: string; code: string; className?: string }[]
}

export function MultiLanguageCodeBlock({ languages }: MultiLanguageCodeBlockProps) {
  const [selectedLang, setSelectedLang] = useState(languages[0]?.lang || 'python')
  const [highlightedLanguages, setHighlightedLanguages] = useState<
    { lang: string; highlighted: string; className?: string }[]
  >([])

  // Load highlight.js and process code asynchronously
  useEffect(() => {
    let cancelled = false

    const highlightCode = async () => {
      const hljs = await getHljs()
      if (cancelled) return

      const results = languages.map(({ lang, code, className }) => {
        let highlighted: string
        try {
          const result = hljs.highlight(code, { language: lang, ignoreIllegals: true })
          highlighted = result.value
        } catch {
          try {
            const result = hljs.highlightAuto(code)
            highlighted = result.value
          } catch {
            highlighted = escapeHtml(code)
          }
        }
        return { lang, highlighted, className }
      })

      if (!cancelled) {
        setHighlightedLanguages(results)
      }
    }

    // Show escaped code immediately, then highlight
    setHighlightedLanguages(
      languages.map(({ lang, code, className }) => ({
        lang,
        highlighted: escapeHtml(code),
        className,
      }))
    )

    highlightCode()

    return () => {
      cancelled = true
    }
  }, [languages])

  const selectedCode = highlightedLanguages.find(l => l.lang === selectedLang)

  if (languages.length === 0) return null

  return (
    <div className="multi-language-code-block my-4">
      <div className="flex items-center justify-between bg-zinc-200 dark:bg-zinc-800 px-4 py-2 rounded-t-lg border-b border-zinc-300 dark:border-zinc-700">
        <div className="flex gap-2">
          {languages.map(({ lang }) => (
            <button
              key={lang}
              onClick={() => setSelectedLang(lang)}
              className={`px-3 py-1 text-xs font-mono uppercase tracking-wider rounded transition-colors ${
                selectedLang === lang
                  ? 'bg-btc text-zinc-900 font-semibold'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-300 dark:hover:bg-zinc-700'
              }`}
            >
              {languageNames[lang] || lang.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
      <pre className="hljs bg-zinc-100 dark:bg-zinc-900 rounded-b-lg p-4 overflow-x-auto border border-zinc-300 dark:border-zinc-700 border-t-0">
        <code
          className={`language-${selectedLang} ${selectedCode?.className || ''}`}
          dangerouslySetInnerHTML={{ __html: selectedCode?.highlighted || '' }}
        />
      </pre>
    </div>
  )
}
