#!/usr/bin/env node
/**
 * Check markdown files for:
 * 1. Glossary links: all /docs/glossary#slug links have matching entries in glossary.json
 * 2. Internal links: all /docs/* links (excluding glossary) point to valid pages
 * 3. External links: optionally check that external URLs are accessible (use --check-external)
 *
 * Note: Unused imports are typically handled by ESLint with eslint-plugin-import.
 * Run `npm run lint` to check for unused imports in TypeScript/JavaScript files.
 *
 * Run: node scripts/check-links.js [--check-external]
 */

const fs = require('fs')
const path = require('path')
const http = require('http')
const https = require('https')
const { URL } = require('url')
const { parseDocPages } = require('./lib/parse-doc-pages')

// Parse command line arguments
const checkExternal = process.argv.includes('--check-external')

// Load glossary
const glossaryPath = path.join(__dirname, '../public/data/glossary.json')
const glossary = JSON.parse(fs.readFileSync(glossaryPath, 'utf-8'))
const glossarySlugs = new Set(Object.keys(glossary))

// Load valid doc pages from navigation.ts
const navigationPath = path.join(__dirname, '../app/utils/navigation.ts')
const navigationContent = fs.readFileSync(navigationPath, 'utf-8')
const docPages = parseDocPages(navigationContent)
const validDocPaths = new Set(docPages.map(p => p.path))

// Also check md-content.json if it exists (for build-time validation)
let mdContentPaths = new Set()
try {
  const mdContentPath = path.join(__dirname, '../public/data/md-content.json')
  if (fs.existsSync(mdContentPath)) {
    const mdContent = JSON.parse(fs.readFileSync(mdContentPath, 'utf-8'))
    mdContentPaths = new Set(Object.keys(mdContent))
  }
} catch (err) {
  // md-content.json might not exist, that's okay
}

// Combine valid paths (navigation.ts is source of truth, md-content.json is fallback)
const allValidPaths = new Set([...validDocPaths, ...mdContentPaths])

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

// Check glossary links
const glossaryRe = /\]\(\/docs\/glossary#([a-z0-9-]+)\)/g
const glossaryUsed = new Map() // slug -> [ { file, lineNum, line } ]

// Check internal doc links (excluding glossary links)
const internalLinkRe = /\]\((\/docs\/[^#\s)]+)(?:#[^\s)]+)?\)/g
const internalLinks = new Map() // path -> [ { file, lineNum, line, fullLink } ]

// Check external links (http/https)
const externalLinkRe = /\]\((https?:\/\/[^\s)]+)\)/g
const externalLinks = new Map() // url -> [ { file, lineNum, line, fullLink } ]

for (const file of mdFiles) {
  const content = fs.readFileSync(file, 'utf-8')
  const lines = content.split('\n')
  for (let i = 0; i < lines.length; i++) {
    // Check glossary links
    let m
    glossaryRe.lastIndex = 0
    while ((m = glossaryRe.exec(lines[i])) !== null) {
      const slug = m[1]
      if (!glossaryUsed.has(slug)) glossaryUsed.set(slug, [])
      glossaryUsed.get(slug).push({ file, lineNum: i + 1, line: lines[i].trim() })
    }

    // Check internal doc links (excluding glossary)
    internalLinkRe.lastIndex = 0
    while ((m = internalLinkRe.exec(lines[i])) !== null) {
      const linkPath = m[1]
      // Skip glossary links (already checked above)
      if (linkPath === '/docs/glossary') continue
      
      if (!internalLinks.has(linkPath)) internalLinks.set(linkPath, [])
      internalLinks.get(linkPath).push({
        file,
        lineNum: i + 1,
        line: lines[i].trim(),
        fullLink: m[0]
      })
    }

    // Check external links
    externalLinkRe.lastIndex = 0
    while ((m = externalLinkRe.exec(lines[i])) !== null) {
      const url = m[1]
      if (!externalLinks.has(url)) externalLinks.set(url, [])
      externalLinks.get(url).push({
        file,
        lineNum: i + 1,
        line: lines[i].trim(),
        fullLink: m[0]
      })
    }
  }
}

// Function to check if an external URL is accessible
async function checkExternalUrl(url, timeout = 10000, maxRedirects = 5) {
  return new Promise((resolve) => {
    let redirectCount = 0
    let triedHead = false
    const checkUrl = (currentUrl, useGet = false) => {
      try {
        const parsed = new URL(currentUrl)
        const isHttps = parsed.protocol === 'https:'
        const client = isHttps ? https : http
        
        const options = {
          hostname: parsed.hostname,
          port: parsed.port || (isHttps ? 443 : 80),
          path: parsed.pathname + parsed.search,
          method: useGet ? 'GET' : 'HEAD', // Try HEAD first, fallback to GET
          timeout,
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; LinkChecker/1.0)'
          }
        }

        const req = client.request(options, (res) => {
          // Follow redirects
          if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location && redirectCount < maxRedirects) {
            redirectCount++
            const redirectUrl = res.headers.location.startsWith('http')
              ? res.headers.location
              : `${parsed.protocol}//${parsed.host}${res.headers.location}`
            req.destroy()
            checkUrl(redirectUrl, useGet)
            return
          }

          // If HEAD returns 404, try GET as fallback (some sites don't support HEAD)
          if (!useGet && !triedHead && res.statusCode === 404) {
            triedHead = true
            req.destroy()
            checkUrl(currentUrl, true)
            return
          }

          // Consider 2xx and 3xx as success
          const isSuccess = res.statusCode >= 200 && res.statusCode < 400
          if (useGet) {
            // For GET requests, just check status and abort immediately
            res.destroy()
          } else {
            req.destroy()
          }
          resolve({ success: isSuccess, statusCode: res.statusCode, url: currentUrl })
        })

        req.on('error', (err) => {
          // If HEAD failed and we haven't tried GET yet, try GET
          if (!useGet && !triedHead) {
            triedHead = true
            checkUrl(currentUrl, true)
            return
          }
          resolve({ success: false, error: err.message, url: currentUrl })
        })

        req.on('timeout', () => {
          req.destroy()
          // If HEAD timed out and we haven't tried GET yet, try GET
          if (!useGet && !triedHead) {
            triedHead = true
            checkUrl(currentUrl, true)
            return
          }
          resolve({ success: false, error: 'Timeout', url: currentUrl })
        })

        req.end()
      } catch (err) {
        resolve({ success: false, error: err.message, url: currentUrl })
      }
    }

    checkUrl(url)
  })
}

