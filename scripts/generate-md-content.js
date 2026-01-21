/**
 * Build script to generate a JSON file containing all markdown content.
 * This is run at build time to bundle markdown files for the download API.
 * 
 * Run with: node scripts/generate-md-content.js
 */

const fs = require('fs')
const path = require('path')

// Import the docPages configuration
// We need to read and parse it manually since it's TypeScript
const navigationPath = path.join(__dirname, '../app/utils/navigation.ts')
const navigationContent = fs.readFileSync(navigationPath, 'utf-8')

// Extract docPages array using regex (simple extraction)
const docPagesMatch = navigationContent.match(/export const docPages: DocPage\[\] = \[([\s\S]*?)\n\]/)
if (!docPagesMatch) {
  console.error('Could not find docPages in navigation.ts')
  process.exit(1)
}

// Parse the docPages entries
const entries = docPagesMatch[1].matchAll(/\{\s*path:\s*'([^']+)',\s*mdFile:\s*'([^']+)',/g)

const mdContent = {}

for (const match of entries) {
  const urlPath = match[1]
  const mdFile = match[2]
  const fullPath = path.join(__dirname, '..', mdFile)
  
  try {
    const content = fs.readFileSync(fullPath, 'utf-8')
    mdContent[urlPath] = {
      content,
      filename: path.basename(mdFile)
    }
    console.log(`✓ ${urlPath}`)
  } catch (err) {
    console.error(`✗ ${urlPath}: ${err.message}`)
  }
}

// Write to public directory so it's accessible at runtime
const outputPath = path.join(__dirname, '../public/data/md-content.json')
fs.mkdirSync(path.dirname(outputPath), { recursive: true })
fs.writeFileSync(outputPath, JSON.stringify(mdContent, null, 2))

console.log(`\nGenerated ${Object.keys(mdContent).length} entries to public/data/md-content.json`)
