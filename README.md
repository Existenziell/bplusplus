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
│   │   ├── DownloadButton.tsx
│   │   ├── Footer.tsx
│   │   ├── GlossaryRenderer.tsx
│   │   ├── GlossaryTooltip.tsx
│   │   ├── Header.tsx
│   │   ├── HorizontalNav.tsx
│   │   ├── LiveStats.tsx
│   │   ├── MarkdownRenderer.tsx
│   │   ├── MobileNav.tsx
│   │   ├── NextPageButton.tsx
│   │   ├── Notification.tsx
│   │   ├── QuoteRotator.tsx
│   │   └── ThemeToggle.tsx
│   ├── docs/                     # Documentation pages
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
│   └── og/                       # Open Graph images
├── scripts/                      # Build scripts
│   ├── generate-glossary-data.js
│   └── generate-md-content.js
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## Documentation Structure

Each documentation section follows a consistent pattern:
- `overview.md` - Section introduction and navigation
- `[topic]/page.tsx` - Next.js page component
- `[topic]/[topic].md` - Markdown content

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production (runs prebuild scripts) |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run analyze` | Analyze bundle size |

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
