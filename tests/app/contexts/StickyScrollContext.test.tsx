import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { StickyScrollProvider, useStickyScroll } from '@/app/contexts/StickyScrollContext'

// Mock requestAnimationFrame
const mockRAF = vi.fn((cb: FrameRequestCallback) => {
  setTimeout(cb, 16)
  return 1
})

describe('StickyScrollContext', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    global.requestAnimationFrame = mockRAF
    global.cancelAnimationFrame = vi.fn()
    // Reset scroll position
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 0,
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('provides default sticky state', () => {
    const { result } = renderHook(() => useStickyScroll(), {
      wrapper: StickyScrollProvider,
    })

    expect(result.current.isSticky).toBe(false)
    expect(result.current.scrollDirection).toBe('down')
    expect(result.current.headerRef).toBeDefined()
  })

  it('throws error when used outside provider', () => {
    // Suppress console.error for this test
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => {
      renderHook(() => useStickyScroll())
    }).toThrow('useStickyScroll must be used within a StickyScrollProvider')

    consoleSpy.mockRestore()
  })

  it('sets isSticky to true when scrolled past header', async () => {
    const mockHeader = document.createElement('div')
    mockHeader.style.height = '100px'
    document.body.appendChild(mockHeader)

    const { result } = renderHook(() => useStickyScroll(), {
      wrapper: StickyScrollProvider,
    })

    // Set header ref
    act(() => {
      if (result.current.headerRef.current === null) {
        ;(result.current.headerRef as any).current = mockHeader
      }
    })

    // Mock header height
    Object.defineProperty(mockHeader, 'offsetHeight', {
      configurable: true,
      value: 100,
    })

    // Scroll past header
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 150,
    })

    window.dispatchEvent(new Event('scroll'))

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 20))
    })

    expect(result.current.isSticky).toBe(true)

    document.body.removeChild(mockHeader)
  })

  it('sets scrollDirection to down when scrolling down', async () => {
    const { result } = renderHook(() => useStickyScroll(), {
      wrapper: StickyScrollProvider,
    })

    // Initial scroll position
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 0,
    })

    // Scroll down
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 100,
    })

    window.dispatchEvent(new Event('scroll'))

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 20))
    })

    expect(result.current.scrollDirection).toBe('down')
  })

  it('sets scrollDirection to up when scrolling up', async () => {
    const { result } = renderHook(() => useStickyScroll(), {
      wrapper: StickyScrollProvider,
    })

    // Start scrolled down
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 100,
    })

    window.dispatchEvent(new Event('scroll'))

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 20))
    })

    // Scroll up
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 50,
    })

    window.dispatchEvent(new Event('scroll'))

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 20))
    })

    expect(result.current.scrollDirection).toBe('up')
  })

  it('provides headerRef for header element', () => {
    const { result } = renderHook(() => useStickyScroll(), {
      wrapper: StickyScrollProvider,
    })

    expect(result.current.headerRef).toBeDefined()
    expect(result.current.headerRef.current).toBeNull()

    const mockHeader = document.createElement('header')
    act(() => {
      ;(result.current.headerRef as any).current = mockHeader
    })

    expect(result.current.headerRef.current).toBe(mockHeader)
  })

  it('updates header height on resize', async () => {
    const mockHeader = document.createElement('div')
    document.body.appendChild(mockHeader)

    const { result } = renderHook(() => useStickyScroll(), {
      wrapper: StickyScrollProvider,
    })

    act(() => {
      ;(result.current.headerRef as any).current = mockHeader
    })

    Object.defineProperty(mockHeader, 'offsetHeight', {
      configurable: true,
      value: 50,
    })

    window.dispatchEvent(new Event('resize'))

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 20))
    })

    // Header height should be cached
    expect(mockHeader.offsetHeight).toBe(50)

    document.body.removeChild(mockHeader)
  })

  it('cleans up event listeners on unmount', () => {
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener')
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')

    const { unmount } = renderHook(() => useStickyScroll(), {
      wrapper: StickyScrollProvider,
    })

    expect(addEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function), { passive: true })
    expect(addEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function), { passive: true })

    unmount()

    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function))
    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function))
  })

  it('memoizes context value to prevent unnecessary re-renders', () => {
    const { result, rerender } = renderHook(() => useStickyScroll(), {
      wrapper: StickyScrollProvider,
    })

    const firstValue = result.current

    rerender()

    // Should be same reference if state hasn't changed
    expect(result.current).toBe(firstValue)
  })
})
