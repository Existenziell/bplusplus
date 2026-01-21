/**
 * Single source of truth for all documentation navigation and routing data.
 * This file is used by:
 * - DocsNavigation component (sidebar navigation)
 * - DownloadButton component (determines which pages have downloadable MD)
 * - download-md API route (maps URLs to MD file paths)
 * - Breadcrumbs component (route labels)
 */

export interface DocPage {
  path: string
  mdFile: string
  title: string
  section: string
}

export interface NavSection {
  title: string
  href: string
  children?: { title: string; href: string }[]
}

// All documentation pages with their metadata
export const docPages: DocPage[] = [
  // Fundamentals (high-level concepts)
  { path: '/docs/fundamentals/overview', mdFile: 'app/docs/fundamentals/overview/overview.md', title: 'What is Bitcoin?', section: 'fundamentals' },
  { path: '/docs/fundamentals/problems', mdFile: 'app/docs/fundamentals/problems/problems.md', title: 'Problems Bitcoin Solved', section: 'fundamentals' },
  { path: '/docs/fundamentals/trilemma', mdFile: 'app/docs/fundamentals/trilemma/trilemma.md', title: 'Bitcoin Trilemma', section: 'fundamentals' },
  { path: '/docs/fundamentals/decentralization', mdFile: 'app/docs/fundamentals/decentralization/decentralization.md', title: 'Decentralization', section: 'fundamentals' },
  { path: '/docs/fundamentals/trust-model', mdFile: 'app/docs/fundamentals/trust-model/trust-model.md', title: 'Trust Model', section: 'fundamentals' },
  { path: '/docs/fundamentals/monetary-properties', mdFile: 'app/docs/fundamentals/monetary-properties/monetary-properties.md', title: 'Monetary Properties', section: 'fundamentals' },

  // History
  { path: '/docs/history/milestones', mdFile: 'app/docs/history/milestones/overview.md', title: 'Historical Milestones', section: 'history' },
  { path: '/docs/history/people', mdFile: 'app/docs/history/people/people.md', title: 'People', section: 'history' },
  { path: '/docs/history/halvings', mdFile: 'app/docs/history/halvings.md', title: 'Halvings', section: 'history' },
  { path: '/docs/history/forks', mdFile: 'app/docs/history/forks.md', title: 'Forks', section: 'history' },
  { path: '/docs/history/supply', mdFile: 'app/docs/history/supply.md', title: 'Supply Schedule', section: 'history' },
  { path: '/docs/history/bips', mdFile: 'app/docs/history/bips.md', title: 'BIPs', section: 'history' },

  // Bitcoin Protocol (deep technical)
  { path: '/docs/bitcoin/cryptography', mdFile: 'app/docs/bitcoin/cryptography/cryptography.md', title: 'Cryptography', section: 'bitcoin' },
  { path: '/docs/bitcoin/consensus', mdFile: 'app/docs/bitcoin/consensus/consensus.md', title: 'Consensus Mechanism', section: 'bitcoin' },
  { path: '/docs/bitcoin/script', mdFile: 'app/docs/bitcoin/script/execution.md', title: 'Script System', section: 'bitcoin' },
  { path: '/docs/bitcoin/op-codes', mdFile: 'app/docs/bitcoin/op-codes/codes.md', title: 'OP Codes', section: 'bitcoin' },
  { path: '/docs/bitcoin/blocks', mdFile: 'app/docs/bitcoin/blocks/propagation.md', title: 'Block Propagation', section: 'bitcoin' },
  { path: '/docs/bitcoin/subsidy', mdFile: 'app/docs/bitcoin/subsidy/equation.md', title: 'Subsidy Equation', section: 'bitcoin' },
  { path: '/docs/bitcoin/rpc', mdFile: 'app/docs/bitcoin/rpc/guide.md', title: 'RPC Guide', section: 'bitcoin' },

  // Mining
  { path: '/docs/mining/overview', mdFile: 'app/docs/mining/overview.md', title: 'Overview', section: 'mining' },
  { path: '/docs/mining/proof-of-work', mdFile: 'app/docs/mining/proof-of-work.md', title: 'Proof-of-Work', section: 'mining' },
  { path: '/docs/mining/difficulty', mdFile: 'app/docs/mining/difficulty.md', title: 'Difficulty Adjustment', section: 'mining' },
  { path: '/docs/mining/economics', mdFile: 'app/docs/mining/economics.md', title: 'Economics', section: 'mining' },
  { path: '/docs/mining/mempool', mdFile: 'app/docs/mining/mempool/mempool.md', title: 'Mempool', section: 'mining' },
  { path: '/docs/mining/block-construction', mdFile: 'app/docs/mining/block-construction/block-construction.md', title: 'Block Construction', section: 'mining' },
  { path: '/docs/mining/pools', mdFile: 'app/docs/mining/pools/pools.md', title: 'Mining Pools', section: 'mining' },
  { path: '/docs/mining/hardware', mdFile: 'app/docs/mining/hardware/hardware.md', title: 'Hardware Evolution', section: 'mining' },
  { path: '/docs/mining/attacks', mdFile: 'app/docs/mining/attacks/attacks.md', title: 'Mining Attacks', section: 'mining' },

  // Wallets
  { path: '/docs/wallets/overview', mdFile: 'app/docs/wallets/overview/overview.md', title: 'Overview', section: 'wallets' },
  { path: '/docs/wallets/coin-selection', mdFile: 'app/docs/wallets/coin-selection/algorithms.md', title: 'Coin Selection', section: 'wallets' },
  { path: '/docs/wallets/multisig', mdFile: 'app/docs/wallets/multisig/concepts.md', title: 'Multisig', section: 'wallets' },
  { path: '/docs/wallets/transactions', mdFile: 'app/docs/wallets/transactions/creation.md', title: 'Transactions', section: 'wallets' },

  // Lightning
  { path: '/docs/lightning/basics', mdFile: 'app/docs/lightning/basics/getting-started.md', title: 'Getting Started', section: 'lightning' },
  { path: '/docs/lightning/routing', mdFile: 'app/docs/lightning/routing/fees.md', title: 'Routing', section: 'lightning' },
  { path: '/docs/lightning/channels', mdFile: 'app/docs/lightning/channels/concepts.md', title: 'Channels', section: 'lightning' },
  { path: '/docs/lightning/onion', mdFile: 'app/docs/lightning/onion/routing.md', title: 'Onion Routing', section: 'lightning' },

  // Development
  { path: '/docs/development/getting-started', mdFile: 'app/docs/development/getting-started/getting-started.md', title: 'Getting Started', section: 'development' },
  { path: '/docs/development/testing', mdFile: 'app/docs/development/testing/testing.md', title: 'Testing & Debugging', section: 'development' },
  { path: '/docs/development/psbt', mdFile: 'app/docs/development/psbt/psbt.md', title: 'PSBT', section: 'development' },
  { path: '/docs/development/addresses', mdFile: 'app/docs/development/addresses/addresses.md', title: 'Address Generation', section: 'development' },
  { path: '/docs/development/transactions', mdFile: 'app/docs/development/transactions/transactions.md', title: 'Transaction Construction', section: 'development' },
  { path: '/docs/development/keys', mdFile: 'app/docs/development/keys/keys.md', title: 'Key Management', section: 'development' },
  { path: '/docs/development/testnets', mdFile: 'app/docs/development/testnets/testnets.md', title: 'Test Networks', section: 'development' },
  { path: '/docs/development/libraries', mdFile: 'app/docs/development/libraries/libraries.md', title: 'Libraries & SDKs', section: 'development' },
  { path: '/docs/development/monitoring', mdFile: 'app/docs/development/monitoring/blockchain.md', title: 'Blockchain Monitoring', section: 'development' },
  { path: '/docs/development/mining', mdFile: 'app/docs/development/mining/pool-mining.md', title: 'Pool Mining', section: 'development' },
  { path: '/docs/development/tools', mdFile: 'app/docs/development/tools/price-tracking.md', title: 'Price Tracking', section: 'development' },

  // Controversies
  { path: '/docs/controversies/op-return', mdFile: 'app/docs/controversies/op-return/debate.md', title: 'OP_RETURN Debate', section: 'controversies' },
  { path: '/docs/controversies/blocksize-wars', mdFile: 'app/docs/controversies/blocksize-wars/blocksize-wars.md', title: 'Blocksize Wars', section: 'controversies' },
  { path: '/docs/controversies/energy-consumption', mdFile: 'app/docs/controversies/energy-consumption/energy-consumption.md', title: 'Energy Consumption', section: 'controversies' },
  { path: '/docs/controversies/mt-gox', mdFile: 'app/docs/controversies/mt-gox/mt-gox.md', title: 'Mt. Gox Collapse', section: 'controversies' },
  { path: '/docs/controversies/craig-wright', mdFile: 'app/docs/controversies/craig-wright/craig-wright.md', title: 'Craig Wright', section: 'controversies' },

  // Glossary
  { path: '/docs/glossary', mdFile: 'app/docs/glossary/terms.md', title: 'Glossary', section: 'glossary' },
]

