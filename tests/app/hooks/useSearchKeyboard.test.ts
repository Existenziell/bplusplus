import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useSearchKeyboard } from '@/app/hooks/useSearchKeyboard'

describe('useSearchKeyboard', () => {
  let onToggle: ReturnType<typeof vi.fn>

  beforeEach(() => {
    onToggle = vi.fn()
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('calls onToggle when Cmd+K is pressed on Mac', () => {
    renderHook(() => useSearchKeyboard(onToggle))

    const event = new KeyboardEvent('keydown', {
      key: 'k',
      metaKey: true,
      ctrlKey: false,
    })

    window.dispatchEvent(event)

    expect(onToggle).toHaveBeenCalledTimes(1)
  })

  it('calls onToggle when Ctrl+K is pressed on Windows/Linux', () => {
    renderHook(() => useSearchKeyboard(onToggle))

    const event = new KeyboardEvent('keydown', {
      key: 'k',
      metaKey: false,
      ctrlKey: true,
    })

    window.dispatchEvent(event)

    expect(onToggle).toHaveBeenCalledTimes(1)
  })

  it('prevents default when Cmd+K is pressed', () => {
    renderHook(() => useSearchKeyboard(onToggle))

    const event = new KeyboardEvent('keydown', {
      key: 'k',
      metaKey: true,
      ctrlKey: false,
    })

    const preventDefaultSpy = vi.spyOn(event, 'preventDefault')
    window.dispatchEvent(event)

    expect(preventDefaultSpy).toHaveBeenCalled()
  })

  it('does not call onToggle for other keys', () => {
    renderHook(() => useSearchKeyboard(onToggle))

    const event = new KeyboardEvent('keydown', {
      key: 's',
      metaKey: true,
      ctrlKey: false,
    })

    window.dispatchEvent(event)

    expect(onToggle).not.toHaveBeenCalled()
  })

  it('does not call onToggle when modifier is not pressed', () => {
    renderHook(() => useSearchKeyboard(onToggle))

    const event = new KeyboardEvent('keydown', {
      key: 'k',
      metaKey: false,
      ctrlKey: false,
    })

    window.dispatchEvent(event)

    expect(onToggle).not.toHaveBeenCalled()
  })

  it('updates when onToggle changes', () => {
    const onToggle1 = vi.fn()
    const onToggle2 = vi.fn()

    const { rerender } = renderHook(
      ({ toggle }) => useSearchKeyboard(toggle),
      { initialProps: { toggle: onToggle1 } }
    )

    const event = new KeyboardEvent('keydown', {
      key: 'k',
      metaKey: true,
      ctrlKey: false,
    })

    window.dispatchEvent(event)

    expect(onToggle1).toHaveBeenCalledTimes(1)
    expect(onToggle2).not.toHaveBeenCalled()

    rerender({ toggle: onToggle2 })

    window.dispatchEvent(event)

    expect(onToggle1).toHaveBeenCalledTimes(1) // Still 1
    expect(onToggle2).toHaveBeenCalledTimes(1) // Now called
  })

  it('cleans up event listener on unmount', () => {
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener')
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')

    const { unmount } = renderHook(() => useSearchKeyboard(onToggle))

    expect(addEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function))

    unmount()

    expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function))
  })
})
