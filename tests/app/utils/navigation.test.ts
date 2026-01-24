import { describe, it, expect } from 'vitest'
import { docPages, downloadablePaths } from '@/app/utils/navigation'

describe('navigation', () => {
  it('docPages has no duplicate paths', () => {
    const paths = docPages.map((p) => p.path)
    const unique = new Set(paths)
    expect(unique.size).toBe(paths.length)
  })

  it('downloadablePaths has the same size as docPages', () => {
    expect(downloadablePaths.size).toBe(docPages.length)
  })
})
