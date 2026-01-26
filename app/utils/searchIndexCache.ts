/**
 * Shared search index cache to prevent duplicate loading across components.
 * Uses a module-level cache that persists across component mounts/unmounts.
 */

import type { IndexEntry } from './searchLogic'

type CacheState = {
  index: IndexEntry[] | null
  loading: boolean
  error: Error | null
  promise: Promise<IndexEntry[]> | null
}

const cache: CacheState = {
  index: null,
  loading: false,
  error: null,
  promise: null,
}

/**
 * Load the search index. Returns a promise that resolves to the index.
 * If the index is already loaded, returns the cached index immediately.
 * If a load is in progress, returns the existing promise.
 */
export function loadSearchIndex(): Promise<IndexEntry[]> {
  // Return cached index if available
  if (cache.index) {
    return Promise.resolve(cache.index)
  }

  // Return existing promise if loading
  if (cache.promise) {
    return cache.promise
  }

  // Start loading
  cache.loading = true
  cache.error = null
  cache.promise = fetch('/data/search-index.json')
    .then((res) => {
      if (!res.ok) throw new Error('Failed to load search index')
      return res.json()
    })
    .then((data: IndexEntry[]) => {
      cache.index = data
      cache.loading = false
      cache.promise = null
      return data
    })
    .catch((err) => {
      cache.error = err
      cache.loading = false
      cache.promise = null
      throw err
    })

  return cache.promise
}

/**
 * Get the cached index synchronously. Returns null if not loaded yet.
 */
export function getCachedIndex(): IndexEntry[] | null {
  return cache.index
}

/**
 * Check if the index is currently loading.
 */
export function isIndexLoading(): boolean {
  return cache.loading
}

/**
 * Check if there was an error loading the index.
 */
export function getIndexError(): Error | null {
  return cache.error
}

/**
 * Clear the cache (useful for testing or forced refresh).
 */
export function clearCache(): void {
  cache.index = null
  cache.loading = false
  cache.error = null
  cache.promise = null
}
