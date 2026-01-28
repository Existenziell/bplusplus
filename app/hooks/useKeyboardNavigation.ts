'use client'

import { useState, useEffect, useRef, type RefObject, type MutableRefObject } from 'react'
import type React from 'react'

interface UseKeyboardNavigationOptions<T> {
  /** Array of items to navigate through */
  items: T[]
  /** Optional ref to the input element - Enter key only works when this is focused */
  inputRef?: RefObject<HTMLInputElement | null> | MutableRefObject<HTMLInputElement | null>
  /** Callback when Enter is pressed on a selected item */
  onNavigate: (item: T, index: number) => void
  /** Whether keyboard navigation is enabled */
  enabled?: boolean
  /** Dependencies that should reset selectedIndex to 0 */
  resetDeps?: unknown[]
  /** Additional keyboard handler for Escape key or other keys */
  onEscape?: () => void
  /** Whether to allow navigation when input is not focused (for DocsSearch) */
  allowNavigationWithoutFocus?: boolean
}

/**
 * Hook for keyboard navigation through a list of items.
 * Handles ArrowUp, ArrowDown, Enter keys, auto-scroll, and selected index management.
 */
export function useKeyboardNavigation<T>({
  items,
  inputRef,
  onNavigate,
  enabled = true,
  resetDeps = [],
  onEscape,
  allowNavigationWithoutFocus = false,
}: UseKeyboardNavigationOptions<T>) {
  const [selectedIndex, setSelectedIndex] = useState(-1) // -1 means no selection (input focused)
  const selectedItemRef = useRef<HTMLElement | null>(null)

  // Reset selected index when items change or resetDeps change
  useEffect(() => {
    setSelectedIndex(-1)
  }, [items.length, ...resetDeps])

  // Auto-scroll selected item into view (only when an item is selected)
  useEffect(() => {
    if (selectedIndex >= 0) {
      selectedItemRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
    }
  }, [selectedIndex])

  // Keyboard event handler
  useEffect(() => {
    if (!enabled) return

    const onKey = (e: KeyboardEvent) => {
      const activeElement = document.activeElement
      const isTyping = activeElement?.tagName === 'INPUT' || activeElement?.tagName === 'TEXTAREA'

      if (e.key === 'Escape' && onEscape) {
        onEscape()
        return
      }

      // Only handle navigation keys when there are items
      if (items.length === 0) return

      if (e.key === 'ArrowDown') {
        const shouldHandle = allowNavigationWithoutFocus
          ? (!isTyping || activeElement === inputRef?.current)
          : activeElement === inputRef?.current

        if (shouldHandle) {
          e.preventDefault()
          setSelectedIndex((i) => {
            // If no selection (-1), go to first item (0), otherwise increment
            if (i === -1) return 0
            return Math.min(i + 1, items.length - 1)
          })
        }
        return
      }

      if (e.key === 'ArrowUp') {
        const shouldHandle = allowNavigationWithoutFocus
          ? (!isTyping || activeElement === inputRef?.current)
          : activeElement === inputRef?.current

        if (shouldHandle) {
          e.preventDefault()
          setSelectedIndex((i) => {
            // If no selection (-1), stay at -1
            if (i === -1) return -1
            // If at first item (0), go back to no selection (-1)
            if (i === 0) return -1
            // Otherwise decrement
            return i - 1
          })
        }
        return
      }

      if (e.key === 'Enter' && selectedIndex >= 0 && items[selectedIndex]) {
        // Only navigate on Enter if input is focused and an item is selected
        if (activeElement === inputRef?.current) {
          e.preventDefault()
          onNavigate(items[selectedIndex], selectedIndex)
        }
        return
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [enabled, items, selectedIndex, inputRef, onNavigate, onEscape, allowNavigationWithoutFocus])

  return {
    selectedIndex,
    setSelectedIndex,
    selectedItemRef: selectedItemRef as React.RefObject<HTMLElement>,
  }
}
