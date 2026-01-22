#!/usr/bin/env node

/**
 * Analyzes the internal link structure of the documentation site.
 * 
 * This script:
 * - Extracts all links from markdown files
 * - Categorizes links (internal, glossary, anchor, external)
 * - Maps internal links to actual pages
 * - Finds broken links
 * - Finds orphaned pages (pages with no incoming links)
 * - Generates statistics and a report
 */

const fs = require('fs');
const path = require('path');

// Import navigation data
const navigationPath = path.join(__dirname, '../app/utils/navigation.ts');
const navigationContent = fs.readFileSync(navigationPath, 'utf-8');

// Extract docPages from navigation.ts - find the array content
const arrayStart = navigationContent.indexOf('export const docPages: DocPage[] = [');
if (arrayStart === -1) {
  console.error('Could not find docPages array in navigation.ts');
  process.exit(1);
}

// Find the matching closing bracket
let bracketCount = 0;
let arrayEnd = arrayStart;
for (let i = arrayStart + 'export const docPages: DocPage[] = ['.length; i < navigationContent.length; i++) {
  if (navigationContent[i] === '[') bracketCount++;
  if (navigationContent[i] === ']') {
        if (bracketCount === 0) {
      arrayEnd = i;
      break;
    }
    bracketCount--;
  }
}

const arrayContent = navigationContent.substring(
  arrayStart + 'export const docPages: DocPage[] = ['.length,
  arrayEnd
);

// Parse docPages entries - each entry is { path: '...', mdFile: '...', title: '...', section: '...' }
const docPages = [];
const entryRegex = /\{\s*path:\s*'([^']+)',\s*mdFile:\s*'([^']+)',\s*title:\s*'([^']+)',\s*section:\s*'([^']+)'\s*\}/g;

let match;
while ((match = entryRegex.exec(arrayContent)) !== null) {
  docPages.push({
    path: match[1],
    mdFile: match[2],
    title: match[3],
    section: match[4],
  });
}

// Create maps for quick lookup
const pathToPage = new Map();
const mdFileToPage = new Map();
docPages.forEach(page => {
  pathToPage.set(page.path, page);
  mdFileToPage.set(page.mdFile, page);
});

// Find all markdown files
const docsDir = path.join(__dirname, '../app/docs');
const markdownFiles = [];

function findMarkdownFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      findMarkdownFiles(fullPath);
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      markdownFiles.push(fullPath);
    }
  }
}

findMarkdownFiles(docsDir);

// Link extraction regex
const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;

// Analyze each markdown file
const linkData = {
  files: new Map(),
  allLinks: [],
  brokenLinks: [],
  internalLinks: new Map(), // path -> Set of pages that link to it
  glossaryLinks: new Set(),
  anchorLinks: new Set(),
  externalLinks: new Set(),
};

markdownFiles.forEach(filePath => {
  const content = fs.readFileSync(filePath, 'utf-8');
  const relativePath = path.relative(path.join(__dirname, '../app/docs'), filePath);
  
  // Find the page this file belongs to
  const page = Array.from(mdFileToPage.values()).find(
    p => p.mdFile === `app/docs/${relativePath.replace(/\\/g, '/')}`
  );
  
  if (!page) {
    console.warn(`No page found for file: ${filePath}`);
    return;
  }
  
  const links = [];
  let match;
  
  while ((match = linkRegex.exec(content)) !== null) {
    const [, linkText, linkUrl] = match;
    const link = {
      text: linkText,
      url: linkUrl,
      sourceFile: filePath,
      sourcePage: page.path,
    };
    
    links.push(link);
    linkData.allLinks.push(link);
    
    // Categorize the link
    if (linkUrl.startsWith('/docs/glossary#')) {
      linkData.glossaryLinks.add(linkUrl);
    } else if (linkUrl.startsWith('/docs/')) {
      // Internal doc link
      const targetPath = linkUrl.split('#')[0]; // Remove anchor
      if (!linkData.internalLinks.has(targetPath)) {
        linkData.internalLinks.set(targetPath, new Set());
      }
      linkData.internalLinks.get(targetPath).add(page.path);
    } else if (linkUrl.startsWith('#')) {
      linkData.anchorLinks.add(linkUrl);
    } else if (linkUrl.startsWith('http://') || linkUrl.startsWith('https://')) {
      linkData.externalLinks.add(linkUrl);
    }
  }
  
  linkData.files.set(page.path, {
    page,
    filePath,
    links,
  });
});