// Main function to run checks
async function runChecks() {
  // Check for missing glossary terms
  const missingGlossary = [...glossaryUsed.keys()].filter(s => !glossarySlugs.has(s))

  // Check for invalid internal links
  const invalidInternalLinks = [...internalLinks.keys()].filter(p => !allValidPaths.has(p))

  let hasErrors = false

  // Check external links if requested
  let brokenExternalLinks = []
  if (checkExternal && externalLinks.size > 0) {
    console.log(`Checking ${externalLinks.size} external link(s)...`)
    const uniqueUrls = [...externalLinks.keys()]
    
    // Check URLs with a small delay between each to be respectful
    for (let i = 0; i < uniqueUrls.length; i++) {
      const url = uniqueUrls[i]
      const result = await checkExternalUrl(url)
      if (!result.success) {
        brokenExternalLinks.push({ url, result, occurrences: externalLinks.get(url) })
      }
      // Small delay between checks (except for the last one)
      if (i < uniqueUrls.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 100))
      }
    }
  }

  // Report glossary link errors
  if (missingGlossary.length > 0) {
    hasErrors = true
    console.error('ERROR: Glossary links that have no matching term (tooltips will fall back to plain link):\n')
    for (const slug of missingGlossary.sort()) {
      const occurrences = glossaryUsed.get(slug)
      for (const { file, lineNum } of occurrences) {
        console.error(`  /docs/glossary#${slug}`)
        console.error(`    -> ${path.relative(process.cwd(), file)}:${lineNum}`)
      }
      console.error('')
    }
  }

  // Report internal link errors
  if (invalidInternalLinks.length > 0) {
    hasErrors = true
    console.error('ERROR: Internal links that point to non-existent pages:\n')
    for (const linkPath of invalidInternalLinks.sort()) {
      const occurrences = internalLinks.get(linkPath)
      for (const { file, lineNum, fullLink } of occurrences) {
        console.error(`  ${linkPath}`)
        console.error(`    -> ${path.relative(process.cwd(), file)}:${lineNum}`)
        console.error(`    Link: ${fullLink}`)
      }
      console.error('')
    }
  }

  // Report external link errors
  if (brokenExternalLinks.length > 0) {
    hasErrors = true
    console.error('ERROR: External links that are not accessible:\n')
    for (const { url, result, occurrences } of brokenExternalLinks.sort((a, b) => a.url.localeCompare(b.url))) {
      for (const { file, lineNum, fullLink } of occurrences) {
        console.error(`  ${url}`)
        console.error(`    -> ${path.relative(process.cwd(), file)}:${lineNum}`)
        console.error(`    Link: ${fullLink}`)
        if (result.statusCode) {
          console.error(`    Status: ${result.statusCode}`)
        } else if (result.error) {
          console.error(`    Error: ${result.error}`)
        }
      }
      console.error('')
    }
  }

  if (hasErrors) {
    process.exit(1)
  }

  // Success messages
  const messages = []
  if (glossaryUsed.size > 0) {
    messages.push(`✓ All ${glossaryUsed.size} glossary link(s) have matching terms`)
  }
  if (internalLinks.size > 0) {
    messages.push(`✓ All ${internalLinks.size} internal link(s) point to valid pages`)
  }
  if (checkExternal && externalLinks.size > 0) {
    messages.push(`✓ All ${externalLinks.size} external link(s) are accessible`)
  }

  if (messages.length > 0) {
    console.log('OK: ' + messages.join(', '))
  } else {
    console.log('OK: No links found to check')
  }
  process.exit(0)
}

// Run the checks
runChecks().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
