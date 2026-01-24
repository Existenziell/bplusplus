import { NextRequest, NextResponse } from 'next/server'

import searchIndex from '@/public/data/search-index.json'
import { search } from '@/app/utils/searchLogic'

import type { IndexEntry } from '@/app/utils/searchLogic'

const index = searchIndex as IndexEntry[]

export async function GET(request: NextRequest) {
  const q = (request.nextUrl.searchParams.get('q')?.trim() ?? '').slice(0, 200)
  if (q.length < 1) {
    return NextResponse.json({ results: [] })
  }

  const results = search(q, index)
  return NextResponse.json({ results })
}
