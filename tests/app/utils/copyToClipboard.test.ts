import { describe, it, expect, beforeEach, vi } from 'vitest'
import copyToClipboard from '@/app/utils/copyToClipboard'
import { showNotification } from '@/app/components/Notification'

// Mock the notification module
vi.mock('@/app/components/Notification', () => ({
  showNotification: vi.fn(),
}))

describe('copyToClipboard', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Reset clipboard mock
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
      writable: true,
      configurable: true,
    })
  })

  it('copies text to clipboard when API is available', async () => {
    const text = 'test text'
    const label = 'Test Label'

    await copyToClipboard(text, label)

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(text)
    expect(showNotification).toHaveBeenCalledWith(label)
  })

  it('shows custom success message when provided', async () => {
    const text = 'test text'
    const label = 'Test Label'
    const customMessage = 'Custom success!'

    await copyToClipboard(text, label, customMessage)

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(text)
    expect(showNotification).toHaveBeenCalledWith(customMessage, false, true)
  })

  it('shows error notification when clipboard API is not available', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: undefined,
      writable: true,
      configurable: true,
    })

    await copyToClipboard('test', 'Test')

    expect(showNotification).toHaveBeenCalledWith('Failed to copy', true)
  })

  it('shows error notification when writeText is not available', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: {},
      writable: true,
      configurable: true,
    })

    await copyToClipboard('test', 'Test')

    expect(showNotification).toHaveBeenCalledWith('Failed to copy', true)
  })

  it('shows error notification when clipboard write fails', async () => {
    const error = new Error('Clipboard write failed')
    ;(navigator.clipboard.writeText as any).mockRejectedValueOnce(error)

    await copyToClipboard('test', 'Test')

    expect(showNotification).toHaveBeenCalledWith('Failed to copy', true)
  })

  it('logs error to console when clipboard write fails', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const error = new Error('Clipboard write failed')
    ;(navigator.clipboard.writeText as any).mockRejectedValueOnce(error)

    await copyToClipboard('test', 'Test')

    expect(consoleSpy).toHaveBeenCalledWith('Failed to copy to clipboard:', error)

    consoleSpy.mockRestore()
  })
})
