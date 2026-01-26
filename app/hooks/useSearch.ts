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
  const { index, loading: indexLoading, error: indexError } = useSearchIndex()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)

  const debouncedQuery = useDebounce(query, DEBOUNCE_MS)

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
    if (index) {
      runSearch(debouncedQuery)
    } else if (debouncedQuery.length >= MIN_QUERY_LEN) {
      setLoading(true)
    } else {
      setLoading(false)
    }
  }, [debouncedQuery, index, runSearch])

  return {
    query,
    setQuery,
    results,
    loading: indexLoading || loading,
    indexError,
  }
}
