/**
 * Hook to load and access the shared search index.
 * Handles loading state and error handling.
 */

import { useState, useEffect } from 'react'
import { loadSearchIndex, getCachedIndex, isIndexLoading } from '@/app/utils/searchIndexCache'
import type { IndexEntry } from '@/app/utils/searchLogic'

export function useSearchIndex({ enabled = true }: { enabled?: boolean } = {}) {
  const [index, setIndex] = useState<IndexEntry[] | null>(getCachedIndex())
  const [loading, setLoading] = useState(isIndexLoading())
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!enabled) {
      // Keep state in sync if another consumer loaded the cache.
      const cached = getCachedIndex()
      if (cached) setIndex((prev) => prev ?? cached)
      setLoading(isIndexLoading())
      return
    }

    // If index is already cached, use it
    const cached = getCachedIndex()
    if (cached) {
      setIndex(cached)
      setLoading(false)
      return
    }

    // If already loading, wait for it
    if (isIndexLoading()) {
      setLoading(true)
      loadSearchIndex()
        .then((data) => {
          setIndex(data)
          setLoading(false)
          setError(null)
        })
        .catch((err) => {
          setError(err)
          setLoading(false)
        })
      return
    }

    // Start loading
    setLoading(true)
    loadSearchIndex()
      .then((data) => {
        setIndex(data)
        setLoading(false)
        setError(null)
      })
      .catch((err) => {
        setError(err)
        setLoading(false)
      })
  }, [enabled])

  return { index, loading, error }
}
