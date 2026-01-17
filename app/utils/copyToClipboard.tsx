import { copyToClipboardProps } from '../types'

let timeoutId: NodeJS.Timeout | null = null

export default async function copyToClipboard({
  data,
  notificationText,
  setShowNotification,
  setNotificationText,
}: copyToClipboardProps) {
  // Clear any existing timeout
  if (timeoutId) {
    clearTimeout(timeoutId)
    timeoutId = null
  }

  // Hide any existing notification first
  setShowNotification(false)

  try {
    // Check if clipboard API is available
    if (!navigator.clipboard || !navigator.clipboard.writeText) {
      throw new Error('Clipboard API not available')
    }

    await navigator.clipboard.writeText(data)

    // Show success notification
    setNotificationText(notificationText)
    setShowNotification(true)

    // Auto-hide after 3 seconds
    timeoutId = setTimeout(() => {
      setShowNotification(false)
      timeoutId = null
    }, 3000)
  } catch (e) {
    console.error('Failed to copy to clipboard:', e)

    // Show error notification
    setNotificationText('Failed to copy')
    setShowNotification(true)

    // Auto-hide error after 2 seconds
    timeoutId = setTimeout(() => {
      setShowNotification(false)
      timeoutId = null
    }, 2000)
  }
}
