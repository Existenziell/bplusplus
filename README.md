# B++

Bitcoin Education without borders! Open knowledge. Open source.

An open-source developer's guide to Bitcoin, covering everything from fundamental concepts to advanced protocol implementations. Built with Love and designed to be always free and open source.

## Tech Stack

- **Framework**: Next.js 16.1.4 (App Router, Turbopack)
- **React**: React 19.2.3
- **Styling**: Tailwind CSS 3.4.19
- **Markdown**: react-markdown with remark-gfm, rehype-highlight, rehype-raw
- **Theming**: next-themes
- **Language**: TypeScript 5.9.3
- **Testing**: Vitest 2.1

## Documentation Structure

All documentation pages are handled by a single dynamic route (`app/docs/[...slug]/page.tsx`) that:
- Maps URL paths to markdown files using `app/utils/navigation.ts`
- Automatically generates metadata for SEO
- Eliminates code duplication (replaced 67 duplicate page files)

Each documentation section follows a consistent pattern:
- `overview.md` - Section introduction and navigation
- `[topic]/[topic].md` - Markdown content (no page.tsx needed)

The routing is configured in `app/utils/navigation.ts`, which serves as the single source of truth for all documentation paths and metadata.

## Getting Started

### Prerequisites

- Node.js 20.9+ (required for Next.js 16)
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/Existenziell/bplusplus.git
cd bplusplus

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build

```bash
npm run build
npm run start
```

