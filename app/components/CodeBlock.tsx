'use client'

import { useState, useMemo } from 'react'
import type { ReactNode } from 'react'
import { languageNames } from '../utils/languageNames'
import hljs from 'highlight.js'

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

  // Memoize highlighted code for all languages
  const highlightedLanguages = useMemo(() => {
    return languages.map(({ lang, code, className }) => {
      let highlighted: string
      try {
        // Try to highlight with the specific language
        const result = hljs.highlight(code, { language: lang, ignoreIllegals: true })
        highlighted = result.value
      } catch {
        // Fallback to auto-detection if language not supported
        try {
          const result = hljs.highlightAuto(code)
          highlighted = result.value
        } catch {
          // If all else fails, just escape HTML
          highlighted = code
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
        }
      }
      return { lang, highlighted, className }
    })
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