// Find broken links
linkData.allLinks.forEach(link => {
  if (link.url.startsWith('/docs/')) {
    const targetPath = link.url.split('#')[0];
    if (!pathToPage.has(targetPath)) {
      linkData.brokenLinks.push({
        ...link,
        reason: 'Page not found',
      });
    }
  }
});

// Find orphaned pages (pages with no incoming links except from overview pages)
const orphanedPages = [];
docPages.forEach(page => {
  // Skip overview pages
  if (page.path.endsWith('/overview') || page.path === '/docs/glossary') {
    return;
  }
  
  const incomingLinks = linkData.internalLinks.get(page.path);
  if (!incomingLinks || incomingLinks.size === 0) {
    orphanedPages.push(page);
  }
});

// Find most linked pages
const mostLinked = Array.from(linkData.internalLinks.entries())
  .map(([path, sources]) => ({
    path,
    count: sources.size,
    sources: Array.from(sources),
  }))
  .sort((a, b) => b.count - a.count);

// Find pages with most outgoing links
const mostOutgoing = Array.from(linkData.files.entries())
  .map(([path, data]) => ({
    path,
    count: data.links.filter(l => l.url.startsWith('/docs/')).length,
    page: data.page,
  }))
  .sort((a, b) => b.count - a.count);

// Generate report
console.log('='.repeat(80));
console.log('INTERNAL LINK STRUCTURE ANALYSIS');
console.log('='.repeat(80));
console.log();

console.log('📊 STATISTICS');
console.log('-'.repeat(80));
console.log(`Total pages: ${docPages.length}`);
console.log(`Total markdown files: ${markdownFiles.length}`);
console.log(`Total links found: ${linkData.allLinks.length}`);
console.log(`  - Internal doc links: ${Array.from(linkData.internalLinks.keys()).length} unique targets`);
console.log(`  - Glossary links: ${linkData.glossaryLinks.size} unique`);
console.log(`  - Anchor links: ${linkData.anchorLinks.size} unique`);
console.log(`  - External links: ${linkData.externalLinks.size} unique`);
console.log();

if (linkData.brokenLinks.length > 0) {
  console.log('❌ BROKEN LINKS');
  console.log('-'.repeat(80));
  const brokenByPage = new Map();
  linkData.brokenLinks.forEach(link => {
    if (!brokenByPage.has(link.sourcePage)) {
      brokenByPage.set(link.sourcePage, []);
    }
    brokenByPage.get(link.sourcePage).push(link);
  });
  
  brokenByPage.forEach((links, page) => {
    console.log(`\n${page}:`);
    links.forEach(link => {
      console.log(`  - [${link.text}](${link.url})`);
    });
  });
  console.log();
}

if (orphanedPages.length > 0) {
  console.log('🔗 ORPHANED PAGES (no incoming links)');
  console.log('-'.repeat(80));
  orphanedPages.forEach(page => {
    console.log(`  - ${page.path} (${page.title})`);
  });
  console.log();
}

console.log('⭐ MOST LINKED PAGES (top 15)');
console.log('-'.repeat(80));
mostLinked.slice(0, 15).forEach((item, index) => {
  const page = pathToPage.get(item.path);
  console.log(`${(index + 1).toString().padStart(2)}. ${item.path} (${item.count} incoming links)`);
  if (page) {
    console.log(`    Title: ${page.title}`);
  }
});
console.log();

console.log('📤 PAGES WITH MOST OUTGOING LINKS (top 15)');
console.log('-'.repeat(80));
mostOutgoing.slice(0, 15).forEach((item, index) => {
  console.log(`${(index + 1).toString().padStart(2)}. ${item.path} (${item.count} outgoing links)`);
  console.log(`    Title: ${item.page.title}`);
});
console.log();

