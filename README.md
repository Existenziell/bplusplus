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

The build process automatically generates glossary data and markdown content via prebuild scripts.

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
| `npm run build` | Build for production (runs prebuild scripts) |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run analyze` | Analyze bundle size |

### Link Analysis Tools

The project includes tools to analyze and visualize the internal link structure of the documentation:

**Analyze Links:**
```bash
node scripts/analyze-links.js
```

This script:
- Extracts all links from markdown files
- Categorizes links (internal, glossary, anchor, external)
- Identifies broken links
- Finds orphaned pages (pages with no incoming links)
- Generates statistics and a JSON report (`link-analysis.json`)

**Generate Visualization:**
```bash
node scripts/generate-link-visualization.js
```

This script creates an interactive HTML visualization ([`data/link-visualization.html`](https://bplusplus.info/data/link-visualization.html)) that shows:
- Network graph of all pages and their connections
- Color-coded nodes by section
- Node size based on incoming link count
- Interactive controls (layout switching, section filtering)
- Click nodes to view details and open pages

To view the visualization, visit [https://bplusplus.info/data/link-visualization.html](https://bplusplus.info/data/link-visualization.html) or open the local file in your browser.

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
