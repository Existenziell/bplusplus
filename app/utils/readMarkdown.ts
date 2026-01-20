import { readFile } from 'fs/promises'
import { join } from 'path'

/**
 * Reads a markdown file from the given path relative to the project root.
 * Standardized async utility for all markdown page components.
 *
 * @param relativePath - Path relative to process.cwd() (e.g., 'app/docs/fundamentals/overview/overview.md')
 * @returns The markdown content as a string
 */
export async function readMarkdown(relativePath: string): Promise<string> {
  return readFile(join(process.cwd(), relativePath), 'utf-8')
}

/**
 * Reads multiple markdown files and concatenates them with optional separator.
 * Useful for pages that combine multiple markdown files.
 *
 * @param relativePaths - Array of paths relative to process.cwd()
 * @param separator - Optional separator between concatenated content (default: '\n\n')
 * @returns The concatenated markdown content as a string
 */
export async function readMarkdownFiles(
  relativePaths: string[],
  separator: string = '\n\n'
): Promise<string> {
  const contents = await Promise.all(
    relativePaths.map(path => readMarkdown(path))
  )
  return contents.join(separator)
}
