'use client'

import { useAppContext } from '@/app/context/AppContext'

export default function Notification() {
  const { showNotification, notificationText } = useAppContext()

  if (!showNotification) return null

  const isError = notificationText === 'Failed to copy'
  const message = isError
    ? 'Failed to copy to clipboard'
    : `${notificationText} copied to clipboard`

  return (
    <div className={`fixed top-0 left-0 right-0 w-full text-center py-3 sm:py-4 px-4 transition-all opacity-100 z-50 text-sm sm:text-base ${
      isError ? 'bg-red-600 text-white' : 'bg-btc text-zinc-800'
    }`}>
      {message}
    </div>
  )
}
