import { readFile } from 'fs/promises'
import { join } from 'path'

export async function readMarkdown(relativePath: string): Promise<string> {
  return readFile(join(process.cwd(), relativePath), 'utf-8')
}
