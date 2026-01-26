'use client'

import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { sections } from '@/app/utils/navigation'
import { SearchIcon, DocumentIcon } from '@/app/components/Icons'
import { search } from '@/app/utils/searchLogic'
import { getCachedIndex } from '@/app/utils/searchIndexCache'
import type { IndexEntry } from '@/app/utils/searchLogic'

type SearchResult = { path: string; title: string; section: string; snippet: string }

const DEBOUNCE_MS = 180
const MIN_QUERY_LEN = 2

// Featured topics to show when there's no search query
const FEATURED_TOPICS: SearchResult[] = [
  {
    path: '/docs/fundamentals',
    title: 'Bitcoin Fundamentals',
    section: 'fundamentals',
    snippet: 'Learn the core concepts that make Bitcoin work: decentralization, trust models, monetary properties, and the foundational principles of digital money.',
  },
  {
    path: '/docs/bitcoin/script',
    title: 'Bitcoin Script',
    section: 'bitcoin',
    snippet: 'Explore Bitcoin\'s scripting language that enables programmable money, smart contracts, and various transaction types beyond simple transfers.',
  },
  {
    path: '/docs/mining/proof-of-work',
    title: 'Proof-of-Work',
    section: 'mining',
    snippet: 'Discover how Bitcoin uses computational work to secure the network, achieve consensus, and prevent double-spending attacks.',
  },
  {
    path: '/docs/mining/difficulty',
    title: 'Difficulty Adjustment',
    section: 'mining',
    snippet: 'Learn how Bitcoin automatically adjusts mining difficulty to maintain consistent block times, ensuring network stability and security.',
  },
  {
    path: '/docs/fundamentals/utxos',
    title: 'UTXO Model',
    section: 'fundamentals',
    snippet: 'Understand Bitcoin\'s Unspent Transaction Output model and how it differs from account-based systems, enabling better privacy and scalability.',
  },
  {
    path: '/docs/bitcoin/transaction-lifecycle',
    title: 'Transaction Lifecycle',
    section: 'bitcoin',
    snippet: 'Follow a Bitcoin transaction from creation through validation, propagation, and confirmation in the blockchain.',
  },
  {
    path: '/docs/fundamentals/cypherpunk-philosophy',
    title: 'Cypherpunk Philosophy',
    section: 'fundamentals',
    snippet: 'Discover the ideological roots of Bitcoin and the cypherpunk movement that envisioned privacy-preserving digital cash.',
  },
]

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(id)
  }, [value, delay])
  return debounced
}

export default function DocsSearch() {
  const pathname = usePathname()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const debounced = useDebounce(query, DEBOUNCE_MS)

  const runSearch = useCallback((q: string) => {
    if (q.length < MIN_QUERY_LEN) {
      setResults([])
      setLoading(false)
      return
    }

    const index = getCachedIndex()
    if (!index) {
      // Index should be preloaded, but handle edge case
      setLoading(true)
      return
    }

    setLoading(true)
    try {
      const searchResults = search(q, index)
      setResults(searchResults)
      setLoading(false)
    } catch (err) {
      console.error('Search error:', err)
      setResults([])
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    // Index should be preloaded, but run search when query changes
    if (getCachedIndex()) {
      runSearch(debounced)
    } else if (debounced.length >= MIN_QUERY_LEN) {
      // Edge case: index not loaded yet (shouldn't happen with preloader)
      setLoading(true)
    } else {
      setLoading(false)
    }
  }, [debounced, runSearch])

  // Focus the search input when component mounts
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Group search results by section
  const groupedResults = useMemo(() => {
    const groups: Record<string, SearchResult[]> = {}
    results.forEach(result => {
      const section = result.section || 'other'
      if (!groups[section]) {
        groups[section] = []
      }
      groups[section].push(result)
    })
    return groups
  }, [results])

  // Group featured topics by section
  const groupedFeaturedTopics = useMemo(() => {
    const groups: Record<string, SearchResult[]> = {}
    FEATURED_TOPICS.forEach(topic => {
      const section = topic.section || 'other'
      if (!groups[section]) {
        groups[section] = []
      }
      groups[section].push(topic)
    })
    return groups
  }, [])

  const hasQuery = query.trim().length >= MIN_QUERY_LEN

  return (
    <div className="w-full">
      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative">
          <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search documentation…"
            className="w-full pl-12 pr-4 py-4 text-base bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:border-btc focus:ring-2 focus:ring-btc/20 transition-colors text-gray-900 dark:text-gray-200 placeholder:text-gray-500 dark:placeholder:text-gray-400"
            autoComplete="off"
            autoCorrect="off"
            aria-label="Search documentation"
          />
        </div>
      </div>

      {/* Search Results */}
      {loading && (
        <div className="py-12 text-center text-secondary text-sm">Searching…</div>
      )}
      {!loading && hasQuery && results.length === 0 && debounced.length >= MIN_QUERY_LEN && debounced === query && (
        <div className="py-12 text-center">
          <p className="text-secondary text-sm mb-2">No results found.</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Try different keywords.</p>
        </div>
      )}
      {!loading && hasQuery && results.length > 0 && (
        <div className="space-y-6">
          {Object.entries(groupedResults).map(([sectionId, sectionResults]) => {
            const sectionInfo = sections[sectionId as keyof typeof sections]
            return (
              <div key={sectionId} className="pb-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200 mb-1">
                    {sectionInfo?.title || sectionId}
                  </h3>
                  {sectionInfo?.description && (
                    <p className="text-sm text-secondary">{sectionInfo.description}</p>
                  )}
                </div>
                <ul className="space-y-2">
                  {sectionResults.map((result) => (
                    <li key={result.path}>
                      <Link
                        href={result.path}
                        className="block p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-btc transition-colors group no-underline hover:no-underline"
                      >
                        <div className="flex items-start gap-3">
                          <DocumentIcon className="flex-shrink-0 w-5 h-5 text-gray-400 dark:text-gray-500 mt-0.5 group-hover:text-btc transition-colors" />
                          <div className="min-w-0 flex-1">
                            <div className="font-medium text-gray-900 dark:text-gray-200 group-hover:text-btc transition-colors">
                              {result.title}
                            </div>
                            <div className="text-sm text-secondary mt-1 line-clamp-2">
                              {result.snippet}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      )}

      {/* Featured Topics - shown when there's no search query */}
      {!loading && !hasQuery && (
        <div className="space-y-6">
          <div className="mb-2">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-200">Featured Topics</h2>
            <p className="text-sm text-secondary mt-1">Explore these popular topics to get started</p>
          </div>
          {Object.entries(groupedFeaturedTopics).map(([sectionId, sectionTopics]) => {
            const sectionInfo = sections[sectionId as keyof typeof sections]
            return (
              <div key={sectionId} className="pb-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200 mb-1">
                    {sectionInfo?.title || sectionId}
                  </h3>
                </div>
                <ul className="space-y-2">
                  {sectionTopics.map((topic) => (
                    <li key={topic.path}>
                      <Link
                        href={topic.path}
                        className="block p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-btc transition-colors group no-underline hover:no-underline"
                      >
                        <div className="flex items-start gap-3">
                          <DocumentIcon className="flex-shrink-0 w-5 h-5 text-gray-400 dark:text-gray-500 mt-0.5 group-hover:text-btc transition-colors" />
                          <div className="min-w-0 flex-1">
                            <div className="font-medium text-gray-900 dark:text-gray-200 group-hover:text-btc transition-colors">
                              {topic.title}
                            </div>
                            <div className="text-sm text-secondary mt-1 line-clamp-2">
                              {topic.snippet}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
