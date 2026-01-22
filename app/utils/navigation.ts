/**
 * Single source of truth for all documentation navigation and routing data.
 * This file is used by:
 * - DocsNavigation component (sidebar navigation)
 * - DownloadMarkdownButton component (determines which pages have downloadable MD)
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
  { path: '/docs/fundamentals', mdFile: 'app/docs/fundamentals/overview.md', title: 'Bitcoin Fundamentals', section: 'fundamentals' },
  { path: '/docs/fundamentals/problems', mdFile: 'app/docs/fundamentals/problems/problems.md', title: 'Problems Bitcoin Solved', section: 'fundamentals' },
  { path: '/docs/fundamentals/cypherpunk-philosophy', mdFile: 'app/docs/fundamentals/cypherpunk-philosophy/cypherpunk-philosophy.md', title: 'Cypherpunk Philosophy', section: 'fundamentals' },
  { path: '/docs/fundamentals/blockchain', mdFile: 'app/docs/fundamentals/blockchain/blockchain.md', title: 'The Blockchain', section: 'fundamentals' },
  { path: '/docs/fundamentals/timechain', mdFile: 'app/docs/fundamentals/timechain/timechain.md', title: 'Bitcoin as Timechain', section: 'fundamentals' },
  { path: '/docs/fundamentals/decentralization', mdFile: 'app/docs/fundamentals/decentralization/decentralization.md', title: 'Decentralization', section: 'fundamentals' },
  { path: '/docs/fundamentals/trust-model', mdFile: 'app/docs/fundamentals/trust-model/trust-model.md', title: 'Trust Model', section: 'fundamentals' },
  { path: '/docs/fundamentals/monetary-properties', mdFile: 'app/docs/fundamentals/monetary-properties/monetary-properties.md', title: 'Monetary Properties', section: 'fundamentals' },
  { path: '/docs/fundamentals/incentives', mdFile: 'app/docs/fundamentals/incentives/incentives.md', title: 'Incentive Structure', section: 'fundamentals' },
  { path: '/docs/fundamentals/game-theory', mdFile: 'app/docs/fundamentals/game-theory/game-theory.md', title: 'Game Theory', section: 'fundamentals' },
  { path: '/docs/fundamentals/utxos', mdFile: 'app/docs/fundamentals/utxos/utxos.md', title: 'UTXO Model', section: 'fundamentals' },

  // History
  { path: '/docs/history', mdFile: 'app/docs/history/overview.md', title: 'Bitcoin History', section: 'history' },
  { path: '/docs/history/people', mdFile: 'app/docs/history/people/people.md', title: 'People', section: 'history' },
  { path: '/docs/history/halvings', mdFile: 'app/docs/history/halvings.md', title: 'Halvings', section: 'history' },
  { path: '/docs/history/forks', mdFile: 'app/docs/history/forks.md', title: 'Forks', section: 'history' },
  { path: '/docs/history/bips', mdFile: 'app/docs/history/bips.md', title: 'BIPs', section: 'history' },

  // Bitcoin Protocol (deep technical)
  { path: '/docs/bitcoin', mdFile: 'app/docs/bitcoin/overview.md', title: 'The Bitcoin Protocol', section: 'bitcoin' },
  { path: '/docs/bitcoin/cryptography', mdFile: 'app/docs/bitcoin/cryptography/cryptography.md', title: 'Cryptography', section: 'bitcoin' },
  { path: '/docs/bitcoin/consensus', mdFile: 'app/docs/bitcoin/consensus/consensus.md', title: 'Consensus Mechanism', section: 'bitcoin' },
  { path: '/docs/bitcoin/script', mdFile: 'app/docs/bitcoin/script/script.md', title: 'Bitcoin Script', section: 'bitcoin' },
  { path: '/docs/bitcoin/op-codes', mdFile: 'app/docs/bitcoin/op-codes/op-codes.md', title: 'OP Codes', section: 'bitcoin' },
  { path: '/docs/bitcoin/blocks', mdFile: 'app/docs/bitcoin/blocks/blocks.md', title: 'Block Propagation', section: 'bitcoin' },
  { path: '/docs/bitcoin/subsidy', mdFile: 'app/docs/bitcoin/subsidy/subsidy.md', title: 'Block Subsidy', section: 'bitcoin' },
  { path: '/docs/bitcoin/rpc', mdFile: 'app/docs/bitcoin/rpc/rpc.md', title: 'RPC Commands', section: 'bitcoin' },
  { path: '/docs/bitcoin/segwit', mdFile: 'app/docs/bitcoin/segwit/segwit.md', title: 'SegWit', section: 'bitcoin' },
  { path: '/docs/bitcoin/taproot', mdFile: 'app/docs/bitcoin/taproot/taproot.md', title: 'Taproot', section: 'bitcoin' },
  { path: '/docs/bitcoin/p2p-protocol', mdFile: 'app/docs/bitcoin/p2p-protocol/p2p-protocol.md', title: 'P2P Network Protocol', section: 'bitcoin' },
  { path: '/docs/bitcoin/merkle-trees', mdFile: 'app/docs/bitcoin/merkle-trees/merkle-trees.md', title: 'Merkle Trees', section: 'bitcoin' },
  { path: '/docs/bitcoin/transaction-fees', mdFile: 'app/docs/bitcoin/transaction-fees/transaction-fees.md', title: 'Transaction Fees', section: 'bitcoin' },
  { path: '/docs/bitcoin/timelocks', mdFile: 'app/docs/bitcoin/timelocks/timelocks.md', title: 'Timelocks', section: 'bitcoin' },
  { path: '/docs/bitcoin/transaction-malleability', mdFile: 'app/docs/bitcoin/transaction-malleability/transaction-malleability.md', title: 'Transaction Malleability', section: 'bitcoin' },
  { path: '/docs/bitcoin/transaction-lifecycle', mdFile: 'app/docs/bitcoin/transaction-lifecycle/transaction-lifecycle.md', title: 'Transaction Lifecycle', section: 'bitcoin' },

  // Mining
  { path: '/docs/mining', mdFile: 'app/docs/mining/overview.md', title: 'Mining', section: 'mining' },
  { path: '/docs/mining/proof-of-work', mdFile: 'app/docs/mining/proof-of-work/proof-of-work.md', title: 'Proof-of-Work', section: 'mining' },
  { path: '/docs/mining/difficulty', mdFile: 'app/docs/mining/difficulty/difficulty.md', title: 'Difficulty Adjustment', section: 'mining' },
  { path: '/docs/mining/economics', mdFile: 'app/docs/mining/economics/economics.md', title: 'Economics', section: 'mining' },
  { path: '/docs/mining/mempool', mdFile: 'app/docs/mining/mempool/mempool.md', title: 'Mempool', section: 'mining' },
  { path: '/docs/mining/block-construction', mdFile: 'app/docs/mining/block-construction/block-construction.md', title: 'Block Construction', section: 'mining' },
  { path: '/docs/mining/pools', mdFile: 'app/docs/mining/pools/pools.md', title: 'Mining Pools', section: 'mining' },
  { path: '/docs/mining/hardware', mdFile: 'app/docs/mining/hardware/hardware.md', title: 'Hardware Evolution', section: 'mining' },
  { path: '/docs/mining/attacks', mdFile: 'app/docs/mining/attacks/attacks.md', title: 'Mining Attacks', section: 'mining' },
  { path: '/docs/mining/network-attacks', mdFile: 'app/docs/mining/network-attacks/network-attacks.md', title: 'Network Attacks & Security', section: 'mining' },

  // Wallets
  { path: '/docs/wallets', mdFile: 'app/docs/wallets/overview.md', title: 'Wallet Development', section: 'wallets' },
  { path: '/docs/wallets/hd-wallets', mdFile: 'app/docs/wallets/hd-wallets/hd-wallets.md', title: 'HD Wallets', section: 'wallets' },
  { path: '/docs/wallets/address-types', mdFile: 'app/docs/wallets/address-types/address-types.md', title: 'Address Types', section: 'wallets' },
  { path: '/docs/wallets/coin-selection', mdFile: 'app/docs/wallets/coin-selection/coin-selection.md', title: 'Coin Selection', section: 'wallets' },
  { path: '/docs/wallets/multisig', mdFile: 'app/docs/wallets/multisig/multisig.md', title: 'Multisig', section: 'wallets' },
  { path: '/docs/wallets/transactions', mdFile: 'app/docs/wallets/transactions/transactions.md', title: 'Transaction Creation', section: 'wallets' },
  { path: '/docs/wallets/privacy', mdFile: 'app/docs/wallets/privacy/privacy.md', title: 'Privacy Techniques', section: 'wallets' },
  { path: '/docs/wallets/smart-contracts', mdFile: 'app/docs/wallets/smart-contracts/smart-contracts.md', title: 'Smart Contracts & Advanced Scripting', section: 'wallets' },

  // Lightning
  { path: '/docs/lightning', mdFile: 'app/docs/lightning/overview.md', title: 'Lightning Network', section: 'lightning' },
  { path: '/docs/lightning/channels', mdFile: 'app/docs/lightning/channels/channels.md', title: 'Channels', section: 'lightning' },
  { path: '/docs/lightning/routing', mdFile: 'app/docs/lightning/routing/fees.md', title: 'Routing & HTLCs', section: 'lightning' },
  { path: '/docs/lightning/onion', mdFile: 'app/docs/lightning/onion/onion.md', title: 'Onion Routing', section: 'lightning' },
  { path: '/docs/lightning/invoices', mdFile: 'app/docs/lightning/invoices/invoices.md', title: 'Invoices (BOLT11)', section: 'lightning' },
  { path: '/docs/lightning/watchtowers', mdFile: 'app/docs/lightning/watchtowers/watchtowers.md', title: 'Watchtowers', section: 'lightning' },
  { path: '/docs/lightning/anchor-outputs', mdFile: 'app/docs/lightning/anchor-outputs/anchor-outputs.md', title: 'Anchor Outputs', section: 'lightning' },

  // Development
  { path: '/docs/development', mdFile: 'app/docs/development/overview.md', title: 'Development Tools', section: 'development' },
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
  { path: '/docs/development/node-types', mdFile: 'app/docs/development/node-types/node-types.md', title: 'Node Types & Architecture', section: 'development' },
  { path: '/docs/development/bitcoin-core-internals', mdFile: 'app/docs/development/bitcoin-core-internals/bitcoin-core-internals.md', title: 'Bitcoin Core Internals', section: 'development' },
  { path: '/docs/development/script-patterns', mdFile: 'app/docs/development/script-patterns/script-patterns.md', title: 'Bitcoin Script Patterns', section: 'development' },

  // Controversies
  { path: '/docs/controversies', mdFile: 'app/docs/controversies/overview.md', title: 'Controversies', section: 'controversies' },
  { path: '/docs/controversies/op-return', mdFile: 'app/docs/controversies/op-return/debate.md', title: 'OP_RETURN Debate', section: 'controversies' },
  { path: '/docs/controversies/blocksize-wars', mdFile: 'app/docs/controversies/blocksize-wars/blocksize-wars.md', title: 'Blocksize Wars', section: 'controversies' },
  { path: '/docs/controversies/energy-consumption', mdFile: 'app/docs/controversies/energy-consumption/energy-consumption.md', title: 'Energy Consumption', section: 'controversies' },
  { path: '/docs/controversies/mt-gox', mdFile: 'app/docs/controversies/mt-gox/mt-gox.md', title: 'Mt. Gox Collapse', section: 'controversies' },
  { path: '/docs/controversies/craig-wright', mdFile: 'app/docs/controversies/craig-wright/craig-wright.md', title: 'Craig Wright', section: 'controversies' },

  // Advanced Topics
  { path: '/docs/advanced', mdFile: 'app/docs/advanced/overview.md', title: 'Advanced Topics', section: 'advanced' },
  { path: '/docs/advanced/atomic-swaps', mdFile: 'app/docs/advanced/atomic-swaps/atomic-swaps.md', title: 'Atomic Swaps', section: 'advanced' },
  { path: '/docs/advanced/dlcs', mdFile: 'app/docs/advanced/dlcs/dlcs.md', title: 'Discreet Log Contracts', section: 'advanced' },
  { path: '/docs/advanced/sidechains', mdFile: 'app/docs/advanced/sidechains/sidechains.md', title: 'Sidechains & Layer 2', section: 'advanced' },
  { path: '/docs/advanced/statechains', mdFile: 'app/docs/advanced/statechains/statechains.md', title: 'Statechains', section: 'advanced' },
  { path: '/docs/advanced/bloom-filters', mdFile: 'app/docs/advanced/bloom-filters/bloom-filters.md', title: 'Bloom Filters', section: 'advanced' },
  { path: '/docs/advanced/governance', mdFile: 'app/docs/advanced/governance/governance.md', title: 'Governance & Evolution', section: 'advanced' },
  { path: '/docs/advanced/zero-conf-channels', mdFile: 'app/docs/advanced/zero-conf-channels/zero-conf-channels.md', title: 'Zero-Conf Channels', section: 'advanced' },
  { path: '/docs/advanced/trampoline-routing', mdFile: 'app/docs/advanced/trampoline-routing/trampoline-routing.md', title: 'Trampoline Routing', section: 'advanced' },

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
    description: "Explore Bitcoin's history from the Genesis Block to future halvings, including key milestones, events, forks, and the complete halving and supply schedule.",
  },
  bitcoin: {
    title: 'Bitcoin Protocol',
    description: 'Deep technical documentation of the Bitcoin protocol, including cryptography, consensus, script system, protocol upgrades (SegWit, Taproot), and RPC interfaces.',
  },
  mining: {
    title: 'Mining',
    description: 'Learn about proof-of-work, block construction, pool mining, network security, and the economic incentives that secure the Bitcoin network.',
  },
  wallets: {
    title: 'Wallet Development',
    description: 'Build Bitcoin wallets with proper coin selection, multisig support, privacy techniques, smart contracts, and transaction construction.',
  },
  lightning: {
    title: 'Lightning Network',
    description: 'Understand the Lightning Network protocol, including channel management, routing, HTLCs, and onion routing.',
  },
  development: {
    title: 'Development Tools',
    description: 'Tools and techniques for Bitcoin development, from getting started guides to advanced testing, debugging, node architecture, and Bitcoin Core internals.',
  },
  controversies: {
    title: 'Controversies',
    description: "Major debates and controversies that have shaped Bitcoin's development.",
  },
  advanced: {
    title: 'Advanced Topics',
    description: 'Advanced Bitcoin topics including atomic swaps, DLCs, sidechains, statechains, governance mechanisms, and experimental features.',
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
    children: docPages.filter(p => p.section === 'fundamentals' && p.path !== '/docs/fundamentals').map(p => ({ title: p.title, href: p.path })),
  },
  {
    title: 'History',
    href: '/docs/history',
    children: docPages.filter(p => p.section === 'history' && p.path !== '/docs/history').map(p => ({ title: p.title, href: p.path })),
  },
  {
    title: 'Bitcoin Protocol',
    href: '/docs/bitcoin',
    children: docPages.filter(p => p.section === 'bitcoin' && p.path !== '/docs/bitcoin').map(p => ({ title: p.title, href: p.path })),
  },
  {
    title: 'Development Tools',
    href: '/docs/development',
    children: docPages.filter(p => p.section === 'development' && p.path !== '/docs/development').map(p => ({ title: p.title, href: p.path })),
  },
  {
    title: 'Wallets',
    href: '/docs/wallets',
    children: docPages.filter(p => p.section === 'wallets' && p.path !== '/docs/wallets').map(p => ({ title: p.title, href: p.path })),
  },
  {
    title: 'Mining',
    href: '/docs/mining',
    children: docPages.filter(p => p.section === 'mining' && p.path !== '/docs/mining').map(p => ({ title: p.title, href: p.path })),
  },
  {
    title: 'Lightning Network',
    href: '/docs/lightning',
    children: docPages.filter(p => p.section === 'lightning' && p.path !== '/docs/lightning').map(p => ({ title: p.title, href: p.path })),
  },
  {
    title: 'Advanced Topics',
    href: '/docs/advanced',
    children: docPages.filter(p => p.section === 'advanced' && p.path !== '/docs/advanced').map(p => ({ title: p.title, href: p.path })),
  },
  {
    title: 'Controversies',
    href: '/docs/controversies',
    children: docPages.filter(p => p.section === 'controversies' && p.path !== '/docs/controversies').map(p => ({ title: p.title, href: p.path })),
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
  advanced: 'Advanced Topics',
  glossary: 'Glossary',

  // Page labels (extracted from path segment to title)
  problems: 'Problems Bitcoin Solved',
  'cypherpunk-philosophy': 'Cypherpunk Philosophy',
  blockchain: 'The Blockchain',
  timechain: 'Bitcoin as Timechain',
  decentralization: 'Decentralization',
  'trust-model': 'Trust Model',
  'monetary-properties': 'Monetary Properties',
  incentives: 'Incentive Structure',
  'game-theory': 'Game Theory',
  utxos: 'UTXO Model',
  consensus: 'Consensus Mechanism',
  cryptography: 'Cryptography',
  halvings: 'Halvings',
  people: 'People',
  forks: 'Forks',
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
  'node-types': 'Node Types & Architecture',
  'bitcoin-core-internals': 'Bitcoin Core Internals',
  'script-patterns': 'Bitcoin Script Patterns',
  segwit: 'SegWit',
  taproot: 'Taproot',
  'p2p-protocol': 'P2P Network Protocol',
  'merkle-trees': 'Merkle Trees',
  'transaction-fees': 'Transaction Fees',
  timelocks: 'Timelocks',
  'transaction-malleability': 'Transaction Malleability',
  'transaction-lifecycle': 'Transaction Lifecycle',
  'network-attacks': 'Network Attacks & Security',
  privacy: 'Privacy Techniques',
  'smart-contracts': 'Smart Contracts & Advanced Scripting',
  'atomic-swaps': 'Atomic Swaps',
  dlcs: 'Discreet Log Contracts',
  sidechains: 'Sidechains & Layer 2',
  statechains: 'Statechains',
  'bloom-filters': 'Bloom Filters',
  governance: 'Governance & Evolution',
  'zero-conf-channels': 'Zero-Conf Channels',
  'trampoline-routing': 'Trampoline Routing',
  'op-return': 'OP_RETURN Debate',
  'blocksize-wars': 'Blocksize Wars',
  'energy-consumption': 'Energy Consumption',
  'mt-gox': 'Mt. Gox Collapse',
  'craig-wright': 'Craig Wright',
}
