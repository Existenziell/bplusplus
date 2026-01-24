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

export const docPages: DocPage[] = [
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

  { path: '/docs/history', mdFile: 'app/docs/history/overview.md', title: 'Bitcoin History', section: 'history' },
  { path: '/docs/history/people', mdFile: 'app/docs/history/people/people.md', title: 'People', section: 'history' },
  { path: '/docs/history/halvings', mdFile: 'app/docs/history/halvings.md', title: 'Halvings', section: 'history' },
  { path: '/docs/history/forks', mdFile: 'app/docs/history/forks.md', title: 'Forks', section: 'history' },
  { path: '/docs/history/bips', mdFile: 'app/docs/history/bips.md', title: 'BIPs', section: 'history' },

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
  { path: '/docs/bitcoin/sighash-types', mdFile: 'app/docs/bitcoin/sighash-types/sighash-types.md', title: 'Sighash Types', section: 'bitcoin' },

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

  { path: '/docs/wallets', mdFile: 'app/docs/wallets/overview.md', title: 'Wallet Development', section: 'wallets' },
  { path: '/docs/wallets/hd-wallets', mdFile: 'app/docs/wallets/hd-wallets/hd-wallets.md', title: 'HD Wallets', section: 'wallets' },
  { path: '/docs/wallets/address-types', mdFile: 'app/docs/wallets/address-types/address-types.md', title: 'Address Types', section: 'wallets' },
  { path: '/docs/wallets/coin-selection', mdFile: 'app/docs/wallets/coin-selection/coin-selection.md', title: 'Coin Selection', section: 'wallets' },
  { path: '/docs/wallets/multisig', mdFile: 'app/docs/wallets/multisig/multisig.md', title: 'Multisig', section: 'wallets' },
  { path: '/docs/wallets/transactions', mdFile: 'app/docs/wallets/transactions/transactions.md', title: 'Transaction Creation', section: 'wallets' },
  { path: '/docs/wallets/privacy', mdFile: 'app/docs/wallets/privacy/privacy.md', title: 'Privacy Techniques', section: 'wallets' },
  { path: '/docs/wallets/smart-contracts', mdFile: 'app/docs/wallets/smart-contracts/smart-contracts.md', title: 'Smart Contracts & Advanced Scripting', section: 'wallets' },

  { path: '/docs/lightning', mdFile: 'app/docs/lightning/overview.md', title: 'Lightning Network', section: 'lightning' },
  { path: '/docs/lightning/channels', mdFile: 'app/docs/lightning/channels/channels.md', title: 'Channels', section: 'lightning' },
  { path: '/docs/lightning/routing', mdFile: 'app/docs/lightning/routing/fees.md', title: 'Routing Fees', section: 'lightning' },
  { path: '/docs/lightning/routing/htlc', mdFile: 'app/docs/lightning/routing/htlc.md', title: 'HTLCs', section: 'lightning' },
  { path: '/docs/lightning/routing/mpp', mdFile: 'app/docs/lightning/routing/mpp.md', title: 'Multi-Part Payments', section: 'lightning' },
  { path: '/docs/lightning/onion', mdFile: 'app/docs/lightning/onion/onion.md', title: 'Onion Routing', section: 'lightning' },
  { path: '/docs/lightning/invoices', mdFile: 'app/docs/lightning/invoices/invoices.md', title: 'Invoices (BOLT11)', section: 'lightning' },
  { path: '/docs/lightning/bolt12-offers', mdFile: 'app/docs/lightning/bolt12-offers/bolt12-offers.md', title: 'BOLT12 & Offers', section: 'lightning' },
  { path: '/docs/lightning/watchtowers', mdFile: 'app/docs/lightning/watchtowers/watchtowers.md', title: 'Watchtowers', section: 'lightning' },
  { path: '/docs/lightning/anchor-outputs', mdFile: 'app/docs/lightning/anchor-outputs/anchor-outputs.md', title: 'Anchor Outputs', section: 'lightning' },

  { path: '/docs/development', mdFile: 'app/docs/development/overview.md', title: 'Setup & Infrastructure', section: 'development' },
  { path: '/docs/development/install-bitcoin', mdFile: 'app/docs/development/install-bitcoin/install-bitcoin.md', title: 'Installing Bitcoin', section: 'development' },
  { path: '/docs/development/testing', mdFile: 'app/docs/development/testing/testing.md', title: 'Testing & Debugging', section: 'development' },
  { path: '/docs/development/testnets', mdFile: 'app/docs/development/testnets/testnets.md', title: 'Test Networks', section: 'development' },
  { path: '/docs/development/libraries', mdFile: 'app/docs/development/libraries/libraries.md', title: 'Libraries & SDKs', section: 'development' },
  { path: '/docs/development/node-types', mdFile: 'app/docs/development/node-types/node-types.md', title: 'Node Types & Architecture', section: 'development' },
  { path: '/docs/development/bitcoin-core-internals', mdFile: 'app/docs/development/bitcoin-core-internals/bitcoin-core-internals.md', title: 'Bitcoin Core Internals', section: 'development' },

  { path: '/docs/bitcoin-development', mdFile: 'app/docs/bitcoin-development/overview.md', title: 'Bitcoin Development', section: 'bitcoin-development' },
  { path: '/docs/bitcoin-development/keys', mdFile: 'app/docs/bitcoin-development/keys/keys.md', title: 'Key Management', section: 'bitcoin-development' },
  { path: '/docs/bitcoin-development/addresses', mdFile: 'app/docs/bitcoin-development/addresses/addresses.md', title: 'Address Generation', section: 'bitcoin-development' },
  { path: '/docs/bitcoin-development/transactions', mdFile: 'app/docs/bitcoin-development/transactions/transactions.md', title: 'Transaction Construction', section: 'bitcoin-development' },
  { path: '/docs/bitcoin-development/psbt', mdFile: 'app/docs/bitcoin-development/psbt/psbt.md', title: 'PSBT', section: 'bitcoin-development' },
  { path: '/docs/bitcoin-development/blockchain-monitoring', mdFile: 'app/docs/bitcoin-development/blockchain-monitoring/blockchain-monitoring.md', title: 'Blockchain Monitoring', section: 'bitcoin-development' },
  { path: '/docs/bitcoin-development/pool-mining', mdFile: 'app/docs/bitcoin-development/pool-mining/pool-mining.md', title: 'Pool Mining', section: 'bitcoin-development' },
  { path: '/docs/bitcoin-development/price-tracking', mdFile: 'app/docs/bitcoin-development/price-tracking/price-tracking.md', title: 'Price Tracking', section: 'bitcoin-development' },
  { path: '/docs/bitcoin-development/script-patterns', mdFile: 'app/docs/bitcoin-development/script-patterns/script-patterns.md', title: 'Bitcoin Script Patterns', section: 'bitcoin-development' },
  { path: '/docs/bitcoin-development/miniscript', mdFile: 'app/docs/bitcoin-development/miniscript/miniscript.md', title: 'Miniscript', section: 'bitcoin-development' },

  { path: '/docs/controversies', mdFile: 'app/docs/controversies/overview.md', title: 'Controversies', section: 'controversies' },
  { path: '/docs/controversies/op-return', mdFile: 'app/docs/controversies/op-return/debate.md', title: 'OP_RETURN Debate', section: 'controversies' },
  { path: '/docs/controversies/blocksize-wars', mdFile: 'app/docs/controversies/blocksize-wars/blocksize-wars.md', title: 'Blocksize Wars', section: 'controversies' },
  { path: '/docs/controversies/energy-consumption', mdFile: 'app/docs/controversies/energy-consumption/energy-consumption.md', title: 'Energy Consumption', section: 'controversies' },
  { path: '/docs/controversies/criminal-use', mdFile: 'app/docs/controversies/criminal-use/criminal-use.md', title: 'Bitcoin and Criminal Use', section: 'controversies' },
  { path: '/docs/controversies/mt-gox', mdFile: 'app/docs/controversies/mt-gox/mt-gox.md', title: 'Mt. Gox Collapse', section: 'controversies' },
  { path: '/docs/controversies/craig-wright', mdFile: 'app/docs/controversies/craig-wright/craig-wright.md', title: 'Craig Wright', section: 'controversies' },

  { path: '/docs/advanced', mdFile: 'app/docs/advanced/overview.md', title: 'Advanced Topics', section: 'advanced' },
  { path: '/docs/advanced/atomic-swaps', mdFile: 'app/docs/advanced/atomic-swaps/atomic-swaps.md', title: 'Atomic Swaps', section: 'advanced' },
  { path: '/docs/advanced/dlcs', mdFile: 'app/docs/advanced/dlcs/dlcs.md', title: 'Discreet Log Contracts', section: 'advanced' },
  { path: '/docs/advanced/sidechains', mdFile: 'app/docs/advanced/sidechains/sidechains.md', title: 'Sidechains & Layer 2', section: 'advanced' },
  { path: '/docs/advanced/statechains', mdFile: 'app/docs/advanced/statechains/statechains.md', title: 'Statechains', section: 'advanced' },
  { path: '/docs/advanced/bloom-filters', mdFile: 'app/docs/advanced/bloom-filters/bloom-filters.md', title: 'Bloom Filters', section: 'advanced' },
  { path: '/docs/advanced/governance', mdFile: 'app/docs/advanced/governance/governance.md', title: 'Governance & Evolution', section: 'advanced' },
  { path: '/docs/advanced/zero-conf-channels', mdFile: 'app/docs/advanced/zero-conf-channels/zero-conf-channels.md', title: 'Zero-Conf Channels', section: 'advanced' },
  { path: '/docs/advanced/trampoline-routing', mdFile: 'app/docs/advanced/trampoline-routing/trampoline-routing.md', title: 'Trampoline Routing', section: 'advanced' },
  { path: '/docs/advanced/ordinals-inscriptions', mdFile: 'app/docs/advanced/ordinals-inscriptions/ordinals-inscriptions.md', title: 'Ordinals & Inscriptions', section: 'advanced' },
  { path: '/docs/advanced/covenants', mdFile: 'app/docs/advanced/covenants/covenants.md', title: 'Covenants', section: 'advanced' },

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
    title: 'Setup & Infrastructure',
    description: 'Setup and infrastructure for Bitcoin development, including installation, testing, test networks, libraries, node architecture, and Bitcoin Core internals.',
  },
  'bitcoin-development': {
    title: 'Bitcoin Development',
    description: 'Practical Bitcoin development tasks including PSBT, transaction construction, address generation, key management, blockchain monitoring, and script patterns.',
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
  whitepaper: {
    title: 'Whitepaper',
    description: 'The Bitcoin whitepaper by Satoshi Nakamoto.',
  },
  terminal: {
    title: 'CLI Terminal',
    description: 'Run Bitcoin RPC commands in the browser. No node setup required.',
  },
  'stack-lab': {
    title: 'Stack Lab',
    description: 'Interactive Bitcoin Script playground.',
  },
  author: {
    title: 'About B++',
    description: 'About the B++ project and its creator.',
  },
}

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
    title: 'Setup & Infrastructure',
    href: '/docs/development',
    children: docPages.filter(p => p.section === 'development' && p.path !== '/docs/development').map(p => ({ title: p.title, href: p.path })),
  },
  {
    title: 'Bitcoin Protocol',
    href: '/docs/bitcoin',
    children: docPages.filter(p => p.section === 'bitcoin' && p.path !== '/docs/bitcoin').map(p => ({ title: p.title, href: p.path })),
  },
  {
    title: 'Bitcoin Development',
    href: '/docs/bitcoin-development',
    children: docPages.filter(p => p.section === 'bitcoin-development' && p.path !== '/docs/bitcoin-development').map(p => ({ title: p.title, href: p.path })),
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
]

