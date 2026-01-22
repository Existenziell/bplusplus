/**
 * Script to remove glossary links for generic terms
 * Removes links like [transaction](/docs/glossary#transaction) -> transaction
 */

const fs = require('fs')
const path = require('path')

// Generic terms to remove links for
const genericTerms = [
  'transaction',
  'block',
  'node',
  'miner',
  'mining',
  'blockchain',
  'hash'
]

// Pattern to match: [term](/docs/glossary#term)
function removeGenericGlossaryLinks(content) {
  let modified = content
  
  for (const term of genericTerms) {
    // Match [term](/docs/glossary#term) - case insensitive for the link text
    // This will match [transaction], [Transaction], [TRANSACTION], etc.
    const pattern = new RegExp(`\\[([^\\]]+)\\]\\(/docs/glossary#${term}\\)`, 'gi')
    
    modified = modified.replace(pattern, (match, linkText) => {
      // Return just the text that was in the brackets
      return linkText
    })
  }
  
  return modified
}

// Process all markdown files
function processMarkdownFiles() {
  const docsDir = path.join(__dirname, '../app/docs')
  let totalFiles = 0
  let modifiedFiles = 0
  let totalRemovals = 0

  function processFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8')
    const originalContent = content
    const modified = removeGenericGlossaryLinks(content)
    
    if (originalContent !== modified) {
      fs.writeFileSync(filePath, modified, 'utf-8')
      modifiedFiles++
      
      // Count removals
      const originalLinks = (originalContent.match(/\/docs\/glossary#(transaction|block|node|miner|mining|blockchain|hash)/gi) || []).length
      const remainingLinks = (modified.match(/\/docs\/glossary#(transaction|block|node|miner|mining|blockchain|hash)/gi) || []).length
      const removals = originalLinks - remainingLinks
      totalRemovals += removals
      
      console.log(`✓ ${path.relative(docsDir, filePath)} (removed ${removals} links)`)
    }
  }

  function walkDir(dir) {
    const files = fs.readdirSync(dir)
    
    for (const file of files) {
      const filePath = path.join(dir, file)
      const stat = fs.statSync(filePath)
      
      if (stat.isDirectory()) {
        walkDir(filePath)
      } else if (file.endsWith('.md')) {
        totalFiles++
        processFile(filePath)
      }
    }
  }

  walkDir(docsDir)
  
  console.log(`\nProcessed ${totalFiles} files`)
  console.log(`Modified ${modifiedFiles} files`)
  console.log(`Removed ${totalRemovals} generic glossary links`)
}

processMarkdownFiles()
