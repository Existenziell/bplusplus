/**
 * Build script to generate glossary lookup data for tooltips.
 * Parses terms.md and creates a JSON map of {slug: {term, definition}}
 * 
 * Run with: node scripts/generate-glossary-data.js
 */

const fs = require('fs')
const path = require('path')

// Generate slug from text (same as the app)
function generateSlug(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Strip markdown formatting for plain text tooltip
function stripMarkdown(text) {
  return text
    // Remove links but keep text: [text](url) -> text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Remove bold/italic
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    // Remove inline code backticks
    .replace(/`([^`]+)`/g, '$1')
    // Clean up extra whitespace
    .replace(/\s+/g, ' ')
    .trim()
}

// Truncate text to a reasonable length for tooltip
function truncateDefinition(text, maxLength = 300) {
  if (text.length <= maxLength) return text
  
  // Try to cut at a sentence boundary
  const truncated = text.slice(0, maxLength)
  const lastSentence = truncated.lastIndexOf('. ')
  
  if (lastSentence > maxLength * 0.6) {
    return truncated.slice(0, lastSentence + 1)
  }
  
  // Otherwise cut at word boundary
  const lastSpace = truncated.lastIndexOf(' ')
  return truncated.slice(0, lastSpace) + '...'
}

// Parse the glossary markdown content
function parseGlossary(content) {
  const glossary = {}
  const lines = content.split('\n')
  
  let currentTerm = null
  let currentSlug = null
  let definitionLines = []
  
  for (const line of lines) {
    // Check for term header (### Term Name)
    const termMatch = line.match(/^### (.+)$/)
    if (termMatch) {
      // Save previous entry if exists
      if (currentSlug && definitionLines.length > 0) {
        const rawDefinition = definitionLines.join(' ').trim()
        const plainDefinition = stripMarkdown(rawDefinition)
        glossary[currentSlug] = {
          term: currentTerm,
          definition: truncateDefinition(plainDefinition)
        }
      }
      
      currentTerm = termMatch[1].trim()
      currentSlug = generateSlug(currentTerm)
      definitionLines = []
      continue
    }
    
    // Skip section headers (## A, ## B, etc.)
    if (line.match(/^## /)) {
      continue
    }
    
    // Accumulate definition content (non-empty lines after term)
    if (currentSlug && line.trim()) {
      definitionLines.push(line.trim())
    }
  }
  
  // Save last entry
  if (currentSlug && definitionLines.length > 0) {
    const rawDefinition = definitionLines.join(' ').trim()
    const plainDefinition = stripMarkdown(rawDefinition)
    glossary[currentSlug] = {
      term: currentTerm,
      definition: truncateDefinition(plainDefinition)
    }
  }
  
  return glossary
}

// Main
const termsPath = path.join(__dirname, '../app/docs/glossary/terms.md')
const outputPath = path.join(__dirname, '../public/data/glossary.json')

try {
  const content = fs.readFileSync(termsPath, 'utf-8')
  const glossary = parseGlossary(content)
  
  fs.writeFileSync(outputPath, JSON.stringify(glossary, null, 2))
  
  console.log(`✓ Generated glossary with ${Object.keys(glossary).length} terms`)
  console.log(`  Output: public/data/glossary.json`)
} catch (err) {
  console.error(`Error: ${err.message}`)
  process.exit(1)
}
