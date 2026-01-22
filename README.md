# B++

Bitcoin Education and Hopium for the Masses!

An open-source developer's guide to Bitcoin, covering everything from fundamental concepts to advanced protocol implementations. Built with Next.js 14 and designed to be always free.

## Features

- **Comprehensive Documentation** - In-depth guides on Bitcoin fundamentals, protocol, mining, wallets, Lightning Network, and more
- **Interactive Terminal** - Browser-based Bitcoin RPC terminal for hands-on learning
- **Live Stats** - Real-time Bitcoin network statistics
- **Glossary with Tooltips** - Automatic term definitions throughout the documentation
- **Dark/Light Mode** - Theme toggle for comfortable reading
- **Markdown-based Content** - Easy to contribute and maintain
- **Mobile Responsive** - Full documentation experience on any device

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Markdown**: react-markdown with remark-gfm, rehype-highlight, rehype-raw
- **Theming**: next-themes
- **Analytics**: Vercel Analytics & Speed Insights
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/bplusplus.git
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

## Project Structure

```
bplusplus/
├── app/
│   ├── api/                      # API routes
│   │   ├── bitcoin-rpc/          # Bitcoin RPC proxy
│   │   ├── btc-price/            # Price data endpoint
│   │   └── download-md/          # Markdown download endpoint
│   ├── components/               # React components
│   │   ├── Breadcrumbs.tsx
│   │   ├── CodeBlock.tsx
│   │   ├── DocsNavigation.tsx
│   │   ├── DownloadMarkdownButton.tsx
│   │   ├── Footer.tsx
│   │   ├── GlossaryRenderer.tsx
│   │   ├── GlossaryTooltip.tsx
│   │   ├── Header.tsx
│   │   ├── HorizontalNav.tsx
│   │   ├── Icons.tsx
│   │   ├── LiveStats.tsx
│   │   ├── MarkdownRenderer.tsx
│   │   ├── MobileNav.tsx
│   │   ├── PageNavigation.tsx
│   │   ├── Notification.tsx
│   │   ├── QuoteRotator.tsx
│   │   └── ThemeToggle.tsx
│   ├── docs/                     # Documentation pages
│   │   ├── [...slug]/            # Dynamic route handler for all docs
│   │   │   └── page.tsx          # Single route handler (replaces 67 duplicate files)
│   │   ├── bitcoin/              # Bitcoin protocol docs
│   │   │   ├── blocks/
│   │   │   ├── consensus/
│   │   │   ├── cryptography/
│   │   │   ├── op-codes/
│   │   │   ├── rpc/
│   │   │   ├── script/
│   │   │   └── subsidy/
│   │   ├── controversies/        # Historical controversies
│   │   │   ├── blocksize-wars/
│   │   │   ├── craig-wright/
│   │   │   ├── energy-consumption/
│   │   │   ├── mt-gox/
│   │   │   └── op-return/
│   │   ├── development/          # Developer guides
│   │   │   ├── addresses/
│   │   │   ├── blockchain-monitoring/
│   │   │   ├── keys/
│   │   │   ├── libraries/
│   │   │   ├── pool-mining/
│   │   │   ├── price-tracking/
│   │   │   ├── psbt/
│   │   │   ├── testing/
│   │   │   ├── testnets/
│   │   │   └── transactions/
│   │   ├── fundamentals/         # Core concepts
│   │   │   ├── decentralization/
│   │   │   ├── monetary-properties/
│   │   │   ├── problems/
│   │   │   └── trust-model/
│   │   ├── glossary/             # Bitcoin terminology
│   │   ├── history/              # Bitcoin history
│   │   │   ├── bips/
│   │   │   ├── forks/
│   │   │   ├── halvings/
│   │   │   ├── people/
│   │   │   └── supply/
│   │   ├── lightning/            # Lightning Network
│   │   │   ├── anchor-outputs/
│   │   │   ├── channels/
│   │   │   ├── invoices/
│   │   │   ├── onion/
│   │   │   ├── routing/
│   │   │   ├── trampoline/
│   │   │   ├── watchtowers/
│   │   │   └── zero-conf/
│   │   ├── mining/               # Mining documentation
│   │   │   ├── attacks/
│   │   │   ├── block-construction/
│   │   │   ├── difficulty/
│   │   │   ├── economics/
│   │   │   ├── hardware/
│   │   │   ├── mempool/
│   │   │   ├── pools/
│   │   │   └── proof-of-work/
│   │   └── wallets/              # Wallet documentation
│   │       ├── address-types/
│   │       ├── coin-selection/
│   │       ├── hd-wallets/
│   │       ├── multisig/
│   │       └── transactions/
│   ├── hooks/                    # Custom React hooks
│   ├── terminal/                 # Interactive terminal page
│   ├── utils/                    # Utility functions
│   ├── whitepaper/               # Bitcoin whitepaper page
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── public/
│   ├── data/                     # Generated JSON data
│   ├── favicon/                  # Favicon files
│   ├── graphs/                   # Graph images
│   ├── icons/                    # Icon assets
│   ├── images/                   # Image assets
│   ├── link-visualization.html   # Interactive link structure visualization
│   └── og/                       # Open Graph images
├── scripts/                      # Build scripts
│   ├── analyze-links.js          # Link structure analysis
│   ├── generate-glossary-data.js
│   ├── generate-link-visualization.js  # Interactive link visualization
│   └── generate-md-content.js
├── link-analysis.json            # Generated link analysis report
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## Documentation Structure

All documentation pages are handled by a single dynamic route (`app/docs/[...slug]/page.tsx`) that:
- Maps URL paths to markdown files using `app/utils/navigation.ts`
- Automatically generates metadata for SEO
- Eliminates code duplication (replaced 67 duplicate page files)

Each documentation section follows a consistent pattern:
- `overview.md` - Section introduction and navigation
- `[topic]/[topic].md` - Markdown content (no page.tsx needed)

The routing is configured in `app/utils/navigation.ts`, which serves as the single source of truth for all documentation paths and metadata.

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

This script creates an interactive HTML visualization ([`link-visualization.html`](https://bplusplus.info/link-visualization.html)) that shows:
- Network graph of all pages and their connections
- Color-coded nodes by section
- Node size based on incoming link count
- Interactive controls (layout switching, section filtering)
- Click nodes to view details and open pages

To view the visualization, visit [https://bplusplus.info/link-visualization.html](https://bplusplus.info/link-visualization.html) or open the local file in your browser.

## Contributing

Contributions are welcome! The documentation is written in Markdown, making it easy to add or improve content.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Add or edit markdown files in `app/docs/`
4. Commit your changes (`git commit -m 'Add new content'`)
5. Push to the branch (`git push origin feature/improvement`)
6. Open a Pull Request

## License

Open source - free to use and distribute.
