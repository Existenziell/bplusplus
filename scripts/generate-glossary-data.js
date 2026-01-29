#!/usr/bin/env node
/**
 * Build script to generate glossary lookup data for tooltips.
 * Parses terms.md and creates a JSON map of {slug: {term, definition}}
 *
 * Run with: ./scripts/generate-glossary-data.js or node scripts/generate-glossary-data.js
 */

const fs = require('fs')
const path = require('path')
const { parseGlossary } = require('./lib/glossary-parse')

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
