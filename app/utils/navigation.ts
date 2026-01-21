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
  { path: '/docs/fundamentals/problems', mdFile: 'app/docs/fundamentals/problems/problems.md', title: 'Problems Bitcoin Solved', section: 'fundamentals' },
  { path: '/docs/fundamentals/decentralization', mdFile: 'app/docs/fundamentals/decentralization/decentralization.md', title: 'Decentralization', section: 'fundamentals' },
  { path: '/docs/fundamentals/trust-model', mdFile: 'app/docs/fundamentals/trust-model/trust-model.md', title: 'Trust Model', section: 'fundamentals' },
  { path: '/docs/fundamentals/monetary-properties', mdFile: 'app/docs/fundamentals/monetary-properties/monetary-properties.md', title: 'Monetary Properties', section: 'fundamentals' },

  // History
  { path: '/docs/history/people', mdFile: 'app/docs/history/people/people.md', title: 'People', section: 'history' },
  { path: '/docs/history/halvings', mdFile: 'app/docs/history/halvings.md', title: 'Halvings', section: 'history' },
  { path: '/docs/history/forks', mdFile: 'app/docs/history/forks.md', title: 'Forks', section: 'history' },
  { path: '/docs/history/supply', mdFile: 'app/docs/history/supply.md', title: 'Supply Schedule', section: 'history' },
  { path: '/docs/history/bips', mdFile: 'app/docs/history/bips.md', title: 'BIPs', section: 'history' },

  // Bitcoin Protocol (deep technical)
  { path: '/docs/bitcoin/cryptography', mdFile: 'app/docs/bitcoin/cryptography/cryptography.md', title: 'Cryptography', section: 'bitcoin' },
  { path: '/docs/bitcoin/consensus', mdFile: 'app/docs/bitcoin/consensus/consensus.md', title: 'Consensus Mechanism', section: 'bitcoin' },
  { path: '/docs/bitcoin/script', mdFile: 'app/docs/bitcoin/script/script.md', title: 'Bitcoin Script', section: 'bitcoin' },
  { path: '/docs/bitcoin/op-codes', mdFile: 'app/docs/bitcoin/op-codes/op-codes.md', title: 'OP Codes', section: 'bitcoin' },
  { path: '/docs/bitcoin/blocks', mdFile: 'app/docs/bitcoin/blocks/blocks.md', title: 'Block Propagation', section: 'bitcoin' },
  { path: '/docs/bitcoin/subsidy', mdFile: 'app/docs/bitcoin/subsidy/subsidy.md', title: 'Block Subsidy', section: 'bitcoin' },
  { path: '/docs/bitcoin/rpc', mdFile: 'app/docs/bitcoin/rpc/rpc.md', title: 'RPC Commands', section: 'bitcoin' },

  // Mining
  { path: '/docs/mining/proof-of-work', mdFile: 'app/docs/mining/proof-of-work/proof-of-work.md', title: 'Proof-of-Work', section: 'mining' },
  { path: '/docs/mining/difficulty', mdFile: 'app/docs/mining/difficulty/difficulty.md', title: 'Difficulty Adjustment', section: 'mining' },
  { path: '/docs/mining/economics', mdFile: 'app/docs/mining/economics/economics.md', title: 'Economics', section: 'mining' },
  { path: '/docs/mining/mempool', mdFile: 'app/docs/mining/mempool/mempool.md', title: 'Mempool', section: 'mining' },
  { path: '/docs/mining/block-construction', mdFile: 'app/docs/mining/block-construction/block-construction.md', title: 'Block Construction', section: 'mining' },
  { path: '/docs/mining/pools', mdFile: 'app/docs/mining/pools/pools.md', title: 'Mining Pools', section: 'mining' },
  { path: '/docs/mining/hardware', mdFile: 'app/docs/mining/hardware/hardware.md', title: 'Hardware Evolution', section: 'mining' },
  { path: '/docs/mining/attacks', mdFile: 'app/docs/mining/attacks/attacks.md', title: 'Mining Attacks', section: 'mining' },

  // Wallets
  { path: '/docs/wallets/hd-wallets', mdFile: 'app/docs/wallets/hd-wallets/hd-wallets.md', title: 'HD Wallets', section: 'wallets' },
  { path: '/docs/wallets/address-types', mdFile: 'app/docs/wallets/address-types/address-types.md', title: 'Address Types', section: 'wallets' },
  { path: '/docs/wallets/coin-selection', mdFile: 'app/docs/wallets/coin-selection/coin-selection.md', title: 'Coin Selection', section: 'wallets' },
  { path: '/docs/wallets/multisig', mdFile: 'app/docs/wallets/multisig/multisig.md', title: 'Multisig', section: 'wallets' },
  { path: '/docs/wallets/transactions', mdFile: 'app/docs/wallets/transactions/transactions.md', title: 'Transaction Creation', section: 'wallets' },

  // Lightning
  { path: '/docs/lightning/channels', mdFile: 'app/docs/lightning/channels/channels.md', title: 'Channels', section: 'lightning' },
  { path: '/docs/lightning/routing', mdFile: 'app/docs/lightning/routing/fees.md', title: 'Routing & HTLCs', section: 'lightning' },
  { path: '/docs/lightning/onion', mdFile: 'app/docs/lightning/onion/onion.md', title: 'Onion Routing', section: 'lightning' },
  { path: '/docs/lightning/invoices', mdFile: 'app/docs/lightning/invoices/invoices.md', title: 'Invoices (BOLT11)', section: 'lightning' },
  { path: '/docs/lightning/watchtowers', mdFile: 'app/docs/lightning/watchtowers/watchtowers.md', title: 'Watchtowers', section: 'lightning' },
  { path: '/docs/lightning/anchor-outputs', mdFile: 'app/docs/lightning/anchor-outputs/anchor-outputs.md', title: 'Anchor Outputs', section: 'lightning' },
  { path: '/docs/lightning/zero-conf', mdFile: 'app/docs/lightning/zero-conf/zero-conf.md', title: 'Zero-Conf Channels', section: 'lightning' },
  { path: '/docs/lightning/trampoline', mdFile: 'app/docs/lightning/trampoline/trampoline.md', title: 'Trampoline Routing', section: 'lightning' },

  // Development
  { path: '/docs/development/install-bitcoin', mdFile: 'app/docs/development/install-bitcoin/install-bitcoin.md', title: 'Installing Bitcoin', section: 'development' },
  { path: '/docs/development/testing', mdFile: 'app/docs/development/testing/testing.md', title: 'Testing & Debugging', section: 'development' },
  { path: '/docs/development/psbt', mdFile: 'app/docs/development/psbt/psbt.md', title: 'PSBT', section: 'development' },
  { path: '/docs/development/addresses', mdFile: 'app/docs/development/addresses/addresses.md', title: 'Address Generation', section: 'development' },
  { path: '/docs/development/transactions', mdFile: 'app/docs/development/transactions/transactions.md', title: 'Transaction Construction', section: 'development' },
  { path: '/docs/development/keys', mdFile: 'app/docs/development/keys/keys.md', title: 'Key Management', section: 'development' },
  { path: '/docs/development/testnets', mdFile: 'app/docs/development/testnets/testnets.md', title: 'Test Networks', section: 'development' },
  { path: '/docs/development/libraries', mdFile: 'app/docs/development/libraries/libraries.md', title: 'Libraries & SDKs', section: 'development' },
  { path: '/docs/development/blockchain-monitoring', mdFile: 'app/docs/development/blockchain-monitoring/blockchain-monitoring.md', title: 'Blockchain Monitoring', section: 'development' },
  { path: '/docs/development/pool-mining', mdFile: 'app/docs/development/pool-mining/pool-mining.md', title: 'Pool Mining', section: 'development' },
  { path: '/docs/development/price-tracking', mdFile: 'app/docs/development/price-tracking/price-tracking.md', title: 'Price Tracking', section: 'development' },

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
    title: 'Bitcoin Protocol',
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
  bitcoin: 'Bitcoin Protocol',
  mining: 'Mining',
  wallets: 'Wallets',
  lightning: 'Lightning Network',
  development: 'Development Tools',
  controversies: 'Controversies',
  glossary: 'Glossary',

  // Page labels (extracted from path segment to title)
  problems: 'Problems Bitcoin Solved',
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
  'hd-wallets': 'HD Wallets',
  'address-types': 'Address Types',
  multisig: 'Multisig',
  transactions: 'Transaction Creation',
  channels: 'Channels',
  routing: 'Routing & HTLCs',
  onion: 'Onion Routing',
  invoices: 'Invoices (BOLT11)',
  watchtowers: 'Watchtowers',
  'anchor-outputs': 'Anchor Outputs',
  'zero-conf': 'Zero-Conf Channels',
  trampoline: 'Trampoline Routing',
  'install-bitcoin': 'Installing Bitcoin',
  testing: 'Testing & Debugging',
  psbt: 'PSBT',
  addresses: 'Address Generation',
  keys: 'Key Management',
  testnets: 'Test Networks',
  libraries: 'Libraries & SDKs',
  'blockchain-monitoring': 'Blockchain Monitoring',
  'pool-mining': 'Pool Mining',
  'price-tracking': 'Price Tracking',
  'op-return': 'OP_RETURN Debate',
  'blocksize-wars': 'Blocksize Wars',
  'energy-consumption': 'Energy Consumption',
  'mt-gox': 'Mt. Gox Collapse',
  'craig-wright': 'Craig Wright',
}
