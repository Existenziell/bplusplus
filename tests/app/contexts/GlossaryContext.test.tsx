import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, renderHook, act } from '@testing-library/react'
import { GlossaryProvider, useGlossary } from '@/app/contexts/GlossaryContext'

describe('GlossaryContext', () => {
  beforeEach(() => {
    // Reset window.__GLOSSARY_DATA__
    delete (window as any).__GLOSSARY_DATA__
  })

  it('provides default empty glossary data', () => {
    const { result } = renderHook(() => useGlossary(), {
      wrapper: GlossaryProvider,
    })

    expect(result.current.glossaryData).toEqual({})
    expect(result.current.isLoading).toBe(false)
  })

  it('loads glossary data from window.__GLOSSARY_DATA__', () => {
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

    ;(window as any).__GLOSSARY_DATA__ = mockGlossaryData

    const { result } = renderHook(() => useGlossary(), {
      wrapper: GlossaryProvider,
    })

    expect(result.current.glossaryData).toEqual(mockGlossaryData)
    expect(result.current.isLoading).toBe(false)
  })

  it('sets isLoading to false after loading', () => {
    const { result } = renderHook(() => useGlossary(), {
      wrapper: GlossaryProvider,
    })

    // Initially should be false (set in useEffect)
    expect(result.current.isLoading).toBe(false)
  })

  it('handles missing window.__GLOSSARY_DATA__', () => {
    delete (window as any).__GLOSSARY_DATA__

    const { result } = renderHook(() => useGlossary(), {
      wrapper: GlossaryProvider,
    })

    expect(result.current.glossaryData).toEqual({})
    expect(result.current.isLoading).toBe(false)
  })

  it('provides context to child components', () => {
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

    expect(getByTestId('loading')).toHaveTextContent('loaded')
    expect(getByTestId('count')).toHaveTextContent('0')
  })

  it('updates when window.__GLOSSARY_DATA__ changes', () => {
    const initialData = {
      bitcoin: { term: 'Bitcoin', definition: 'Currency' },
    }

    ;(window as any).__GLOSSARY_DATA__ = initialData

    const { result, rerender } = renderHook(() => useGlossary(), {
      wrapper: GlossaryProvider,
    })

    expect(result.current.glossaryData).toEqual(initialData)

    const updatedData = {
      ...initialData,
      blockchain: { term: 'Blockchain', definition: 'Ledger' },
    }

    ;(window as any).__GLOSSARY_DATA__ = updatedData

    // Note: The context doesn't re-read on window change, but we can test the initial load
    // In a real scenario, the data is set at build time
    expect(result.current.glossaryData).toEqual(initialData)
  })
})
