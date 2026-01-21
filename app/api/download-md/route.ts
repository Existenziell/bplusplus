import { NextRequest, NextResponse } from 'next/server'

// Import the pre-generated markdown content
// This is generated at build time by scripts/generate-md-content.js
import mdContent from '@/public/data/md-content.json'

// Type for the imported JSON
interface MdEntry {
  content: string
  filename: string
}

const mdContentTyped = mdContent as Record<string, MdEntry>

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const path = searchParams.get('path')

  if (!path) {
    return NextResponse.json({ error: 'Path parameter is required' }, { status: 400 })
  }

  // Normalize path - remove trailing slash if present
  const normalizedPath = path.endsWith('/') ? path.slice(0, -1) : path

  const entry = mdContentTyped[normalizedPath]

  if (!entry) {
    return NextResponse.json({ error: 'MD file not found for this path', path: normalizedPath }, { status: 404 })
  }

  return new NextResponse(entry.content, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Content-Disposition': `attachment; filename="${entry.filename}"`,
    },
  })
}
