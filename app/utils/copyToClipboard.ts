import { showNotification } from '@/app/components/Notification'
import { handleError } from './errorHandling'

export default async function copyToClipboard(text: string, label: string, customSuccessMessage?: string) {
  try {
    // Check if clipboard API is available
    if (!navigator.clipboard || !navigator.clipboard.writeText) {
      throw new Error('Clipboard API not available')
    }

    await navigator.clipboard.writeText(text)
    if (customSuccessMessage !== undefined) {
      showNotification(customSuccessMessage, false, true)
    } else {
      showNotification(label)
    }
  } catch (e) {
    handleError(e, 'copyToClipboard')
    showNotification('Failed to copy', true)
  }
}