// Section metadata for index pages
export const sections: Record<string, { title: string; description: string }> = {
  fundamentals: {
    title: 'Bitcoin Fundamentals',
    description: 'High-level concepts explaining what Bitcoin is, why it matters, and the problems it solves.',
  },
  history: {
    title: 'Bitcoin History',
    description: "Explore Bitcoin's history from the Genesis Block to future halvings, including key milestones, events, forks, and the complete supply schedule.",
  },
  bitcoin: {
    title: 'Bitcoin Protocol',
    description: 'Deep technical documentation of the Bitcoin protocol, including cryptography, consensus, script system, and RPC interfaces.',
  },
  mining: {
    title: 'Mining',
    description: 'Learn about proof-of-work, block construction, pool mining, and the economic incentives that secure the Bitcoin network.',
  },
  wallets: {
    title: 'Wallet Development',
    description: 'Build Bitcoin wallets with proper coin selection, multisig support, and transaction construction.',
  },
  lightning: {
    title: 'Lightning Network',
    description: 'Understand the Lightning Network protocol, including channel management, routing, HTLCs, and onion routing.',
  },
  development: {
    title: 'Development Tools',
    description: 'Tools and techniques for Bitcoin development, from getting started guides to advanced testing and debugging.',
  },
  controversies: {
    title: 'Controversies',
    description: "Major debates and controversies that have shaped Bitcoin's development.",
  },
  glossary: {
    title: 'Bitcoin Glossary',
    description: 'A comprehensive glossary of Bitcoin development terms, from ASIC to ZMQ.',
  },
}

