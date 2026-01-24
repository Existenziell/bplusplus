/**
 * Generate URL-safe slug from text. Shared by generate-glossary-data and generate-search-index.
 */
function generateSlug(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

module.exports = { generateSlug }
