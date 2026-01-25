# B++

Bitcoin Education without borders.
An open-source developer's guide to Bitcoin, from fundamentals to advanced protocol, built to be always free and open source.

## Contents

- [What is B++](#what-is-b)
- [Interactive Tools](#interactive-tools)
  - [Bitcoin CLI Terminal](#bitcoin-cli-terminal)
  - [Stack Lab](#stack-lab)
  - [Denominations Calculator](#denominations-calculator)
- [Code snippets](#code-snippets)
- [Search](#search)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)

---

## What is B++

- **Documentation**: A Developer's Guide to Bitcoin
- **Whitepaper**: Satoshi’s Bitcoin whitepaper.
- **Bitcoin CLI Terminal**: Run Bitcoin Core RPC commands in the browser against a public mainnet node. No node setup. `/terminal`
- **Stack Lab**: Interactive Bitcoin Script playground. Build and run locking/unlocking scripts in the browser; same model as on-chain validation. `/stack-lab`
- **Denominations Calculator**: Convert between satoshis, bits, mBTC, BTC, and other units. `/docs/fundamentals/denominations`
- **Glossary**: Browse 200+ Bitcoin terms A–Z at `/docs/glossary`. Linked terms in the docs show a hover tooltip with the definition.

---

## Interactive Tools

The page includes **Bitcoin CLI Terminal**, **Stack Lab**, and a **Denominations Calculator**. They let you run commands, build scripts, and convert units in the browser, without the need for a local node, IDE, or extra setup. Use them to try concepts as you read, debug your mental model, or prepare for real tooling.

### Bitcoin CLI Terminal

Run `getblockcount`, `getblock`, `getrawtransaction`, `getmempoolinfo`, and other Bitcoin Core RPC commands in the browser. Connects to a public mainnet node (no local node or setup). Type `help` for the command list. Supports tab autocomplete.

### Stack Lab

Interactive Bitcoin Script playground. Unlocking script runs first (pushes data onto the stack), then the locking script; the spend is valid if the stack ends in a non-zero value (typically `1`). Same model as on-chain validation.

### Denominations Calculator

Convert between satoshis, bits, mBTC, BTC, and other Bitcoin units to visualize units of magnitude.

---

## Code snippets

Many examples are shown in **five languages** (Python, Rust, C++, Go, JavaScript/TypeScript) via toggleable code blocks. Use the tabs above a snippet to switch to your stack, so you can copy, compare, or adapt examples without translating from another language.

---

## Search

**Command+K** (Mac) or **Ctrl+K** (Windows/Linux) opens the search modal. It indexes docs, glossary terms, and key pages. Also available via the search icon in the header.

---

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **React:** 19, **Tailwind CSS**, **TypeScript**
- **Markdown:** react-markdown, remark-gfm, rehype-highlight, rehype-raw
- **Theming:** next-themes
- **Testing:** Vitest (unit), Playwright (E2E)

One dynamic route (`app/docs/[...slug]/page.tsx`) backed by `app/utils/navigation.ts`. Each section: `overview.md` plus `[topic]/[topic].md`. Routing and nav are defined in `navigation.ts`.

---

## Getting Started

**Prerequisites:** Node.js 20.9+, npm / yarn / pnpm / bun

```bash
git clone https://github.com/Existenziell/bplusplus.git
cd bplusplus
npm install
npm run dev    # → http://localhost:3000
```

**Build:** `npm run build` generates md-content, glossary, and search index, then runs `next build`. Run `npm run start` for production.

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Production server |
| `npm run test` | Unit + E2E |
| `npm run test:unit` | Vitest (once) |
| `npm run test:unit:watch` | Vitest watch |
| `npm run test:unit:coverage` | Vitest with coverage |
| `npm run test:e2e` | Playwright E2E |
| `npm run test:e2e:ui` | Playwright UI |
| `npm run lint` | ESLint |
| `npm run analyze` | Bundle analysis |

---

## Contributing

Contributions are welcome. The docs are Markdown in `app/docs/`.

1. Fork the repo, create a branch (`git checkout -b feature/improvement`)
2. Add or edit files in `app/docs/`
3. Run `npm run lint`
4. Commit, push to your fork, and open a PR

---

## License

Open source, free to use and distribute 🧡
