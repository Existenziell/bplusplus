#!/usr/bin/env node
/**
 * Fetch block-history from the public blob URL and display the results.
 * Override the URL with BLOCK_HISTORY_BLOB_URL in .env.local or the environment.
 *
 * Usage:
 *   ./scripts/get-block-history.js
 *   node scripts/get-block-history.js
 */

const fs = require('fs')
const path = require('path')

const DEFAULT_BLOB_URL =
  'https://kcngrjtrvo3le55z.public.blob.vercel-storage.com/block-history.json'

function loadEnvLocal() {
  const envPath = path.join(__dirname, '..', '.env.local')
  if (!fs.existsSync(envPath)) return
  const content = fs.readFileSync(envPath, 'utf-8')
  for (const line of content.split('\n')) {
    const trimmed = line.trim()
    if (trimmed && !trimmed.startsWith('#')) {
      const eq = trimmed.indexOf('=')
      if (eq > 0) {
        const key = trimmed.slice(0, eq).trim()
        const value = trimmed.slice(eq + 1).trim()
        if (key && value) process.env[key] = value
      }
    }
  }
}

async function main() {
  loadEnvLocal()

  if (process.argv.includes('--help') || process.argv.includes('-h')) {
    console.log('Usage: node scripts/get-block-history.js')
    console.log('  Fetches block-history from the public blob URL and prints the JSON.')
    console.log('  Override URL with BLOCK_HISTORY_BLOB_URL in .env.local or env.')
    return
  }

  const url = process.env.BLOCK_HISTORY_BLOB_URL?.trim() || DEFAULT_BLOB_URL
  const res = await fetch(url, { cache: 'no-store' })
  if (!res.ok) throw new Error(`Fetch failed: ${res.status} ${url}`)
  const data = await res.json()
  const blocks = Array.isArray(data) ? data : data?.blocks ?? null
  if (!blocks || blocks.length === 0) {
    console.log('No block data.')
    return
  }
  console.log(`Block history: ${blocks.length} block(s)\n`)
  console.log(JSON.stringify(blocks, null, 2))
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
