/**
 * Hook to handle search state and execution.
 * Combines index loading with search functionality.
 */

import { useState, useEffect, useCallback } from 'react'
import { search, DEBOUNCE_MS, MIN_QUERY_LEN, type SearchResult } from '@/app/utils/searchLogic'
import { useSearchIndex } from './useSearchIndex'
import { useDebounce } from './useDebounce'
import { handleError } from '@/app/utils/errorHandling'

export function useSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)

  const debouncedQuery = useDebounce(query, DEBOUNCE_MS)
  const shouldLoadIndex = debouncedQuery.length >= MIN_QUERY_LEN
  const { index, loading: indexLoading, error: indexError } = useSearchIndex({ enabled: shouldLoadIndex })

  // Clear results immediately when query is empty (don't wait for debounce)
  useEffect(() => {
    if (query.length === 0) {
      queueMicrotask(() => {
        setResults([])
        setLoading(false)
      })
    }
  }, [query])

  const runSearch = useCallback(
    (q: string) => {
      if (q.length < MIN_QUERY_LEN) {
        setResults([])
        setLoading(false)
        return
      }

      if (!index) {
        setLoading(true)
        return
      }

      setLoading(false)
      try {
        const searchResults = search(q, index)
        setResults(searchResults)
      } catch (err) {
        handleError(err, 'useSearch')
        setResults([])
      }
    },
    [index]
  )

  useEffect(() => {
    queueMicrotask(() => {
      if (index) {
        runSearch(debouncedQuery)
      } else if (debouncedQuery.length >= MIN_QUERY_LEN) {
        setLoading(true)
      } else {
        setLoading(false)
      }
    })
  }, [debouncedQuery, index, runSearch])

  return {
    query,
    setQuery,
    results,
    loading: indexLoading || loading,
    indexError,
  }
}
