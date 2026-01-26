export type IndexEntry = {
  path: string
  title: string
  section: string
  body: string
  keywords?: string[]
}

export const SNIPPET_LEN = 120
export const MAX_RESULTS = 20

export function normalize(s: string): string {
  return s.toLowerCase().replace(/[\s\-_]+/g, '')
}

/**
 * Enhanced ranking function with phrase matching and multi-factor scoring.
 * Returns a score from 0-10, with higher scores being more relevant.
 */
export function rank(rec: IndexEntry, query: string, tokens: string[]): number {
  const lowerQuery = query.toLowerCase()
  const lowerTitle = rec.title.toLowerCase()
  const lowerBody = rec.body.toLowerCase()
  const lowerKeywords = (rec.keywords ?? []).map(k => k.toLowerCase()).join(' ')

  // Phrase match in title: 10 points
  if (lowerTitle.includes(lowerQuery)) {
    return 10
  }

  // Phrase match in keywords: 9 points
  if (lowerKeywords.includes(lowerQuery)) {
    return 9
  }

  // All tokens in title (in order): 8 points
  const titleWords = lowerTitle.split(/\s+/)
  if (tokens.length > 1) {
    let titleIndex = 0
    let allFoundInOrder = true
    for (const token of tokens) {
      const foundIndex = titleWords.findIndex((w, i) => i >= titleIndex && w.includes(token))
      if (foundIndex === -1) {
        allFoundInOrder = false
        break
      }
      titleIndex = foundIndex + 1
    }
    if (allFoundInOrder) {
      return 8
    }
  }

  // All tokens in title (any order): 7 points
  const nTitle = normalize(rec.title)
  if (tokens.every(t => nTitle.includes(normalize(t)))) {
    return 7
  }

  // Phrase match in body: 6 points
  if (lowerBody.includes(lowerQuery)) {
    return 6
  }

  // All tokens in body (close together): 5 points
  if (tokens.length > 1) {
    const bodyWords = lowerBody.split(/\s+/)
    let minDistance = Infinity
    for (let i = 0; i < bodyWords.length; i++) {
      if (bodyWords[i].includes(tokens[0])) {
        let foundAll = true
        let maxIndex = i
        for (let j = 1; j < tokens.length; j++) {
          const foundIndex = bodyWords.findIndex((w, idx) => idx > maxIndex && w.includes(tokens[j]))
          if (foundIndex === -1) {
            foundAll = false
            break
          }
          maxIndex = foundIndex
        }
        if (foundAll) {
          const distance = maxIndex - i
          minDistance = Math.min(minDistance, distance)
        }
      }
    }
    if (minDistance < 10) { // Words within 10 positions
      return 5
    }
  }

  // All tokens in body (anywhere): 4 points
  if (tokens.every(t => lowerBody.includes(t))) {
    return 4
  }

  // Partial matches: 1-3 points
  const matchedTokens = tokens.filter(t => {
    return lowerTitle.includes(t) || lowerKeywords.includes(t) || lowerBody.includes(t)
  }).length
  if (matchedTokens > 0) {
    return Math.max(1, Math.floor((matchedTokens / tokens.length) * 3))
  }

  return 0
}

export function snippet(body: string): string {
  if (!body) return ''
  if (body.length <= SNIPPET_LEN) return body
  const cut = body.slice(0, SNIPPET_LEN)
  const last = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf(' '))
  if (last > SNIPPET_LEN * 0.5) return cut.slice(0, last + 1) + '…'
  return cut.trim() + '…'
}

type Row = { path: string; title: string; section: string; snippet: string; rank: number }

/**
 * Deduplicate results by removing overview pages when specific child results exist.
 * For example, if we have results for specific people, remove the /docs/history/people overview page.
 */
function deduplicateResults(rows: Row[]): Row[] {
  const resultPaths = new Set(rows.map(r => r.path))
  const filtered: Row[] = []
  const overviewPagesToCheck = [
    '/docs/history/people',
    '/docs/glossary',
  ]

  for (const row of rows) {
    // Check if this is an overview page that should be excluded
    let shouldExclude = false
    for (const overviewPath of overviewPagesToCheck) {
      if (row.path === overviewPath) {
        // Check if we have specific child results
        if (overviewPath === '/docs/history/people') {
          // Check if any people# results exist
          const hasSpecificPeople = rows.some(r => 
            r.path.startsWith('/docs/history/people#') && r.path !== overviewPath
          )
          if (hasSpecificPeople) {
            shouldExclude = true
            break
          }
        } else if (overviewPath === '/docs/glossary') {
          // Check if any glossary# results exist
          const hasSpecificGlossary = rows.some(r => 
            r.path.startsWith('/docs/glossary#') && r.path !== overviewPath
          )
          if (hasSpecificGlossary) {
            shouldExclude = true
            break
          }
        }
      }
    }
    if (!shouldExclude) {
      filtered.push(row)
    }
  }

  return filtered
}

// Simple result cache to avoid re-searching identical queries
const resultCache = new Map<string, { path: string; title: string; section: string; snippet: string }[]>()

export function search(
  q: string,
  index: IndexEntry[]
): { path: string; title: string; section: string; snippet: string }[] {
  const tokens = q.toLowerCase().split(/\s+/).filter(Boolean)
  if (tokens.length === 0) return []

  // Check cache first
  const cacheKey = q.toLowerCase().trim()
  if (resultCache.has(cacheKey)) {
    return resultCache.get(cacheKey)!
  }

  const pageRows: Row[] = []
  const peopleRows: Row[] = []
  const glossaryRows: Row[] = []

  // Pre-compute searchable text once per entry for better performance
  // Early termination: if we have enough high-ranking results, we can stop early
  // But we still need to check all entries to ensure we have the best results
  for (const rec of index) {
    const searchableText = (
      rec.title + ' ' + 
      rec.body + ' ' + 
      (rec.keywords ?? []).join(' ')
    ).toLowerCase()

    // Check if all tokens appear in the searchable text
    if (!tokens.every((t) => searchableText.includes(t))) continue

    const row: Row = {
      path: rec.path,
      title: rec.title,
      section: rec.section,
      snippet: snippet(rec.body) || rec.title,
      rank: rank(rec, q, tokens),
    }

    // Only add if rank > 0 (has some relevance)
    if (row.rank > 0) {
      if (rec.path.startsWith('/docs/glossary#')) {
        glossaryRows.push(row)
      } else if (rec.path.startsWith('/docs/history/people#')) {
        peopleRows.push(row)
      } else {
        pageRows.push(row)
      }
    }
  }

  // Sort by rank (highest first)
  pageRows.sort((a, b) => b.rank - a.rank)
  peopleRows.sort((a, b) => b.rank - a.rank)
  glossaryRows.sort((a, b) => b.rank - a.rank)

  // Combine results: pages first, then people, then glossary
  const allResults = [...pageRows, ...peopleRows, ...glossaryRows]

  // Deduplicate overview pages
  const deduplicated = deduplicateResults(allResults)

  // Return top MAX_RESULTS
  const results = deduplicated
    .slice(0, MAX_RESULTS)
    .map(({ rank: _r, ...r }) => r)

  // Cache results (limit cache size to prevent memory issues)
  if (resultCache.size > 100) {
    // Clear oldest entries (simple FIFO)
    const firstKey = resultCache.keys().next().value
    if (firstKey) resultCache.delete(firstKey)
  }
  resultCache.set(cacheKey, results)

  return results
}