// Navigation structure for sidebar
export const navItems: NavSection[] = [
  {
    title: 'Fundamentals',
    href: '/docs/fundamentals',
    children: docPages.filter(p => p.section === 'fundamentals').map(p => ({ title: p.title, href: p.path })),
  },
  {
    title: 'History',
    href: '/docs/history',
    children: docPages.filter(p => p.section === 'history').map(p => ({ title: p.title, href: p.path })),
  },
  {
    title: 'Bitcoin',
    href: '/docs/bitcoin',
    children: docPages.filter(p => p.section === 'bitcoin').map(p => ({ title: p.title, href: p.path })),
  },
  {
    title: 'Mining',
    href: '/docs/mining',
    children: docPages.filter(p => p.section === 'mining').map(p => ({ title: p.title, href: p.path })),
  },
  {
    title: 'Wallets',
    href: '/docs/wallets',
    children: docPages.filter(p => p.section === 'wallets').map(p => ({ title: p.title, href: p.path })),
  },
  {
    title: 'Lightning Network',
    href: '/docs/lightning',
    children: docPages.filter(p => p.section === 'lightning').map(p => ({ title: p.title, href: p.path })),
  },
  {
    title: 'Development Tools',
    href: '/docs/development',
    children: docPages.filter(p => p.section === 'development').map(p => ({ title: p.title, href: p.path })),
  },
  {
    title: 'Controversies',
    href: '/docs/controversies',
    children: docPages.filter(p => p.section === 'controversies').map(p => ({ title: p.title, href: p.path })),
  },
  {
    title: 'Glossary',
    href: '/docs/glossary',
  },
]

// Set of downloadable paths (derived from docPages)
export const downloadablePaths: Set<string> = new Set(docPages.map(p => p.path))

// Map of paths to MD files (derived from docPages)
export const pathToMdFile: Record<string, string> = Object.fromEntries(
  docPages.map(p => [p.path, p.mdFile])
)

// Route labels for breadcrumbs (derived from docPages + section names)
export const routeLabels: Record<string, string> = {
  // Section labels
  fundamentals: 'Fundamentals',
  history: 'History',
  bitcoin: 'Bitcoin',
  mining: 'Mining',
  wallets: 'Wallets',
  lightning: 'Lightning Network',
  development: 'Development Tools',
  controversies: 'Controversies',
  glossary: 'Glossary',

  // Page labels (extracted from path segment to title)
  milestones: 'Historical Milestones',
  problems: 'Problems Bitcoin Solved',
  trilemma: 'Bitcoin Trilemma',
  decentralization: 'Decentralization',
  'trust-model': 'Trust Model',
  'monetary-properties': 'Monetary Properties',
  consensus: 'Consensus Mechanism',
  cryptography: 'Cryptography',
  halvings: 'Halvings',
  people: 'People',
  forks: 'Forks',
  supply: 'Supply Schedule',
  bips: 'BIPs',
  script: 'Script System',
  'op-codes': 'OP Codes',
  rpc: 'RPC Guide',
  blocks: 'Block Propagation',
  subsidy: 'Subsidy Equation',
  'proof-of-work': 'Proof-of-Work',
  difficulty: 'Difficulty Adjustment',
  economics: 'Economics',
  mempool: 'Mempool',
  'block-construction': 'Block Construction',
  pools: 'Mining Pools',
  hardware: 'Hardware Evolution',
  attacks: 'Mining Attacks',
  'coin-selection': 'Coin Selection',
  multisig: 'Multisig',
  transactions: 'Transactions',
  basics: 'Getting Started',
  routing: 'Routing & HTLCs',
  channels: 'Channels',
  onion: 'Onion Routing',
  'getting-started': 'Getting Started',
  testing: 'Testing & Debugging',
  psbt: 'PSBT',
  addresses: 'Address Generation',
  keys: 'Key Management',
  testnets: 'Test Networks',
  libraries: 'Libraries & SDKs',
  monitoring: 'Blockchain Monitoring',
  tools: 'Price Tracking',
  'op-return': 'OP_RETURN Debate',
  'blocksize-wars': 'Blocksize Wars',
  'energy-consumption': 'Energy Consumption',
  'mt-gox': 'Mt. Gox Collapse',
  'craig-wright': 'Craig Wright',
}