export const downloadablePaths: Set<string> = new Set(docPages.map(p => p.path))

export const pathToMdFile: Record<string, string> = Object.fromEntries(
  docPages.map(p => [p.path, p.mdFile])
)

// Breadcrumb labels
export const routeLabels: Record<string, string> = {
  terminal: 'CLI Terminal',
  'stack-lab': 'Stack Lab',
  whitepaper: 'Whitepaper',
  author: 'About B++',

  fundamentals: 'Fundamentals',
  history: 'History',
  development: 'Setup & Infrastructure',
  bitcoin: 'Bitcoin Protocol',
  'bitcoin-development': 'Bitcoin Development',
  wallets: 'Wallets',
  mining: 'Mining',
  lightning: 'Lightning Network',
  advanced: 'Advanced Topics',
  controversies: 'Controversies',
  glossary: 'Glossary',

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
  routing: 'Routing Fees',
  htlc: 'HTLCs',
  mpp: 'Multi-Part Payments',
  onion: 'Onion Routing',
  invoices: 'Invoices (BOLT11)',
  'bolt12-offers': 'BOLT12 & Offers',
  watchtowers: 'Watchtowers',
  'anchor-outputs': 'Anchor Outputs',
  'install-bitcoin': 'Installing Bitcoin',
  testing: 'Testing & Debugging',
  testnets: 'Test Networks',
  libraries: 'Libraries & SDKs',
  'node-types': 'Node Types & Architecture',
  'bitcoin-core-internals': 'Bitcoin Core Internals',
  psbt: 'PSBT',
  addresses: 'Address Generation',
  keys: 'Key Management',
  'blockchain-monitoring': 'Blockchain Monitoring',
  'pool-mining': 'Pool Mining',
  'price-tracking': 'Price Tracking',
  'script-patterns': 'Bitcoin Script Patterns',
  miniscript: 'Miniscript',
  segwit: 'SegWit',
  taproot: 'Taproot',
  'p2p-protocol': 'P2P Network Protocol',
  'merkle-trees': 'Merkle Trees',
  'transaction-fees': 'Transaction Fees',
  timelocks: 'Timelocks',
  'transaction-malleability': 'Transaction Malleability',
  'transaction-lifecycle': 'Transaction Lifecycle',
  'sighash-types': 'Sighash Types',
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
  'ordinals-inscriptions': 'Ordinals & Inscriptions',
  covenants: 'Covenants',
  'op-return': 'OP_RETURN Debate',
  'blocksize-wars': 'Blocksize Wars',
  'energy-consumption': 'Energy Consumption',
  'mt-gox': 'Mt. Gox Collapse',
  'craig-wright': 'Craig Wright',
}
