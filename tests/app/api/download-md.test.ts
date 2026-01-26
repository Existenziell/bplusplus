import { describe, it, expect, beforeEach, vi } from 'vitest'
import { NextRequest } from 'next/server'
import { GET } from '@/app/api/download-md/route'
import { getMarkdownForPath } from '@/app/utils/getMarkdownForPath'

// Mock the getMarkdownForPath utility
vi.mock('@/app/utils/getMarkdownForPath', () => ({
  getMarkdownForPath: vi.fn(),
}))

// Mock md-content.json
vi.mock('@/public/data/md-content.json', () => ({
  default: {
    '/docs/test': {
      content: '# Test Content\n\nThis is test markdown.',
      filename: 'test.md',
    },
  },
}))

describe('download-md API route', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns markdown content for valid path', async () => {
    const mockContent = '# Test Content\n\nThis is test markdown.'
    const mockFilename = 'test.md'

    ;(getMarkdownForPath as any).mockReturnValue({
      content: mockContent,
      filename: mockFilename,
    })

    const request = new NextRequest('http://localhost/api/download-md?path=/docs/test')

    const response = await GET(request)
    const text = await response.text()

    expect(response.status).toBe(200)
    expect(text).toBe(mockContent)
    expect(response.headers.get('Content-Type')).toBe('text/markdown; charset=utf-8')
    expect(response.headers.get('Content-Disposition')).toBe(`attachment; filename="${mockFilename}"`)

    expect(getMarkdownForPath).toHaveBeenCalledWith('/docs/test', expect.any(Object))
  })

  it('returns 400 for invalid path', async () => {
    ;(getMarkdownForPath as any).mockReturnValue({
      status: 400,
      error: 'Invalid path format',
    })

    const request = new NextRequest('http://localhost/api/download-md?path=invalid')

    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBe('Invalid path format')
  })

  it('returns 404 for non-existent path', async () => {
    ;(getMarkdownForPath as any).mockReturnValue({
      status: 404,
      error: 'Path not found',
      path: '/docs/nonexistent',
    })

    const request = new NextRequest('http://localhost/api/download-md?path=/docs/nonexistent')

    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(404)
    expect(data.error).toBe('Path not found')
    expect(data.path).toBe('/docs/nonexistent')
  })

  it('handles missing path parameter', async () => {
    ;(getMarkdownForPath as any).mockReturnValue({
      status: 400,
      error: 'Path is required',
    })

    const request = new NextRequest('http://localhost/api/download-md')

    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBe('Path is required')
  })

  it('handles special characters in filename', async () => {
    const mockContent = '# Test'
    const mockFilename = 'test-file (1).md'

    ;(getMarkdownForPath as any).mockReturnValue({
      content: mockContent,
      filename: mockFilename,
    })

    const request = new NextRequest('http://localhost/api/download-md?path=/docs/test')

    const response = await GET(request)

    expect(response.status).toBe(200)
    expect(response.headers.get('Content-Disposition')).toBe(`attachment; filename="${mockFilename}"`)
  })
})
