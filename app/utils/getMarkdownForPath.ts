export interface MdEntry {
  content: string
  filename: string
}

export type GetMarkdownOk = { content: string; filename: string }
export type GetMarkdownError400 = { error: string; status: 400 }
export type GetMarkdownError404 = { error: string; path: string; status: 404 }

export type GetMarkdownResult = GetMarkdownOk | GetMarkdownError400 | GetMarkdownError404

/**
 * Resolve path to markdown content from a pre-generated map.
 * Used by /api/download-md. Normalizes path (strip trailing slash) before lookup.
 */
export function getMarkdownForPath(
  path: string | null,
  mdContentMap: Record<string, MdEntry>
): GetMarkdownResult {
  if (!path) {
    return { error: 'Path parameter is required', status: 400 }
  }
  const normalizedPath = path.endsWith('/') ? path.slice(0, -1) : path
  const entry = mdContentMap[normalizedPath]
  if (!entry) {
    return { error: 'MD file not found for this path', path: normalizedPath, status: 404 }
  }
  return { content: entry.content, filename: entry.filename }
}
