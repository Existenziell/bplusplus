import { describe, it, expect, vi, beforeEach } from 'vitest'
import { readFile } from 'fs/promises'
import { readMarkdown } from '@/app/utils/readMarkdown'
import { join } from 'path'

// Mock fs/promises
vi.mock('fs/promises', () => ({
  readFile: vi.fn(),
}))

describe('readMarkdown', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('reads file from correct path', async () => {
    const mockContent = '# Test Markdown\n\nContent here.'
    ;(readFile as any).mockResolvedValueOnce(mockContent)

    const result = await readMarkdown('app/docs/test.md')

    expect(readFile).toHaveBeenCalledWith(
      join(process.cwd(), 'app/docs/test.md'),
      'utf-8'
    )
    expect(result).toBe(mockContent)
  })

  it('returns file content as string', async () => {
    const mockContent = '# Title\n\nBody text.'
    ;(readFile as any).mockResolvedValueOnce(mockContent)

    const result = await readMarkdown('test.md')

    expect(result).toBe(mockContent)
    expect(typeof result).toBe('string')
  })

  it('handles nested paths', async () => {
    const mockContent = 'content'
    ;(readFile as any).mockResolvedValueOnce(mockContent)

    await readMarkdown('app/docs/nested/path/file.md')

    expect(readFile).toHaveBeenCalledWith(
      join(process.cwd(), 'app/docs/nested/path/file.md'),
      'utf-8'
    )
  })

  it('propagates file read errors', async () => {
    const error = new Error('File not found')
    ;(readFile as any).mockRejectedValueOnce(error)

    await expect(readMarkdown('nonexistent.md')).rejects.toThrow('File not found')
  })
})
