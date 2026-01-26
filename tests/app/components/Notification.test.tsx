import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { render, screen, waitFor, act } from '@testing-library/react'
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

  it('shows success notification', async () => {
    render(<Notification />)

    act(() => {
      showNotification('Copied!')
    })

    // Use real timers for waitFor
    vi.useRealTimers()
    await waitFor(() => {
      const notification = screen.getByRole('status')
      expect(notification).toBeInTheDocument()
      expect(notification).toHaveTextContent('Copied! copied to clipboard')
    })
    vi.useFakeTimers()
  })

  it('shows error notification', async () => {
    render(<Notification />)

    act(() => {
      showNotification('Error occurred', true)
    })

    vi.useRealTimers()
    await waitFor(() => {
      const notification = screen.getByRole('status')
      expect(notification).toBeInTheDocument()
      expect(notification).toHaveTextContent('Error occurred')
    })
    vi.useFakeTimers()
  })

  it('shows raw notification without formatting', async () => {
    render(<Notification />)

    act(() => {
      showNotification('Raw message', false, true)
    })

    vi.useRealTimers()
    await waitFor(() => {
      const notification = screen.getByRole('status')
      expect(notification).toHaveTextContent('Raw message')
      expect(notification).not.toHaveTextContent('copied to clipboard')
    })
    vi.useFakeTimers()
  })

  it('handles multiple notifications', async () => {
    render(<Notification />)

    act(() => {
      showNotification('First')
    })

    vi.useRealTimers()
    await waitFor(() => {
      expect(screen.getByText(/First/)).toBeInTheDocument()
    })
    vi.useFakeTimers()

    act(() => {
      showNotification('Second')
    })

    vi.useRealTimers()
    await waitFor(() => {
      expect(screen.getByText(/Second/)).toBeInTheDocument()
      expect(screen.queryByText(/First/)).not.toBeInTheDocument()
    })
    vi.useFakeTimers()
  })

  it('clears previous timeout when new notification arrives', async () => {
    render(<Notification />)

    act(() => {
      showNotification('First')
    })

    vi.useRealTimers()
    await waitFor(() => {
      expect(screen.getByText(/First/)).toBeInTheDocument()
    })
    vi.useFakeTimers()

    act(() => {
      vi.advanceTimersByTime(2000)
      showNotification('Second')
    })

    vi.useRealTimers()
    await waitFor(() => {
      // First notification should be replaced, not hidden
      expect(screen.queryByText(/First/)).not.toBeInTheDocument()
      expect(screen.getByText(/Second/)).toBeInTheDocument()
    })
    vi.useFakeTimers()
  })

  it('has correct ARIA attributes', async () => {
    render(<Notification />)

    act(() => {
      showNotification('Test')
    })

    vi.useRealTimers()
    await waitFor(() => {
      const notification = screen.getByRole('status')
      expect(notification).toHaveAttribute('aria-live', 'polite')
    })
    vi.useFakeTimers()
  })
})
