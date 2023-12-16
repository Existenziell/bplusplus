import { copyToClipboardProps } from '../types'

let timeoutId: NodeJS.Timeout | null = null

export default async function copyToClipboard({
  data,
  notificationText,
  setShowNotification,
  setNotificationText,
}: copyToClipboardProps) {
  try {
    await navigator.clipboard.writeText(data)
  } catch (e) {
    console.error(e)
    return
  }

  setNotificationText(notificationText)
  setShowNotification(true)

  if (timeoutId) {
    clearTimeout(timeoutId) // Clear the previous timeout if one exists
  }

  timeoutId = setTimeout(() => {
    setShowNotification(false)
  }, 3000)
}
