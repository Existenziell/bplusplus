'use client'

import { useEffect, useRef, useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { sections } from '@/app/utils/navigation'
import { SearchIcon, DocumentIcon } from '@/app/components/Icons'
import { MIN_QUERY_LEN, type SearchResult } from '@/app/utils/searchLogic'
import { useSearch } from '@/app/hooks/useSearch'
import { useKeyboardNavigation } from '@/app/hooks/useKeyboardNavigation'

// Featured topics to show when there's no search query
const FEATURED_TOPICS: SearchResult[] = [
  {
    path: '/docs/fundamentals/utxos',
    title: 'UTXO Model',
    section: 'fundamentals',
    snippet: 'Understand Bitcoin\'s Unspent Transaction Output model and how it differs from account-based systems, enabling better privacy and scalability.',
  },
  {
    path: '/docs/history',
    title: 'Bitcoin History',
    section: 'history',
    snippet: 'Explore Bitcoin\'s history from the Genesis Block to future halvings, including key milestones, events, forks, and the complete halving and supply schedule.',
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


export default function DocsSearch() {
  const { query, setQuery, results, loading } = useSearch()
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

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

  // Flatten all items into a single array for keyboard navigation
  const allItems = useMemo(() => {
    const hasQuery = query.trim().length >= MIN_QUERY_LEN
    if (hasQuery) {
      // Flatten grouped results
      return Object.values(groupedResults).flat()
    } else {
      // Flatten featured topics
      return Object.values(groupedFeaturedTopics).flat()
    }
  }, [query, groupedResults, groupedFeaturedTopics])

  const { selectedIndex, setSelectedIndex, selectedItemRef } = useKeyboardNavigation({
    items: allItems,
    inputRef,
    resetDeps: [query],
    allowNavigationWithoutFocus: true,
    onNavigate: (item) => {
      router.push(item.path)
    },
  })

  // Focus the search input when component mounts
  useEffect(() => {
    inputRef.current?.focus()
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
            className="input-panel-ring w-full pl-12 pr-4 py-4 text-base rounded-lg border-2 border-gray-200 dark:border-gray-700 focus:ring-btc/20 placeholder:text-gray-500 dark:placeholder:text-gray-400"
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
      {!loading && hasQuery && results.length === 0 && (
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
                  {sectionResults.map((result, resultIndex) => {
                    // Find the index in the flattened allItems array
                    const globalIndex = allItems.findIndex(item => item.path === result.path && item.title === result.title)
                    const isSelected = globalIndex === selectedIndex
                    return (
                      <li key={result.path}>
                        <Link
                          ref={isSelected ? (selectedItemRef as React.RefObject<HTMLAnchorElement>) : null}
                          href={result.path}
                          onMouseEnter={() => setSelectedIndex(globalIndex)}
                          className={`block p-3 rounded-lg border transition-colors group no-underline hover:no-underline ${
                            isSelected
                              ? 'bg-btc/20 dark:bg-btc/25 border-btc'
                              : 'bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-btc'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <DocumentIcon className={`flex-shrink-0 w-5 h-5 mt-0.5 transition-colors ${
                              isSelected
                                ? 'text-btc'
                                : 'text-gray-400 dark:text-gray-500 group-hover:text-btc'
                            }`} />
                            <div className="min-w-0 flex-1">
                              <div className={`font-medium transition-colors ${
                                isSelected
                                  ? 'text-btc'
                                  : 'text-gray-900 dark:text-gray-200 group-hover:text-btc'
                              }`}>
                                {result.title}
                              </div>
                              <div className="text-sm text-secondary mt-1 line-clamp-2">
                                {result.snippet}
                              </div>
                            </div>
                          </div>
                        </Link>
                      </li>
                    )
                  })}
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
                  {sectionTopics.map((topic) => {
                    // Find the index in the flattened allItems array
                    const globalIndex = allItems.findIndex(item => item.path === topic.path && item.title === topic.title)
                    const isSelected = globalIndex === selectedIndex
                    return (
                      <li key={topic.path}>
                        <Link
                          ref={isSelected ? (selectedItemRef as React.RefObject<HTMLAnchorElement>) : null}
                          href={topic.path}
                          onMouseEnter={() => setSelectedIndex(globalIndex)}
                          className={`block p-3 rounded-lg border transition-colors group no-underline hover:no-underline ${
                            isSelected
                              ? 'bg-btc/20 dark:bg-btc/25 border-btc'
                              : 'bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-btc'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <DocumentIcon className={`flex-shrink-0 w-5 h-5 mt-0.5 transition-colors ${
                              isSelected
                                ? 'text-btc'
                                : 'text-gray-400 dark:text-gray-500 group-hover:text-btc'
                            }`} />
                            <div className="min-w-0 flex-1">
                              <div className={`font-medium transition-colors ${
                                isSelected
                                  ? 'text-btc'
                                  : 'text-gray-900 dark:text-gray-200 group-hover:text-btc'
                              }`}>
                                {topic.title}
                              </div>
                              <div className="text-sm text-secondary mt-1 line-clamp-2">
                                {topic.snippet}
                              </div>
                            </div>
                          </div>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
