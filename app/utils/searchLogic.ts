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

export function rank(rec: IndexEntry, nq: string): number {
  const nTitle = normalize(rec.title)
  if (nTitle === nq || (rec.keywords ?? []).some((k) => normalize(k) === nq)) return 3
  if (nTitle.includes(nq)) return 2
  return 1
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

export function search(
  q: string,
  index: IndexEntry[]
): { path: string; title: string; section: string; snippet: string }[] {
  const nq = normalize(q)
  const tokens = q.toLowerCase().split(/\s+/).filter(Boolean)
  const pageRows: Row[] = []
  const peopleRows: Row[] = []
  const glossaryRows: Row[] = []

  for (const rec of index) {
    const s = (rec.title + ' ' + rec.body + ' ' + (rec.keywords ?? []).join(' ')).toLowerCase()
    if (!tokens.every((t) => s.includes(t))) continue
    const row: Row = {
      path: rec.path,
      title: rec.title,
      section: rec.section,
      snippet: snippet(rec.body) || rec.title,
      rank: rank(rec, nq),
    }
    if (rec.path.startsWith('/docs/glossary#')) glossaryRows.push(row)
    else if (rec.path.startsWith('/docs/history/people#')) peopleRows.push(row)
    else pageRows.push(row)
  }

  pageRows.sort((a, b) => b.rank - a.rank)
  peopleRows.sort((a, b) => b.rank - a.rank)
  glossaryRows.sort((a, b) => b.rank - a.rank)
  return [...pageRows, ...peopleRows, ...glossaryRows]
    .slice(0, MAX_RESULTS)
    .map(({ rank: _r, ...r }) => r)
}
