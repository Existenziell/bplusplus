import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useSearchIndex } from '@/app/hooks/useSearchIndex'
import {
  loadSearchIndex,
  getCachedIndex,
  isIndexLoading,
  clearCache,
} from '@/app/utils/searchIndexCache'
import type { IndexEntry } from '@/app/utils/searchLogic'

// Mock the searchIndexCache module
vi.mock('@/app/utils/searchIndexCache', () => ({
  loadSearchIndex: vi.fn(),
  getCachedIndex: vi.fn(),
  isIndexLoading: vi.fn(),
  getIndexError: vi.fn(),
  clearCache: vi.fn(),
}))

describe('useSearchIndex', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    ;(clearCache as any).mockImplementation(() => {
      // Reset mocks
      ;(getCachedIndex as any).mockReturnValue(null)
      ;(isIndexLoading as any).mockReturnValue(false)
    })
  })

  it('returns cached index if available', () => {
    const mockIndex: IndexEntry[] = [
      { path: '/test', title: 'Test', section: 'test', body: 'test body' },
    ]
    ;(getCachedIndex as any).mockReturnValue(mockIndex)
    ;(isIndexLoading as any).mockReturnValue(false)

    const { result } = renderHook(() => useSearchIndex())

    expect(result.current.index).toEqual(mockIndex)
    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBeNull()
  })

  it('starts loading if index is not cached', async () => {
    const mockIndex: IndexEntry[] = [
      { path: '/test', title: 'Test', section: 'test', body: 'test body' },
    ]
    ;(getCachedIndex as any).mockReturnValue(null)
    ;(isIndexLoading as any).mockReturnValue(false)
    ;(loadSearchIndex as any).mockResolvedValue(mockIndex)

    const { result } = renderHook(() => useSearchIndex())

    // Wait for load to complete (index set and loading false)
    await waitFor(() => {
      expect(result.current.loading).toBe(false)
      expect(result.current.index).toEqual(mockIndex)
    })
    expect(result.current.error).toBeNull()
  })

  it('waits for existing load if already loading', async () => {
    const mockIndex: IndexEntry[] = [
      { path: '/test', title: 'Test', section: 'test', body: 'test body' },
    ]
    ;(getCachedIndex as any).mockReturnValue(null)
    ;(isIndexLoading as any).mockReturnValue(true)
    ;(loadSearchIndex as any).mockResolvedValue(mockIndex)

    const { result } = renderHook(() => useSearchIndex())

    expect(result.current.loading).toBe(true)

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.index).toEqual(mockIndex)
    expect(loadSearchIndex).toHaveBeenCalledTimes(1)
  })

  it('handles loading errors', async () => {
    const error = new Error('Failed to load')
    ;(getCachedIndex as any).mockReturnValue(null)
    ;(isIndexLoading as any).mockReturnValue(false)
    ;(loadSearchIndex as any).mockRejectedValue(error)

    const { result } = renderHook(() => useSearchIndex())

    await waitFor(() => {
      expect(result.current.error).toBe(error)
    })
    expect(result.current.loading).toBe(false)
    expect(result.current.index).toBeNull()
  })

  it('updates state when cached index becomes available', async () => {
    const mockIndex: IndexEntry[] = [
      { path: '/test', title: 'Test', section: 'test', body: 'test body' },
    ]

    // Start with no cache
    ;(getCachedIndex as any).mockReturnValue(null)
    ;(isIndexLoading as any).mockReturnValue(false)
    ;(loadSearchIndex as any).mockResolvedValue(mockIndex)

    const { result } = renderHook(() => useSearchIndex())

    // Wait for load to complete
    await waitFor(() => {
      expect(result.current.loading).toBe(false)
      expect(result.current.index).toEqual(mockIndex)
    })

    // Now simulate cache being available on next render
    ;(getCachedIndex as any).mockReturnValue(mockIndex)
    ;(isIndexLoading as any).mockReturnValue(false)

    const { result: result2 } = renderHook(() => useSearchIndex())

    expect(result2.current.index).toEqual(mockIndex)
    expect(result2.current.loading).toBe(false)
  })
})
