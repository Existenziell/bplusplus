type copyToClipboardProps = {
  data: string
  notificationText: string
  setShowNotification: (value: boolean) => void
  setNotificationText: (value: string) => void
}

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