// Section analysis
console.log('📁 LINKS BY SECTION');
console.log('-'.repeat(80));
const sectionStats = new Map();
docPages.forEach(page => {
  if (!sectionStats.has(page.section)) {
    sectionStats.set(page.section, {
      pages: 0,
      incomingLinks: 0,
      outgoingLinks: 0,
    });
  }
  const stats = sectionStats.get(page.section);
  stats.pages++;
  
  const fileData = linkData.files.get(page.path);
  if (fileData) {
    stats.outgoingLinks += fileData.links.filter(l => l.url.startsWith('/docs/')).length;
  }
  
  const incoming = linkData.internalLinks.get(page.path);
  if (incoming) {
    stats.incomingLinks += incoming.size;
  }
});

Array.from(sectionStats.entries())
  .sort((a, b) => b[1].pages - a[1].pages)
  .forEach(([section, stats]) => {
    console.log(`${section}:`);
    console.log(`  Pages: ${stats.pages}`);
    console.log(`  Total incoming links: ${stats.incomingLinks}`);
    console.log(`  Total outgoing links: ${stats.outgoingLinks}`);
    console.log(`  Avg incoming per page: ${(stats.incomingLinks / stats.pages).toFixed(1)}`);
    console.log(`  Avg outgoing per page: ${(stats.outgoingLinks / stats.pages).toFixed(1)}`);
    console.log();
  });

// Cross-section link analysis
console.log('🔀 CROSS-SECTION LINKING');
console.log('-'.repeat(80));
const crossSectionLinks = new Map();
linkData.allLinks.forEach(link => {
  if (link.url.startsWith('/docs/')) {
    const targetPath = link.url.split('#')[0];
    const targetPage = pathToPage.get(targetPath);
    const sourcePage = pathToPage.get(link.sourcePage);
    
    if (targetPage && sourcePage && targetPage.section !== sourcePage.section) {
      const key = `${sourcePage.section} → ${targetPage.section}`;
      if (!crossSectionLinks.has(key)) {
        crossSectionLinks.set(key, 0);
      }
      crossSectionLinks.set(key, crossSectionLinks.get(key) + 1);
    }
  }
});

Array.from(crossSectionLinks.entries())
  .sort((a, b) => b[1] - a[1])
  .forEach(([key, count]) => {
    console.log(`${key}: ${count} links`);
  });
console.log();

// Generate JSON output for further analysis
const output = {
  statistics: {
    totalPages: docPages.length,
    totalLinks: linkData.allLinks.length,
    internalLinks: Array.from(linkData.internalLinks.keys()).length,
    glossaryLinks: linkData.glossaryLinks.size,
    anchorLinks: linkData.anchorLinks.size,
    externalLinks: linkData.externalLinks.size,
    brokenLinks: linkData.brokenLinks.length,
    orphanedPages: orphanedPages.length,
  },
  brokenLinks: linkData.brokenLinks.map(link => ({
    sourcePage: link.sourcePage,
    sourceFile: link.sourceFile,
    linkText: link.text,
    linkUrl: link.url,
    reason: link.reason,
  })),
  orphanedPages: orphanedPages.map(page => ({
    path: page.path,
    title: page.title,
    section: page.section,
  })),
  mostLinked: mostLinked.slice(0, 20).map(item => ({
    path: item.path,
    count: item.count,
    title: pathToPage.get(item.path)?.title,
  })),
  mostOutgoing: mostOutgoing.slice(0, 20).map(item => ({
    path: item.path,
    count: item.count,
    title: item.page.title,
  })),
  sectionStats: Object.fromEntries(
    Array.from(sectionStats.entries()).map(([section, stats]) => [
      section,
      {
        pages: stats.pages,
        incomingLinks: stats.incomingLinks,
        outgoingLinks: stats.outgoingLinks,
      },
    ])
  ),
  crossSectionLinks: Object.fromEntries(crossSectionLinks),
};

const outputPath = path.join(__dirname, '../link-analysis.json');
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
console.log(`\n📄 Detailed JSON report saved to: ${outputPath}`);
