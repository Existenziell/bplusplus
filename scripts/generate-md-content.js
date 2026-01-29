#!/usr/bin/env node
/**
 * Build script to generate a JSON file containing all markdown content.
 * This is run at build time to bundle markdown files for the download API.
 * Also extracts h2 headings for each page and writes public/data/headings.json.
 *
 * Run with: ./scripts/generate-md-content.js or node scripts/generate-md-content.js
 */

const fs = require('fs')
const path = require('path')
const { parseDocPages } = require('./lib/parse-doc-pages')
const { generateSlug } = require('./lib/slug')

const navigationPath = path.join(__dirname, '../app/utils/navigation.ts')
const navigationContent = fs.readFileSync(navigationPath, 'utf-8')
const docPages = parseDocPages(navigationContent)

if (docPages.length === 0) {
  console.error('Could not find docPages in navigation.ts')
  process.exit(1)
}

function extractH2Headings(content) {
  const re = /^## ([^\n]+)/gm
  const headings = []
  let m
  while ((m = re.exec(content)) !== null) {
    const title = m[1].trim()
    headings.push({ title, slug: generateSlug(title) })
  }
  return headings
}

const mdContent = {}
const headingsByPath = {}

for (const page of docPages) {
  const { path: urlPath, mdFile } = page
  const fullPath = path.join(__dirname, '..', mdFile)

  try {
    const content = fs.readFileSync(fullPath, 'utf-8')
    const headings = extractH2Headings(content)
    mdContent[urlPath] = {
      content,
      filename: path.basename(mdFile)
    }
    headingsByPath[urlPath] = headings
    console.log(`✓ ${urlPath}`)
  } catch (err) {
    console.error(`✗ ${urlPath}: ${err.message}`)
  }
}

// Write to public directory so it's accessible at runtime
const dataDir = path.join(__dirname, '../public/data')
fs.mkdirSync(dataDir, { recursive: true })

const mdContentPath = path.join(dataDir, 'md-content.json')
fs.writeFileSync(mdContentPath, JSON.stringify(mdContent, null, 2))
console.log(`\nGenerated ${Object.keys(mdContent).length} entries to public/data/md-content.json`)

const headingsPath = path.join(dataDir, 'headings.json')
fs.writeFileSync(headingsPath, JSON.stringify(headingsByPath, null, 2))
console.log(`Generated headings for ${Object.keys(headingsByPath).length} pages to public/data/headings.json`)
