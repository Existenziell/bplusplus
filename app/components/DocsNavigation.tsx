'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavItem {
  title: string
  href: string
  children?: NavItem[]
}

const navItems: NavItem[] = [
  {
    title: 'Fundamentals',
    href: '/docs/fundamentals',
    children: [
      { title: 'What is Bitcoin?', href: '/docs/fundamentals/overview' },
      { title: 'Problems Bitcoin Solved', href: '/docs/fundamentals/problems' },
      { title: 'Bitcoin Trilemma', href: '/docs/fundamentals/trilemma' },
      { title: 'Decentralization', href: '/docs/fundamentals/decentralization' },
      { title: 'Trust Model', href: '/docs/fundamentals/trust-model' },
      { title: 'Monetary Properties', href: '/docs/fundamentals/monetary-properties' },
      { title: 'Consensus Mechanism', href: '/docs/fundamentals/consensus' },
    ],
  },
  {
    title: 'Bitcoin',
    href: '/docs/bitcoin',
    children: [
      { title: 'Script System', href: '/docs/bitcoin/script' },
      { title: 'OP Codes', href: '/docs/bitcoin/op-codes' },
      { title: 'RPC Guide', href: '/docs/bitcoin/rpc' },
      { title: 'Block Propagation', href: '/docs/bitcoin/blocks' },
      { title: 'Subsidy Equation', href: '/docs/bitcoin/subsidy' },
    ],
  },
  {
    title: 'Mining',
    href: '/docs/mining',
    children: [
      { title: 'Overview', href: '/docs/mining/overview' },
      { title: 'Proof-of-Work', href: '/docs/mining/proof-of-work' },
      { title: 'Difficulty Adjustment', href: '/docs/mining/difficulty' },
      { title: 'Economics', href: '/docs/mining/economics' },
      { title: 'Mempool', href: '/docs/mining/mempool' },
      { title: 'Block Construction', href: '/docs/mining/block-construction' },
      { title: 'Mining Pools', href: '/docs/mining/pools' },
      { title: 'Hardware Evolution', href: '/docs/mining/hardware' },
      { title: 'Mining Attacks', href: '/docs/mining/attacks' },
    ],
  },
  {
    title: 'Lightning Network',
    href: '/docs/lightning',
    children: [
      { title: 'Getting Started', href: '/docs/lightning/basics' },
      { title: 'Routing', href: '/docs/lightning/routing' },
      { title: 'Channels', href: '/docs/lightning/channels' },
      { title: 'Onion Routing', href: '/docs/lightning/onion' },
    ],
  },
  {
    title: 'Wallets',
    href: '/docs/wallets',
    children: [
      { title: 'Overview', href: '/docs/wallets/overview' },
      { title: 'Coin Selection', href: '/docs/wallets/coin-selection' },
      { title: 'Multisig', href: '/docs/wallets/multisig' },
      { title: 'Transactions', href: '/docs/wallets/transactions' },
    ],
  },
  {
    title: 'Development Tools',
    href: '/docs/development',
    children: [
      { title: 'Getting Started', href: '/docs/development/getting-started' },
      { title: 'Blockchain Monitoring', href: '/docs/development/monitoring' },
      { title: 'Pool Mining', href: '/docs/development/mining' },
      { title: 'Price Tracking', href: '/docs/development/tools' },
    ],
  },
  {
    title: 'History',
    href: '/docs/history',
    children: [
      { title: 'Overview', href: '/docs/history/overview' },
      { title: 'Halvings', href: '/docs/history/halvings' },
      { title: 'Milestones', href: '/docs/history/milestones' },
      { title: 'Forks', href: '/docs/history/forks' },
      { title: 'Supply Schedule', href: '/docs/history/supply' },
      { title: 'BIPs', href: '/docs/history/bips' },
    ],
  },
  {
    title: 'Controversies',
    href: '/docs/controversies',
    children: [
      { title: 'OP_RETURN Debate', href: '/docs/controversies/op-return' },
      { title: 'Blocksize Wars', href: '/docs/controversies/blocksize-wars' },
      { title: 'Energy Consumption', href: '/docs/controversies/energy-consumption' },
      { title: 'Mt. Gox Collapse', href: '/docs/controversies/mt-gox' },
      { title: 'Craig Wright', href: '/docs/controversies/craig-wright' },
    ],
  },
  {
    title: 'Glossary',
    href: '/docs/glossary',
  },
]

export default function DocsNavigation() {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (pathname === href) return true
    // Check if current path starts with this href (for parent sections)
    if (pathname.startsWith(href + '/')) return true
    return false
  }

  return (
    <nav className="w-full md:w-64 flex-shrink-0 md:pr-8">
      <div className="md:sticky md:top-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const itemActive = isActive(item.href)
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block py-1 leading-tight transition-colors ${
                    itemActive
                      ? 'text-btc font-semibold'
                      : 'text-zinc-700 dark:text-zinc-300 hover:text-btc hover:underline'
                  }`}
                >
                  {item.title}
                </Link>
                {item.children && (
                  <ul className="ml-4 mt-1 space-y-0">
                    {item.children.map((child) => {
                      const childActive = pathname === child.href
                      return (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className={`block text-sm py-1 leading-tight transition-colors ${
                              childActive
                                ? 'text-btc font-semibold'
                                : 'text-zinc-600 dark:text-zinc-400 hover:text-btc hover:underline'
                            }`}
                          >
                            {child.title}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
