#!/usr/bin/env node
/**
 * Check that all /docs/glossary#slug links in app markdown files have a
 * matching entry in public/data/glossary.json (so tooltips work).
 *
 * Run: node scripts/check-glossary-links.js
 */

const fs = require('fs')
const path = require('path')

const glossaryPath = path.join(__dirname, '../public/data/glossary.json')
const glossary = JSON.parse(fs.readFileSync(glossaryPath, 'utf-8'))
const glossarySlugs = new Set(Object.keys(glossary))

// Find all .md files in app/
function findMdFiles(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const e of entries) {
    const p = path.join(dir, e.name)
    if (e.isDirectory() && !e.name.startsWith('.') && e.name !== 'node_modules') {
      findMdFiles(p, files)
    } else if (e.isFile() && e.name.endsWith('.md')) {
      files.push(p)
    }
  }
  return files
}

const mdFiles = findMdFiles(path.join(__dirname, '../app'))
const re = /\]\(\/docs\/glossary#([a-z0-9-]+)\)/g

const used = new Map() // slug -> [ { file, lineNum, line } ]

for (const file of mdFiles) {
  const content = fs.readFileSync(file, 'utf-8')
  const lines = content.split('\n')
  for (let i = 0; i < lines.length; i++) {
    let m
    re.lastIndex = 0
    while ((m = re.exec(lines[i])) !== null) {
      const slug = m[1]
      if (!used.has(slug)) used.set(slug, [])
      used.get(slug).push({ file, lineNum: i + 1, line: lines[i].trim() })
    }
  }
}

const missing = [...used.keys()].filter(s => !glossarySlugs.has(s))

if (missing.length > 0) {
  console.error('ERROR: Glossary links that have no matching term (tooltips will fall back to plain link):\n')
  for (const slug of missing.sort()) {
    const occurrences = used.get(slug)
    for (const { file, lineNum } of occurrences) {
      console.error(`  /docs/glossary#${slug}`)
      console.error(`    -> ${path.relative(process.cwd(), file)}:${lineNum}`)
    }
    console.error('')
  }
  process.exit(1)
}

console.log('OK: All glossary links have matching terms in glossary.json')
process.exit(0)
