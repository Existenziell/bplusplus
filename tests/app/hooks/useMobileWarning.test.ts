import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import { useMobileWarning } from '@/app/hooks/useMobileWarning'

// Mock window.innerWidth
const mockInnerWidth = (width: number) => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  })
}

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value.toString()
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key]
    }),
    clear: vi.fn(() => {
      store = {}
    }),
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

describe('useMobileWarning', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorageMock.clear()
    mockInnerWidth(1024) // Desktop by default
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('does not show warning on desktop', () => {
    mockInnerWidth(1024)

    const { result } = renderHook(() => useMobileWarning('test-key'))

    expect(result.current.showWarning).toBe(false)
    expect(result.current.dismissed).toBe(false)
  })

  it('shows warning on mobile', () => {
    mockInnerWidth(500)

    const { result } = renderHook(() => useMobileWarning('test-key'))

    expect(result.current.showWarning).toBe(true)
    expect(result.current.dismissed).toBe(false)
  })

  it('does not show warning if previously dismissed in localStorage', () => {
    localStorageMock.setItem('test-key', 'true')
    mockInnerWidth(500)

    const { result } = renderHook(() => useMobileWarning('test-key'))

    expect(result.current.showWarning).toBe(false)
    expect(result.current.dismissed).toBe(true)
  })

  it('dismisses warning without remembering', () => {
    mockInnerWidth(500)

    const { result } = renderHook(() => useMobileWarning('test-key'))

    expect(result.current.showWarning).toBe(true)

    act(() => {
      result.current.dismiss()
    })

    expect(result.current.showWarning).toBe(false)
    expect(result.current.dismissed).toBe(true)
    expect(localStorageMock.setItem).not.toHaveBeenCalled()
  })

  it('dismisses warning and remembers in localStorage', () => {
    mockInnerWidth(500)

    const { result } = renderHook(() => useMobileWarning('test-key'))

    act(() => {
      result.current.dismiss(true)
    })

    expect(result.current.showWarning).toBe(false)
    expect(result.current.dismissed).toBe(true)
    expect(localStorageMock.setItem).toHaveBeenCalledWith('test-key', 'true')
  })

  it('updates warning state on window resize', async () => {
    mockInnerWidth(1024)

    const { result } = renderHook(() => useMobileWarning('test-key'))

    expect(result.current.showWarning).toBe(false)

    // Resize to mobile
    mockInnerWidth(500)
    window.dispatchEvent(new Event('resize'))

    await waitFor(() => {
      expect(result.current.showWarning).toBe(true)
    })

    // Resize back to desktop
    mockInnerWidth(1024)
    window.dispatchEvent(new Event('resize'))

    await waitFor(() => {
      expect(result.current.showWarning).toBe(false)
    })
  })

  it('uses different storage keys for different instances', () => {
    mockInnerWidth(500)

    const { result: result1 } = renderHook(() => useMobileWarning('key1'))
    const { result: result2 } = renderHook(() => useMobileWarning('key2'))

    expect(result1.current.showWarning).toBe(true)
    expect(result2.current.showWarning).toBe(true)

    act(() => {
      result1.current.dismiss(true)
    })

    expect(localStorageMock.setItem).toHaveBeenCalledWith('key1', 'true')
    expect(result1.current.dismissed).toBe(true)
    expect(result2.current.dismissed).toBe(false)
  })

  it('cleans up resize listener on unmount', () => {
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener')
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')

    const { unmount } = renderHook(() => useMobileWarning('test-key'))

    expect(addEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function))

    unmount()

    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function))
  })
})
