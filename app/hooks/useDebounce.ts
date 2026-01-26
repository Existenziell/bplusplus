import { useState, useEffect } from 'react'

/**
 * Debounce a value, returning the debounced value after the specified delay.
 * Useful for delaying expensive operations like search queries.
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(id)
  }, [value, delay])
  return debounced
}
