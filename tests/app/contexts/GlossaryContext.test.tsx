import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, renderHook, waitFor } from '@testing-library/react'
import { GlossaryProvider, useGlossary, clearGlossaryCache } from '@/app/contexts/GlossaryContext'

describe('GlossaryContext', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    clearGlossaryCache()
  })

  it('provides default empty glossary data', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({}),
    } as any)

    const { result } = renderHook(() => useGlossary(), {
      wrapper: GlossaryProvider,
    })

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.glossaryData).toEqual({})
  })

  it('loads glossary data from /data/glossary.json', async () => {
    const mockGlossaryData = {
      bitcoin: {
        term: 'Bitcoin',
        definition: 'A decentralized digital currency',
      },
      blockchain: {
        term: 'Blockchain',
        definition: 'A distributed ledger',
      },
    }

    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockGlossaryData,
    } as any)

    const { result } = renderHook(() => useGlossary(), {
      wrapper: GlossaryProvider,
    })

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.glossaryData).toEqual(mockGlossaryData)
  })

  it('sets isLoading to false after loading', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({}),
    } as any)

    const { result } = renderHook(() => useGlossary(), {
      wrapper: GlossaryProvider,
    })

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })
  })

  it('handles fetch errors by falling back to empty data', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: false,
      json: async () => ({}),
    } as any)

    const { result } = renderHook(() => useGlossary(), {
      wrapper: GlossaryProvider,
    })

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.glossaryData).toEqual({})
  })

  it('provides context to child components', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({}),
    } as any)

    const TestComponent = () => {
      const { glossaryData, isLoading } = useGlossary()
      return (
        <div>
          <div data-testid="loading">{isLoading ? 'loading' : 'loaded'}</div>
          <div data-testid="count">{Object.keys(glossaryData).length}</div>
        </div>
      )
    }

    const { getByTestId } = render(
      <GlossaryProvider>
        <TestComponent />
      </GlossaryProvider>
    )

    await waitFor(() => {
      expect(getByTestId('loading')).toHaveTextContent('loaded')
    })
    expect(getByTestId('count')).toHaveTextContent('0')
  })

  it('caches glossary data (does not refetch for subsequent consumers)', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ bitcoin: { term: 'Bitcoin', definition: 'Currency' } }),
    } as any)

    const { result } = renderHook(() => useGlossary(), { wrapper: GlossaryProvider })
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    const { result: result2 } = renderHook(() => useGlossary(), { wrapper: GlossaryProvider })
    await waitFor(() => {
      expect(result2.current.isLoading).toBe(false)
    })

    expect(fetchSpy).toHaveBeenCalledTimes(1)
  })
})
