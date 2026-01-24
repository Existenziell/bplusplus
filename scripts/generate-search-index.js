/**
 * Build script to generate a search index from md-content, glossary, and docPages.
 * Run after generate-md-content and generate-glossary-data in prebuild.
 *
 * Run with: node scripts/generate-search-index.js
 */

const fs = require('fs')
const path = require('path')

// Strip markdown to plain text for search indexing (extends glossary script logic)
function stripMarkdown(text) {
  return text
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/^#+\s*/gm, '')
    .replace(/^>\s?/gm, '')
    .replace(/^\s*[-*]\s+/gm, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\s+/g, ' ')
    .trim()
}

function excerpt(text, maxLen = 500) {
  if (!text || text.length <= maxLen) return text || ''
  const cut = text.slice(0, maxLen)
  const last = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf(' '))
  if (last > maxLen * 0.5) return cut.slice(0, last + 1)
  return cut.trim() + '…'
}

// Parse docPages from navigation.ts: path, title, section
function parseDocPages(navContent) {
  const block = navContent.match(/export const docPages: DocPage\[\] = \[([\s\S]*?)\n\]/)?.[1]
  if (!block) return []
  const re = /\{\s*path:\s*'([^']+)',\s*mdFile:\s*'[^']+',\s*title:\s*'([^']+)',\s*section:\s*'([^']+)'\s*\}/g
  const pages = []
  for (const m of block.matchAll(re)) {
    pages.push({ path: m[1], title: m[2], section: m[3] })
  }
  return pages
}

const mdPath = path.join(__dirname, '../public/data/md-content.json')
const glossaryPath = path.join(__dirname, '../public/data/glossary.json')
const navPath = path.join(__dirname, '../app/utils/navigation.ts')
const outPath = path.join(__dirname, '../public/data/search-index.json')

const mdContent = JSON.parse(fs.readFileSync(mdPath, 'utf-8'))
const glossary = JSON.parse(fs.readFileSync(glossaryPath, 'utf-8'))
const navContent = fs.readFileSync(navPath, 'utf-8')
const docPages = parseDocPages(navContent)

// Optional keywords per page or glossary term: alternative spellings, synonyms, and terms
// that may not appear in the body (e.g. "sha256" when the text uses "SHA-256"). Add more
// path → keywords or slug → keywords as needed.
const pathKeywords = {
  '/docs/bitcoin/cryptography': ['sha256', 'sha-256'],
}
const slugKeywords = {
  'sha-256': ['sha256'],
}

function addEntry(entry) {
  const out = { path: entry.path, title: entry.title, section: entry.section, body: entry.body }
  if (entry.keywords?.length) out.keywords = entry.keywords
  return out
}

const index = []

// 1. Static pages first so /whitepaper etc. are found before doc pages that merely mention the term
const staticPages = [
  {
    path: '/whitepaper',
    title: 'Bitcoin Whitepaper',
    section: 'whitepaper',
    body:
      'Bitcoin Whitepaper. Satoshi Nakamoto announced the whitepaper on the cryptography mailing list on October 31, 2008. The Bitcoin network launched on January 3, 2009, when Satoshi mined the Genesis Block. Open the Bitcoin whitepaper PDF. Related: Problems Bitcoin Solved, The Blockchain, Proof of Work, Consensus, Satoshi Nakamoto, Cypherpunk Philosophy.',
    keywords: ['whitepaper'],
  },
  {
    path: '/terminal',
    title: 'CLI Terminal',
    section: 'terminal',
    body:
      'Bitcoin CLI Terminal. Run Bitcoin RPC commands in the browser. getblockchaininfo, getblockcount, getblock, getblockhash, getrawtransaction, getmempoolinfo, getnetworkinfo, help. Connected to a public Bitcoin node. No node setup required.',
    keywords: ['rpc', 'cli', 'terminal', 'bitcoin core', 'getblock', 'getblockchaininfo'],
  },
  {
    path: '/stack-lab',
    title: 'Stack Lab',
    section: 'stack-lab',
    body:
      'Stack Lab. Interactive Bitcoin Script playground. Build and execute locking and unlocking scripts. Drag and drop OP codes. Learn Bitcoin Script, P2PKH, multisig, hash locks. Script interpreter, stack visualization.',
    keywords: ['script', 'op codes', 'opcode', 'stack', 'script builder', 'interpreter'],
  },
  {
    path: '/author',
    title: 'About B++',
    section: 'author',
    body:
      'About B++. Existenziell. Developer and Bitcoin Educator. Why B++. Bitcoin education. Open source. Free. No ads. No paywalls. Support. Donate. Bitcoin address. Nostr.',
    keywords: ['about', 'existenziell', 'author', 'support', 'donate'],
  },
]
for (const p of staticPages) {
  index.push(addEntry(p))
}

// 2. Doc pages
for (const page of docPages) {
  const raw = mdContent[page.path]?.content
  const body = raw ? excerpt(stripMarkdown(raw), 500) : ''
  index.push(
    addEntry({
      path: page.path,
      title: page.title,
      section: page.section,
      body: body || page.title,
      keywords: pathKeywords[page.path],
    })
  )
}

// 3. Glossary
for (const [slug, { term, definition }] of Object.entries(glossary)) {
  index.push(
    addEntry({
      path: `/docs/glossary#${slug}`,
      title: term,
      section: 'glossary',
      body: definition || term,
      keywords: slugKeywords[slug],
    })
  )
}

fs.mkdirSync(path.dirname(outPath), { recursive: true })
fs.writeFileSync(outPath, JSON.stringify(index, null, 2))

console.log(`✓ Generated search index with ${index.length} entries`)
console.log(`  Output: public/data/search-index.json`)
