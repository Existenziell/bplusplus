'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface BreadcrumbItem {
  label: string
  href: string
}

const routeLabels: Record<string, string> = {
  bitcoin: 'Bitcoin',
  mining: 'Mining',
  lightning: 'Lightning Network',
  wallets: 'Wallets',
  development: 'Development Tools',
  history: 'History',
  controversies: 'Controversies',
  glossary: 'Glossary',
  script: 'Script System',
  'op-codes': 'OP Codes',
  rpc: 'RPC Guide',
  blocks: 'Block Propagation',
  subsidy: 'Subsidy Equation',
  'proof-of-work': 'Proof-of-Work',
  economics: 'Economics',
  troubleshooting: 'Troubleshooting',
  overview: 'Overview',
  halvings: 'Halvings',
  milestones: 'Milestones',
  forks: 'Forks',
  supply: 'Supply Schedule',
  basics: 'Getting Started',
  routing: 'Routing & HTLCs',
  channels: 'Channels',
  onion: 'Onion Routing',
  'coin-selection': 'Coin Selection',
  multisig: 'Multisig',
  transactions: 'Transactions',
  monitoring: 'Blockchain Monitoring',
  tools: 'Price Tracking',
  'op-return': 'OP_RETURN Debate',
  'blocksize-wars': 'Blocksize Wars',
  'energy-consumption': 'Energy Consumption',
}

export default function Breadcrumbs() {
  const pathname = usePathname()

  // Don't show breadcrumbs on homepage
  if (pathname === '/') {
    return null
  }

  // Build breadcrumb items
  const pathSegments = pathname.split('/').filter(Boolean)
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', href: '/' }
  ]

  // Build path incrementally
  let currentPath = ''
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`

    // Skip 'docs' segment
    if (segment === 'docs') {
      return
    }

    const label = routeLabels[segment] || segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')

    breadcrumbs.push({
      label,
      href: currentPath
    })
  })

  return (
    <nav className="mb-4 md:mb-6 mt-2" aria-label="Breadcrumb">
      <ol className="flex items-center flex-wrap space-x-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
        {breadcrumbs.map((crumb, index) => (
          <li key={crumb.href} className="flex items-center">
            {index > 0 && (
              <span className="mx-2 text-zinc-500 dark:text-zinc-500">/</span>
            )}
            {index === breadcrumbs.length - 1 ? (
              <span className="text-zinc-800 dark:text-zinc-300">{crumb.label}</span>
            ) : (
              <Link
                href={crumb.href}
                className="hover:text-btc hover:underline transition-colors text-zinc-700 dark:text-zinc-400"
              >
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
