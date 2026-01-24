/**
 * Shared glossary parsing: strip markdown, truncate, parse ### term blocks.
 * Used by scripts/generate-glossary-data.js.
 */

const { generateSlug } = require('./slug')

function stripMarkdown(text) {
  return text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\s+/g, ' ')
    .trim()
}

function truncateDefinition(text, maxLength = 300) {
  if (text.length <= maxLength) return text
  const truncated = text.slice(0, maxLength)
  const lastSentence = truncated.lastIndexOf('. ')
  if (lastSentence > maxLength * 0.6) {
    return truncated.slice(0, lastSentence + 1) + '...'
  }
  const lastSpace = truncated.lastIndexOf(' ')
  return truncated.slice(0, lastSpace) + '...'
}

function parseGlossary(content) {
  const glossary = {}
  const lines = content.split('\n')
  let currentTerm = null
  let currentSlug = null
  let definitionLines = []

  for (const line of lines) {
    const termMatch = line.match(/^### (.+)$/)
    if (termMatch) {
      if (currentSlug && definitionLines.length > 0) {
        const rawDefinition = definitionLines.join(' ').trim()
        glossary[currentSlug] = {
          term: currentTerm,
          definition: truncateDefinition(stripMarkdown(rawDefinition)),
        }
      }
      currentTerm = termMatch[1].trim()
      currentSlug = generateSlug(currentTerm)
      definitionLines = []
      continue
    }
    if (line.match(/^## /)) continue
    if (currentSlug && line.trim()) definitionLines.push(line.trim())
  }

  if (currentSlug && definitionLines.length > 0) {
    const rawDefinition = definitionLines.join(' ').trim()
    glossary[currentSlug] = {
      term: currentTerm,
      definition: truncateDefinition(stripMarkdown(rawDefinition)),
    }
  }
  return glossary
}

module.exports = { stripMarkdown, truncateDefinition, parseGlossary }
