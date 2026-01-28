'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { SearchIcon, XIcon, DocumentIcon, BookOpenIcon, UserIcon } from '@/app/components/Icons'
import { sections } from '@/app/utils/navigation'
import { MIN_QUERY_LEN } from '@/app/utils/searchLogic'
import { useSearch } from '@/app/hooks/useSearch'
import { useKeyboardNavigation } from '@/app/hooks/useKeyboardNavigation'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const { query, setQuery, results, loading } = useSearch()
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const pathname = usePathname()
  const previousPathnameRef = useRef<string>(pathname)

  const { selectedIndex, setSelectedIndex, selectedItemRef } = useKeyboardNavigation({
    items: results,
    inputRef,
    enabled: isOpen,
    resetDeps: [query],
    onEscape: onClose,
    onNavigate: (item) => {
      onClose()
      router.push(item.path)
    },
  })

  useEffect(() => {
    if (isOpen) {
      setQuery('')
      inputRef.current?.focus()
    } else {
      // Clear query when modal closes to ensure fresh state on next open
      setQuery('')
    }
  }, [isOpen, setQuery])

  // Close modal and clear query when pathname changes (navigation occurred)
  useEffect(() => {
    if (isOpen && pathname !== previousPathnameRef.current) {
      previousPathnameRef.current = pathname
      setQuery('')
      onClose()
    } else if (!isOpen) {
      // Update ref when modal closes to track the current pathname
      previousPathnameRef.current = pathname
    }
  }, [pathname, isOpen, onClose, setQuery])

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
        <div className="flex items-center gap-3 px-6">
          <Link
            href="/docs"
            onClick={onClose}
            className="p-1.5 rounded text-gray-500 dark:text-gray-400 hover:text-btc hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Go to documentation overview"
            title="Documentation overview"
          >
            <BookOpenIcon className="w-5 h-5" />
          </Link>
          <SearchIcon className="flex-shrink-0 w-6 h-6 text-gray-500 dark:text-gray-400" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search docs…"
            className="flex-1 py-5 text-lg bg-transparent border-0 border-none outline-none placeholder:text-gray-500 dark:placeholder:text-gray-400 text-gray-900 dark:text-gray-200 focus:ring-0 focus:border-0"
            autoComplete="off"
            autoCorrect="off"
            aria-label="Search"
          />
          <code className="code-inline px-3">
            <span className="text-lg inline-block align-middle">⌘</span> + K
          </code>
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
                  ref={i === selectedIndex ? (selectedItemRef as React.RefObject<HTMLLIElement>) : null}
                  role="option"
                  aria-selected={i === selectedIndex}
                  onMouseEnter={() => setSelectedIndex(i)}
                >
                  <Link
                    href={r.path}
                    onClick={onClose}
                    className={`flex gap-3 px-4 py-2.5 text-left transition-colors no-underline hover:no-underline ${
                      i === selectedIndex
                        ? 'bg-btc/20 dark:bg-btc/25 text-gray-900 dark:text-gray-200'
                        : 'text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
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