The build process runs prebuild scripts (see [Prebuild scripts](#prebuild-scripts)) before `next build` to generate `public/data/*.json` used by the download API, glossary tooltips, and search.

## How Stack Lab Works

Stack Lab simulates Bitcoin Script execution, which is how Bitcoin transactions are validated on the blockchain.

### Script Components

- **Locking Script (scriptPubKey)**: Defines the conditions that must be met to unlock and spend the Bitcoin. This script is stored in the transaction output and specifies what data or operations are required.

- **Unlocking Script (scriptSig)**: Provides the data and operations necessary to satisfy the locking script's conditions. This script is included in the transaction input when spending Bitcoin.

### Execution Flow

1. The unlocking script runs first, pushing data (signatures, public keys, etc.) onto the stack
2. The locking script runs second, verifying that the data satisfies the conditions
3. If the final stack contains a non-zero value (typically `1`), the transaction is valid

This is the same validation process that occurs on the Bitcoin network when transactions are processed.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production (runs prebuild scripts, then `next build`) |
| `npm run start` | Start production server |
| `npm run test` | Run tests in watch mode (Vitest) |
| `npm run test:run` | Run tests once (for CI) |
| `npm run test:coverage` | Run tests with coverage report (v8) |
| `npm run lint` | Run ESLint |
| `npm run analyze` | Analyze bundle size |

### Testing

Tests use [Vitest](https://vitest.dev) and live in **`tests/`** with a mirrored layout:

```
tests/
  app/utils/     # setUtils, metadata, denominationUtils, formatting, navigation, searchLogic,
                # stackLabFormatters, stackLabInterpreter, bitcoinRpcCache, docNavigationState, getMarkdownForPath
  scripts/lib/   # slug, parse-doc-pages, glossary-parse, search-index-helpers
```

Covered: build pipeline (`parseDocPages`, `generateSlug`, `glossary-parse`, `search-index-helpers`), Stack Lab interpreter and formatters, denomination/formatting utils, search logic, navigation and doc navigation state, Bitcoin RPC validation/cache, download-MD path resolution, and metadata for SEO/OG. Run `npm run test:run` to execute all tests. In CI, run `npm run test:run` before `npm run build` so the pipeline fails if tests fail.

### Prebuild scripts

These run automatically in order when you `npm run build` (via the `prebuild` script):

| Script | Input | Output | Purpose |
|--------|-------|--------|---------|
| `generate-md-content.js` | `app/utils/navigation.ts`, `app/docs/**/*.md` | `public/data/md-content.json` | Bundles all doc markdown as `path → { content, filename }` for the download-MD API |
| `generate-glossary-data.js` | `app/docs/glossary/terms.md` | `public/data/glossary.json` | Parses `### Term` blocks into `{ slug: { term, definition } }` for glossary tooltips |
| `generate-search-index.js` | `md-content.json`, `glossary.json`, `navigation.ts` | `public/data/search-index.json` | Builds search index: doc excerpts, glossary terms, static pages (e.g. /whitepaper, /terminal), with optional `keywords`; used by `/api/search` |

#### When: prebuild vs build vs runtime

```
prebuild (npm run build → prebuild)
├── generate-md-content.js
├── generate-glossary-data.js
└── generate-search-index.js

Next.js build (after prebuild)
├── Static pages: docs/[...slug] (from md-content.json), docs/glossary (readMarkdown(terms.md))
├── Root layout: imports glossary.json, inlines to window.__GLOSSARY_DATA__
└── API routes: bundle import of md-content.json, search-index.json

Runtime (browser / server on demand)
├── /api/download-md?path=… → reads md-content.json (in-memory)
├── /api/search?q=…        → reads search-index.json (in-memory)
├── GlossaryContext       → reads window.__GLOSSARY_DATA__ (from layout)
└── docs/[...slug]        → reads md-content.json (same as /api/download-md)
```

#### Prebuild in words

| Script | Reads | Parses / uses | Writes |
|--------|-------|----------------|--------|
| **generate-md-content** | `navigation.ts` | `parseDocPages` → `{ path, mdFile, title, section }`; for each `mdFile` reads `.md` from disk | `public/data/md-content.json` → `{ [path]: { content, filename } }` |
| **generate-glossary-data** | `app/docs/glossary/terms.md` | `parseGlossary` (### Term, definition lines); `generateSlug(term)`; `stripMarkdown`, `truncateDefinition` | `public/data/glossary.json` → `{ [slug]: { term, definition } }` |
| **generate-search-index** | `md-content.json`, `glossary.json`, `navigation.ts` | `parseDocPages`; `generateSlug` (for people); `stripMarkdown`, `excerpt`; merges staticPages + people from `/docs/history/people` + docPages + glossary | `public/data/search-index.json` → `[{ path, title, section, body, keywords? }]` |

Shared:

- **parse-doc-pages.js**: regex over `navigation.ts` → `[{ path, mdFile, title, section }]`. Used by **generate-md-content** and **generate-search-index**.
- **slug.js**: `generateSlug(text)`. Used by **generate-glossary-data** and **generate-search-index** (people sections).
- **glossary-parse.js**: `stripMarkdown`, `truncateDefinition`, `parseGlossary(termsMd)`. Used by **generate-glossary-data**.
- **search-index-helpers.js**: `excerpt`, `parsePeopleSections(md)`, `stripMarkdown`. Used by **generate-search-index**.

You can run them manually (e.g. to refresh data without a full build):

```bash
node scripts/generate-md-content.js
node scripts/generate-glossary-data.js
node scripts/generate-search-index.js   # must run after the two above
```

### 6. Quick reference

| Artifact | Created by | Consumed by |
|----------|------------|-------------|
| **md-content.json** | generate-md-content | /api/download-md, **docs/[...slug]** |
| **glossary.json** | generate-glossary-data | layout (→ window), GlossaryContext |
| **search-index.json** | generate-search-index | /api/search |
| **navigation.ts** | (source) | generate-md-content, generate-search-index, docs/[...slug], docs/glossary, nav components |
| **terms.md** | (source) | generate-glossary-data, docs/glossary (readMarkdown) |
| **app/docs/**/*.md | (source) | generate-md-content only (→ md-content.json); docs/[...slug] uses md-content.json |

## Contributing

Contributions are welcome! The documentation is written in Markdown, making it easy to add or improve content.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Add or edit markdown files in `app/docs/`
4. Commit your changes (`git commit -m 'Add new content'`)
5. Push to the branch (`git push origin feature/improvement`)
6. Open a Pull Request

## License

Open source - free to use and distribute 🧡
