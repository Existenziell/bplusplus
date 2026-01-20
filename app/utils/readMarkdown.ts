import { readFile } from 'fs/promises'
import { join } from 'path'

export async function readMarkdown(relativePath: string): Promise<string> {
  return readFile(join(process.cwd(), relativePath), 'utf-8')
}

export async function readMarkdownFiles(
  relativePaths: string[],
  separator: string = '\n\n'
): Promise<string> {
  const contents = await Promise.all(
    relativePaths.map(path => readMarkdown(path))
  )
  return contents.join(separator)
}
