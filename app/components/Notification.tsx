'use client'

import { useEffect, useState } from 'react'

interface NotificationState {
  show: boolean
  text: string
  isError: boolean
}

// Custom event for showing notifications
const NOTIFICATION_EVENT = 'app:notification'

interface NotificationDetail {
  text: string
  isError?: boolean
}

/**
 * Show a notification toast. Can be called from anywhere.
 */
export function showNotification(text: string, isError = false) {
  window.dispatchEvent(
    new CustomEvent<NotificationDetail>(NOTIFICATION_EVENT, {
      detail: { text, isError }
    })
  )
}

/**
 * Self-contained notification component.
 * Listens for custom events - no context needed.
 */
export default function Notification() {
  const [state, setState] = useState<NotificationState>({
    show: false,
    text: '',
    isError: false,
  })

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null

    const handleNotification = (event: CustomEvent<NotificationDetail>) => {
      // Clear any existing timeout
      if (timeoutId) {
        clearTimeout(timeoutId)
      }

      // Show the notification
      setState({
        show: true,
        text: event.detail.text,
        isError: event.detail.isError ?? false,
      })

      // Auto-hide after delay
      const hideDelay = event.detail.isError ? 2000 : 3000
      timeoutId = setTimeout(() => {
        setState(prev => ({ ...prev, show: false }))
        timeoutId = null
      }, hideDelay)
    }

    window.addEventListener(NOTIFICATION_EVENT, handleNotification as (e: Event) => void)

    return () => {
      window.removeEventListener(NOTIFICATION_EVENT, handleNotification as (e: Event) => void)
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [])

  if (!state.show) return null

  const message = state.isError
    ? 'Failed to copy to clipboard'
    : `${state.text} copied to clipboard`

  return (
    <div
      className={`fixed top-0 left-0 right-0 w-full text-center py-3 sm:py-4 px-4 transition-all opacity-100 z-50 text-sm sm:text-base ${
        state.isError ? 'bg-red-600 text-white' : 'bg-btc text-zinc-800'
      }`}
    >
      {message}
    </div>
  )
}
