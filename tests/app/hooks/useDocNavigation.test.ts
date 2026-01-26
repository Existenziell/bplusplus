import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { usePathname } from 'next/navigation'
import { useDocNavigation } from '@/app/hooks/useDocNavigation'
import { pathnameToDocNavigationState } from '@/app/utils/docNavigationState'

// Mock Next.js navigation
vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
}))

// Mock the navigation utilities
vi.mock('@/app/utils/navigation', () => ({
  navItems: [
    {
      title: 'Fundamentals',
      href: '/docs/fundamentals',
      children: [{ title: 'Overview', href: '/docs/fundamentals' }],
    },
  ],
  downloadablePaths: new Set(['/docs/fundamentals']),
  routeLabels: { '/docs/fundamentals': 'Fundamentals' },
}))

vi.mock('@/app/utils/docNavigationState', () => ({
  getFlattenedPages: vi.fn(() => [
    { title: 'Fundamentals', href: '/docs/fundamentals' },
  ]),
  pathnameToDocNavigationState: vi.fn(),
}))

describe('useDocNavigation', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('calls pathnameToDocNavigationState with current pathname', () => {
    const mockPathname = '/docs/fundamentals'
    const mockState = {
      pathname: mockPathname,
      breadcrumbs: [],
      previousPage: null,
      nextPage: null,
      isDownloadable: true,
      isMainSectionPage: false,
    }

    ;(usePathname as any).mockReturnValue(mockPathname)
    ;(pathnameToDocNavigationState as any).mockReturnValue(mockState)

    const { result } = renderHook(() => useDocNavigation())

    expect(pathnameToDocNavigationState).toHaveBeenCalledWith(
      mockPathname,
      expect.objectContaining({
        flatPages: expect.any(Array),
        mainPageHrefs: expect.any(Set),
        routeLabels: expect.any(Object),
        downloadablePaths: expect.any(Set),
      })
    )
    expect(result.current).toEqual(mockState)
  })

  it('updates when pathname changes', () => {
    const mockState1 = {
      pathname: '/docs/fundamentals',
      breadcrumbs: [],
      previousPage: null,
      nextPage: null,
      isDownloadable: true,
      isMainSectionPage: false,
    }

    const mockState2 = {
      pathname: '/docs/bitcoin',
      breadcrumbs: [],
      previousPage: null,
      nextPage: null,
      isDownloadable: false,
      isMainSectionPage: false,
    }

    ;(usePathname as any).mockReturnValue('/docs/fundamentals')
    ;(pathnameToDocNavigationState as any).mockReturnValue(mockState1)

    const { result, rerender } = renderHook(() => useDocNavigation())

    expect(result.current.pathname).toBe('/docs/fundamentals')

    ;(usePathname as any).mockReturnValue('/docs/bitcoin')
    ;(pathnameToDocNavigationState as any).mockReturnValue(mockState2)

    rerender()

    expect(result.current.pathname).toBe('/docs/bitcoin')
  })

  it('memoizes result based on pathname', () => {
    const mockPathname = '/docs/fundamentals'
    const mockState = {
      pathname: mockPathname,
      breadcrumbs: [],
      previousPage: null,
      nextPage: null,
      isDownloadable: true,
      isMainSectionPage: false,
    }

    ;(usePathname as any).mockReturnValue(mockPathname)
    ;(pathnameToDocNavigationState as any).mockReturnValue(mockState)

    const { result, rerender } = renderHook(() => useDocNavigation())

    const firstResult = result.current

    // Rerender with same pathname
    rerender()

    // Should return same object reference (memoized)
    expect(result.current).toBe(firstResult)
    // pathnameToDocNavigationState should only be called once per pathname
    expect(pathnameToDocNavigationState).toHaveBeenCalledTimes(1)
  })
})
