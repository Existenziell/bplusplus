'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { useSearchKeyboard } from '@/app/hooks/useSearchKeyboard'
import { loadSearchIndex } from '@/app/utils/searchIndexCache'

interface SearchModalContextType {
  isOpen: boolean
  openSearch: () => void
  closeSearch: () => void
  toggleSearch: () => void
}

const SearchModalContext = createContext<SearchModalContextType | undefined>(undefined)

export function SearchModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const openSearch = useCallback(() => {
    setIsOpen(true)

    // Load the search index on user intent (opening search), but avoid blocking UI.
    const run = () => {
      loadSearchIndex().catch(() => {
        // Silently fail; search UI will show loading/error and still work once available.
      })
    }

    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      ;(window as any).requestIdleCallback(run, { timeout: 1500 })
    } else {
      setTimeout(run, 0)
    }
  }, [])

  const closeSearch = useCallback(() => {
    setIsOpen(false)
  }, [])

  const toggleSearch = useCallback(() => {
    setIsOpen((open) => !open)
  }, [])

  // Register keyboard shortcut globally
  useSearchKeyboard(toggleSearch)

  return (
    <SearchModalContext.Provider value={{ isOpen, openSearch, closeSearch, toggleSearch }}>
      {children}
    </SearchModalContext.Provider>
  )
}

export function useSearchModal() {
  const context = useContext(SearchModalContext)
  if (context === undefined) {
    throw new Error('useSearchModal must be used within a SearchModalProvider')
  }
  return context
}
