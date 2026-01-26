'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { SearchIcon, XIcon, DocumentIcon, BookOpenIcon, UserIcon } from '@/app/components/Icons'
import { sections } from '@/app/utils/navigation'

type SearchResult = { path: string; title: string; section: string; snippet: string }

const DEBOUNCE_MS = 180
const MIN_QUERY_LEN = 2

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(id)
  }, [value, delay])
  return debounced
}

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const abortControllerRef = useRef<AbortController | null>(null)
  const selectedItemRef = useRef<HTMLLIElement | null>(null)
  const router = useRouter()

  const debounced = useDebounce(query, DEBOUNCE_MS)

  const runSearch = useCallback(async (q: string) => {
    if (q.length < MIN_QUERY_LEN) {
      setResults([])
      setLoading(false)
      return
    }
    const ac = new AbortController()
    abortControllerRef.current?.abort()
    abortControllerRef.current = ac

    setLoading(true)
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`, { signal: ac.signal })
      const data = await res.json()
      if (!ac.signal.aborted) {
        setResults(data.results ?? [])
        setSelectedIndex(0)
      }
    } catch (err) {
      if (!(err instanceof DOMException && err.name === 'AbortError')) {
        setResults([])
      }
    } finally {
      if (!ac.signal.aborted) {
        setLoading(false)
      }
    }
  }, [])

  useEffect(() => {
    runSearch(debounced)
  }, [debounced, runSearch])

  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setResults([])
      setSelectedIndex(0)
      inputRef.current?.focus()
    }
  }, [isOpen])

  useEffect(() => {
    selectedItemRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  }, [selectedIndex])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (!isOpen) return
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex((i) => Math.min(i + 1, results.length - 1))
        return
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex((i) => Math.max(i - 1, 0))
        return
      }
      if (e.key === 'Enter' && results[selectedIndex]) {
        e.preventDefault()
        onClose()
        router.push(results[selectedIndex].path)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, onClose, results, selectedIndex, router])

  if (!isOpen) return null

  const sectionTitle = (id: string) => sections[id as keyof typeof sections]?.title ?? id

  return (
    <div
      className="modal-overlay flex items-start justify-center pt-[12vh] px-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Search documentation"
    >
      <div
        className="w-full max-w-2xl rounded-lg shadow-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-gray-200 dark:border-gray-700 px-6">
          <SearchIcon className="flex-shrink-0 w-6 h-6 text-gray-500 dark:text-gray-400" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search docs…"
            className="flex-1 py-5 text-lg bg-transparent border-0 outline-none placeholder:text-gray-500 dark:placeholder:text-gray-400 text-gray-900 dark:text-gray-100"
            autoComplete="off"
            autoCorrect="off"
            aria-label="Search"
          />
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            aria-label="Close"
          >
            <XIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="max-h-[min(60vh,400px)] overflow-y-auto">
          {loading && (
            <div className="py-8 text-center text-secondary text-sm">Searching…</div>
          )}
          {!loading && query.length >= MIN_QUERY_LEN && results.length === 0 && (
            <div className="py-8 text-center text-secondary text-sm">No results.</div>
          )}
          {!loading && query.length > 0 && query.length < MIN_QUERY_LEN && (
            <div className="py-6 text-center text-secondary text-sm">
              Type at least {MIN_QUERY_LEN} characters.
            </div>
          )}
          {!loading && results.length > 0 && (
            <ul className="py-2" role="listbox">
              {results.map((r, i) => (
                <li
                  key={r.path + r.title}
                  ref={i === selectedIndex ? selectedItemRef : null}
                  role="option"
                  aria-selected={i === selectedIndex}
                  onMouseEnter={() => setSelectedIndex(i)}
                >
                  <Link
                    href={r.path}
                    onClick={onClose}
                    className={`flex gap-3 px-4 py-2.5 text-left transition-colors no-underline hover:no-underline ${
                      i === selectedIndex
                        ? 'bg-btc/20 dark:bg-btc/25 text-gray-900 dark:text-gray-100'
                        : 'text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <span
                      className="flex-shrink-0 text-gray-500 dark:text-gray-400 mt-0.5"
                      aria-hidden
                    >
                      {r.path.startsWith('/docs/glossary#') ? (
                        <BookOpenIcon className="w-4 h-4" />
                      ) : r.path.startsWith('/docs/history/people#') ? (
                        <UserIcon className="w-4 h-4" />
                      ) : (
                        <DocumentIcon className="w-4 h-4" />
                      )}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium">{r.title}</div>
                      <div className="text-sm text-secondary truncate">{r.snippet}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">
                        {r.path.startsWith('/docs/history/people#') ? 'People' : sectionTitle(r.section)}
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
