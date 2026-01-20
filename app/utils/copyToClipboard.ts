import { showNotification } from '@/app/components/Notification'

export default async function copyToClipboard(text: string, label: string) {
  try {
    // Check if clipboard API is available
    if (!navigator.clipboard || !navigator.clipboard.writeText) {
      throw new Error('Clipboard API not available')
    }

    await navigator.clipboard.writeText(text)
    showNotification(label)
  } catch (e) {
    console.error('Failed to copy to clipboard:', e)
    showNotification('Failed to copy', true)
  }
}
