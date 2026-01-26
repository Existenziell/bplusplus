/**
 * Hook to handle search state and execution.
 * Combines index loading with search functionality.
 */

import { useState, useEffect, useCallback } from 'react'
import { search } from '@/app/utils/searchLogic'
import { useSearchIndex } from './useSearchIndex'

export type SearchResult = { path: string; title: string; section: string; snippet: string }

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
        console.error('Search error:', err)
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
