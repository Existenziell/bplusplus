/**
 * Build script to generate a search index from md-content, glossary, and docPages.
 * Run after generate-md-content and generate-glossary-data in prebuild.
 *
 * Run with: node scripts/generate-search-index.js
 */

const fs = require('fs')
const path = require('path')
const { parseDocPages } = require('./lib/parse-doc-pages')
const { excerpt, parsePeopleSections, stripMarkdown } = require('./lib/search-index-helpers')

const mdPath = path.join(__dirname, '../public/data/md-content.json')
const glossaryPath = path.join(__dirname, '../public/data/glossary.json')
const navPath = path.join(__dirname, '../app/utils/navigation.ts')
const outPath = path.join(__dirname, '../public/data/search-index.json')

const mdContent = JSON.parse(fs.readFileSync(mdPath, 'utf-8'))
const glossary = JSON.parse(fs.readFileSync(glossaryPath, 'utf-8'))
const navContent = fs.readFileSync(navPath, 'utf-8')
const docPages = parseDocPages(navContent) // [{ path, mdFile, title, section }]

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

// Static first so /whitepaper ranks before mentioning docs
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
      'About B++. Existenziell. Developer and Bitcoin Enthusiast. Why B++. Bitcoin education. Open source. Free. No ads. No paywalls. Support. Donate. Bitcoin address. Nostr.',
    keywords: ['about', 'existenziell', 'author', 'support', 'donate'],
  },
]
for (const p of staticPages) {
  index.push(addEntry(p))
}

const peopleContent = mdContent['/docs/history/people']?.content
for (const { slug, title, body } of parsePeopleSections(peopleContent)) {
  index.push(addEntry({ path: `/docs/history/people#${slug}`, title, section: 'history', body }))
}

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
