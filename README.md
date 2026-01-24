# B++

Bitcoin Education without borders.
An open-source developer's guide to Bitcoin, from fundamentals to advanced protocol, built to be always free and open source.

## Contents

- [What is B++](#what-is-b)
- [Documentation](#documentation)
  - [Learning flow](#learning-flow)
  - [Code snippets](#code-snippets)
- [Search](#search)
- [Interactive Tools](#interactive-tools)
  - [Bitcoin CLI Terminal](#bitcoin-cli-terminal)
  - [Stack Lab](#stack-lab)
  - [Denominations Calculator](#denominations-calculator)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

---

## What is B++

- **Documentation** — A Developer's Guide to Bitcoin
- **Whitepaper** — Satoshi’s Bitcoin whitepaper.
- **Search (⌘K)** — Find and jump to any doc, glossary term, or page. Press **Command+K** (Mac) or **Ctrl+K** (Windows/Linux).
- **Bitcoin CLI Terminal** — Run Bitcoin Core RPC commands in the browser against a public mainnet node. No node setup. `/terminal`
- **Stack Lab** — Interactive Bitcoin Script playground. Build and run locking/unlocking scripts in the browser; same model as on-chain validation. `/stack-lab`
- **Denominations Calculator** — Convert between satoshis, bits, mBTC, BTC, and other units. On the Denominations doc. `/docs/fundamentals/denominations`
- **About** — `/author`

---

## Documentation

One dynamic route (`app/docs/[...slug]/page.tsx`) backed by `app/utils/navigation.ts`. Each section: `overview.md` plus `[topic]/[topic].md`. Routing and nav are defined in `navigation.ts`.

### Learning flow

**Fundamentals:** Problems → Cypherpunk → Blockchain → Timechain → UTXO establishes the *why*, the philosophical lens, and the core technical building blocks. Decentralization and Trust Model then explore emergent properties and the trustless ideal. Monetary Properties, Denominations, Incentive Structure, and Game Theory cover the economic and game-theoretic foundations of Bitcoin's security and monetary design.

**History:** People → Halvings → Forks → BIPs moves from *who* (Satoshi, cypherpunks, key figures) to the monetary schedule (halvings), chain splits (forks), and how the protocol evolves (BIPs). The section is referential; order matters less than for protocol or development.

**Setup & Infrastructure:** Install → Testing → Testnets → Libraries → Node Types → Bitcoin Core Internals follows a get-started path: run a node, verify and debug, use test networks, choose libraries, understand node architecture, then go deep into the reference implementation. Prerequisite for hands-on Bitcoin and Lightning development.

**Bitcoin Protocol:** Crypto → Consensus → Script → OP Codes is in good shape and matches how many scholars and textbooks order the material. The rest of the section follows: Transaction Lifecycle (the "unit" of consensus), script-related topics (Timelocks, Sighash Types), block structure (Merkle Trees, Block Propagation, Subsidy, Fees), the Malleability → SegWit → Taproot progression, then P2P and RPC.

**Bitcoin Development:** Keys → Addresses → Transactions → PSBT is the core path for building and signing transactions; it assumes Setup & Infrastructure and benefits from Bitcoin Protocol (Script, RPC). Blockchain Monitoring and Price Tracking support integration; Pool Mining targets mining software; Script Patterns → Miniscript cover advanced scripting and policy-to-script compilation.

**Wallets:** HD Wallets → Address Types → Coin Selection → Transaction Creation gives key and address handling plus the core spend path. Multisig, Privacy, and Smart Contracts then cover shared custody, privacy techniques, and advanced scripting. Overlaps with Bitcoin Development (keys, addresses, transactions) from a wallet-implementation angle.

**Mining:** Proof-of-Work → Difficulty → Economics establishes the mechanism and incentives. Mempool and Block Construction cover what miners work with and how they build blocks. Pools and Hardware are operational; Attacks and Network Attacks complete the security picture. Best read after Bitcoin Protocol (consensus, blocks) and optionally Incentive Structure in Fundamentals.

**Lightning:** Channels first—the 2-of-2 off-chain primitive. HTLCs → Routing Fees → MPP cover the routing layer; Onion adds privacy. Invoices (BOLT11) and BOLT12 & Offers cover payment requests; Watchtowers and Anchor Outputs address security and modern channel design. Assumes Bitcoin Protocol (Script, transactions) and ideally Setup & Infrastructure if running a node.

**Advanced Topics:** A catalog of specialized topics rather than a linear path. Smart contracts (Atomic Swaps, DLCs), L2 and scaling (Sidechains, Statechains, Zero-Conf Channels, Trampoline Routing), privacy (Bloom Filters), data on Bitcoin (Ordinals & Inscriptions), and governance and protocol proposals (Governance, Covenants). Prerequisites: Bitcoin Protocol, Lightning basics, Script, and Transaction construction.

**Controversies:** Protocol debates (OP_RETURN, Blocksize Wars), external critiques (Energy, Criminal Use), and defining events (Mt. Gox, Craig Wright). Order is flexible; the section explains how governance, values, and antifragility play out in practice.

### Code snippets

Many examples are shown in **five languages** (Python, Rust, C++, Go, JavaScript/TypeScript) via toggleable code blocks. Use the tabs above a snippet to switch to your stack—so you can copy, compare, or adapt examples without translating from another language.

---

## Search

**Command+K** (Mac) or **Ctrl+K** (Windows/Linux) opens the search modal. It indexes docs, glossary terms, and key pages. Type a few characters, pick a result, and jump there. Also available via the search icon in the header.

---

## Interactive Tools

The docs include **Bitcoin CLI Terminal**, **Stack Lab**, and a **Denominations Calculator**. They let you run commands, build scripts, and convert units in the browser—no local node, IDE, or extra setup. Use them to try concepts as you read, debug your mental model, or prepare for real tooling.

### Bitcoin CLI Terminal

Run `getblockcount`, `getblock`, `getrawtransaction`, `getmempoolinfo`, and other Bitcoin Core RPC commands in the browser. Connects to a public mainnet node—no local node or setup. Type `help` for the command list.

### Stack Lab

Interactive Bitcoin Script playground. Unlocking script runs first (pushes data onto the stack), then the locking script; the spend is valid if the stack ends in a non-zero value (typically `1`). Same model as on-chain validation.

### Denominations Calculator

Convert between satoshis, bits, mBTC, BTC, and other Bitcoin units. On the Denominations page.

---

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **React:** 19, **Tailwind CSS**, **TypeScript**
- **Markdown:** react-markdown, remark-gfm, rehype-highlight, rehype-raw
- **Theming:** next-themes
- **Testing:** Vitest (unit), Playwright (E2E)

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

1. Fork, create a branch (`git checkout -b feature/improvement`)
2. Add or edit files in `app/docs/`
3. Run `npm run lint`
4. Commit, push, open a PR

---

## License

Open source — free to use and distribute 🧡
