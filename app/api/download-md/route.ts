import { NextRequest, NextResponse } from 'next/server'
import { getMarkdownForPath } from '@/app/utils/getMarkdownForPath'
import mdContent from '@/public/data/md-content.json'

const mdContentTyped = mdContent as Record<string, { content: string; filename: string }>

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const path = searchParams.get('path')
  const result = getMarkdownForPath(path, mdContentTyped)

  if ('content' in result) {
    return new NextResponse(result.content, {
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Content-Disposition': `attachment; filename="${result.filename}"`,
      },
    })
  }
  if (result.status === 400) {
    return NextResponse.json({ error: result.error }, { status: 400 })
  }
  return NextResponse.json({ error: result.error, path: result.path }, { status: 404 })
}
