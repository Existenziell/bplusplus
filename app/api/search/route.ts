import { NextRequest, NextResponse } from 'next/server'

import searchIndex from '@/public/data/search-index.json'

type IndexEntry = { path: string; title: string; section: string; body: string; keywords?: string[] }
const index = searchIndex as IndexEntry[]

const SNIPPET_LEN = 120
const MAX_RESULTS = 20

function normalize(s: string): string {
  return s.toLowerCase().replace(/[\s\-_]+/g, '')
}

function rank(rec: IndexEntry, nq: string): number {
  const nTitle = normalize(rec.title)
  if (nTitle === nq || (rec.keywords ?? []).some((k) => normalize(k) === nq)) return 3
  if (nTitle.includes(nq)) return 2
  return 1
}

function snippet(body: string, query: string): string {
  if (!body) return ''
  const lower = body.toLowerCase()
  const tokens = query
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .filter(Boolean)
  let bestStart = 0
  for (const t of tokens) {
    const i = lower.indexOf(t)
    if (i === -1) continue
    const start = Math.max(0, i - Math.floor(SNIPPET_LEN / 2))
    if (start < bestStart || bestStart === 0) bestStart = start
  }
  const end = Math.min(body.length, bestStart + SNIPPET_LEN)
  const s = body.slice(bestStart, end).trim()
  const prefix = bestStart > 0 ? '…' : ''
  const suffix = end < body.length ? '…' : ''
  return prefix + s + suffix
}

type Row = { path: string; title: string; section: string; snippet: string; rank: number }

async function search(q: string): Promise<{ path: string; title: string; section: string; snippet: string }[]> {
  const nq = normalize(q)
  const tokens = q.toLowerCase().split(/\s+/).filter(Boolean)
  const pageRows: Row[] = []
  const glossaryRows: Row[] = []

  for (const rec of index) {
    const s = (rec.title + ' ' + rec.body + ' ' + (rec.keywords ?? []).join(' ')).toLowerCase()
    if (!tokens.every((t) => s.includes(t))) continue
    const row: Row = {
      path: rec.path,
      title: rec.title,
      section: rec.section,
      snippet: snippet(rec.body, q) || rec.title,
      rank: rank(rec, nq),
    }
    if (rec.path.startsWith('/docs/glossary#')) glossaryRows.push(row)
    else pageRows.push(row)
  }

  pageRows.sort((a, b) => b.rank - a.rank)
  glossaryRows.sort((a, b) => b.rank - a.rank)
  return [...pageRows, ...glossaryRows].slice(0, MAX_RESULTS).map(({ rank: _r, ...r }) => r)
}

export async function GET(request: NextRequest) {
  const q = (request.nextUrl.searchParams.get('q')?.trim() ?? '').slice(0, 200)
  if (q.length < 1) {
    return NextResponse.json({ results: [] })
  }

  const results = await search(q)
  return NextResponse.json({ results })
}
