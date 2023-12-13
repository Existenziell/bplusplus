import { copyToClipboardProps } from '../types'

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

  setTimeout(() => {
    setShowNotification(false)
  }, 3000)
}
