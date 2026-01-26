'use client'

import { useState, useEffect, useCallback } from 'react'

/**
 * Shows a mobile-only warning banner. Dismissal can optionally be persisted in localStorage.
 * @param storageKey - localStorage key when user chooses "Don't show again"
 * @returns { showWarning, dismissed, dismiss }
 */
export function useMobileWarning(storageKey: string) {
  const [showWarning, setShowWarning] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (localStorage.getItem(storageKey) === 'true') {
      setDismissed(true)
      return
    }
    const checkMobile = () => {
      if (window.innerWidth < 768) {
        setShowWarning(true)
      } else {
        setShowWarning(false)
      }
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [storageKey])

  const dismiss = useCallback(
    (remember?: boolean) => {
      setShowWarning(false)
      setDismissed(true)
      if (remember) localStorage.setItem(storageKey, 'true')
    },
    [storageKey]
  )

  return { showWarning, dismissed, dismiss }
}
