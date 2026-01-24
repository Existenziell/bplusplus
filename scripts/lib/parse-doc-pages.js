/**
 * Parse docPages from app/utils/navigation.ts content. Returns [{ path, mdFile, title, section }].
 * Shared by generate-md-content and generate-search-index.
 */
function parseDocPages(navContent) {
  const block = navContent.match(/export const docPages: DocPage\[\] = \[([\s\S]*?)\n\]/)?.[1]
  if (!block) return []
  const re = /\{\s*path:\s*'([^']+)',\s*mdFile:\s*'([^']+)',\s*title:\s*'([^']+)',\s*section:\s*'([^']+)'\s*\}/g
  const pages = []
  for (const m of block.matchAll(re)) {
    pages.push({ path: m[1], mdFile: m[2], title: m[3], section: m[4] })
  }
  return pages
}

module.exports = { parseDocPages }
