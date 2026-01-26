import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import Notification, { showNotification } from '@/app/components/Notification'

describe('Notification', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.useRealTimers()
  })

  it('does not render when no notification', () => {
    render(<Notification />)
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })

  it('shows success notification', () => {
    render(<Notification />)

    showNotification('Copied!')

    const notification = screen.getByRole('status')
    expect(notification).toBeInTheDocument()
    expect(notification).toHaveTextContent('Copied! copied to clipboard')
  })

  it('shows error notification', () => {
    render(<Notification />)

    showNotification('Error occurred', true)

    const notification = screen.getByRole('status')
    expect(notification).toBeInTheDocument()
    expect(notification).toHaveTextContent('Error occurred')
  })

  it('shows raw notification without formatting', () => {
    render(<Notification />)

    showNotification('Raw message', false, true)

    const notification = screen.getByRole('status')
    expect(notification).toHaveTextContent('Raw message')
    expect(notification).not.toHaveTextContent('copied to clipboard')
  })

  it('auto-hides success notification after 3 seconds', async () => {
    render(<Notification />)

    showNotification('Test')

    expect(screen.getByRole('status')).toBeInTheDocument()

    vi.advanceTimersByTime(3000)

    await waitFor(() => {
      const notification = screen.queryByRole('status')
      expect(notification).toHaveAttribute('class', expect.stringContaining('animate-toast-out'))
    })
  })

  it('auto-hides error notification after 2 seconds', async () => {
    render(<Notification />)

    showNotification('Error', true)

    expect(screen.getByRole('status')).toBeInTheDocument()

    vi.advanceTimersByTime(2000)

    await waitFor(() => {
      const notification = screen.queryByRole('status')
      expect(notification).toHaveAttribute('class', expect.stringContaining('animate-toast-out'))
    })
  })

  it('handles multiple notifications', () => {
    render(<Notification />)

    showNotification('First')
    expect(screen.getByText(/First/)).toBeInTheDocument()

    showNotification('Second')
    expect(screen.getByText(/Second/)).toBeInTheDocument()
    expect(screen.queryByText(/First/)).not.toBeInTheDocument()
  })

  it('clears previous timeout when new notification arrives', () => {
    render(<Notification />)

    showNotification('First')
    vi.advanceTimersByTime(2000)

    showNotification('Second')

    // First notification should be replaced, not hidden
    expect(screen.queryByText(/First/)).not.toBeInTheDocument()
    expect(screen.getByText(/Second/)).toBeInTheDocument()
  })

  it('has correct ARIA attributes', () => {
    render(<Notification />)

    showNotification('Test')

    const notification = screen.getByRole('status')
    expect(notification).toHaveAttribute('aria-live', 'polite')
  })

  it('removes notification after animation ends', async () => {
    render(<Notification />)

    showNotification('Test')
    vi.advanceTimersByTime(3000)

    const notification = screen.getByRole('status')
    
    // Simulate animation end
    notification.dispatchEvent(new Event('animationend'))

    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument()
    })
  })
})
