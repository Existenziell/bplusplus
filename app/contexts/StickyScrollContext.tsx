'use client'

import { createContext, useContext, useState, useEffect, useRef, useMemo, ReactNode } from 'react'

interface StickyScrollContextType {
  isSticky: boolean
  scrollDirection: 'up' | 'down'
  headerRef: React.RefObject<HTMLElement | null>
}

const StickyScrollContext = createContext<StickyScrollContextType | undefined>(undefined)

export function StickyScrollProvider({ children }: { children: ReactNode }) {
  const [isSticky, setIsSticky] = useState(false)
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down')
  const headerRef = useRef<HTMLElement>(null)
  const lastScrollY = useRef(0)
  const headerHeight = useRef(0)
  const rafId = useRef<number | null>(null)

  useEffect(() => {
    // Cache header height and update on resize
    const updateHeaderHeight = () => {
      headerHeight.current = headerRef.current?.offsetHeight || 0
    }

    const handleScroll = () => {
      // Cancel any pending animation frame
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current)
      }

      rafId.current = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY
        
        // Determine if sticky should be active (scrolled past header)
        const shouldBeSticky = currentScrollY > headerHeight.current
        setIsSticky(shouldBeSticky)
        
        // Determine scroll direction with small threshold to avoid flickering
        const scrollThreshold = 5
        const scrollDelta = currentScrollY - lastScrollY.current
        
        if (scrollDelta > scrollThreshold) {
          setScrollDirection('down')
        } else if (scrollDelta < -scrollThreshold) {
          setScrollDirection('up')
        }
        
        lastScrollY.current = currentScrollY
      })
    }

    // Initial header height measurement
    updateHeaderHeight()
    
    // Update header height on resize
    window.addEventListener('resize', updateHeaderHeight, { passive: true })
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Check initial state after a brief delay to ensure header is rendered
    const timeoutId = setTimeout(() => {
      updateHeaderHeight()
      handleScroll()
    }, 0)

    return () => {
      window.removeEventListener('resize', updateHeaderHeight)
      window.removeEventListener('scroll', handleScroll)
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current)
      }
      clearTimeout(timeoutId)
    }
  }, [])

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({ isSticky, scrollDirection, headerRef }),
    [isSticky, scrollDirection]
  )

  return (
    <StickyScrollContext.Provider value={contextValue}>
      {children}
    </StickyScrollContext.Provider>
  )
}

export function useStickyScroll() {
  const context = useContext(StickyScrollContext)
  if (context === undefined) {
    throw new Error('useStickyScroll must be used within a StickyScrollProvider')
  }
  return context
}
