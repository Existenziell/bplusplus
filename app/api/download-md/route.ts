import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'
import { pathToMdFile } from '@/app/data/navigation'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const path = searchParams.get('path')

  if (!path) {
    return NextResponse.json({ error: 'Path parameter is required' }, { status: 400 })
  }

  const mdFilePath = pathToMdFile[path]

  if (!mdFilePath) {
    return NextResponse.json({ error: 'MD file not found for this path' }, { status: 404 })
  }

  const fullPath = join(process.cwd(), mdFilePath)

  if (!existsSync(fullPath)) {
    return NextResponse.json({ error: 'File not found' }, { status: 404 })
  }

  try {
    const content = await readFile(fullPath, 'utf-8')

    // Extract filename from the path
    const filename = mdFilePath.split('/').pop() || 'document.md'

    return new NextResponse(content, {
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    })
  } catch {
    return NextResponse.json({ error: 'Failed to read file' }, { status: 500 })
  }
}
