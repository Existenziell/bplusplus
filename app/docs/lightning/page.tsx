import type { Metadata } from 'next'
import DocCard from '@/app/components/DocCard'
import SectionIndexLayout from '@/app/components/SectionIndexLayout'
import { sections } from '@/app/utils/navigation'

export const metadata: Metadata = {
  title: 'Lightning Network | B++',
  description: sections.lightning.description,
  openGraph: {
    title: 'Lightning Network | B++',
    description: sections.lightning.description,
  },
}

export default function LightningDocsPage() {
  return (
    <SectionIndexLayout
      title={sections.lightning.title}
      description={sections.lightning.description}
    >
      <DocCard
        title="What is the Lightning Network?"
        href="/docs/lightning/what-is-lightning"
        description="Introduction to the Lightning Network, its history, key concepts, and getting started with node setup."
        links={[
          { href: '/docs/lightning/what-is-lightning#history', label: 'History' },
          { href: '/docs/lightning/what-is-lightning#how-it-works', label: 'How it works' },
          { href: '/docs/lightning/what-is-lightning#getting-started-with-lightning', label: 'Getting started' },
          { href: '/docs/lightning/what-is-lightning#opening-channels', label: 'Opening channels' },
        ]}
      />

      <DocCard
        title="Channels"
        href="/docs/lightning/channels"
        description="Learn about payment channels, their lifecycle, commitment transactions, and channel management."
        links={[
          { href: '/docs/lightning/channels#channel-lifecycle', label: 'Channel lifecycle' },
          { href: '/docs/lightning/channels#commitment-transactions', label: 'Commitment transactions' },
          { href: '/docs/lightning/channels#channel-balance-queries', label: 'Balance queries' },
          { href: '/docs/lightning/channels#channel-security', label: 'Channel security' },
        ]}
      />

      <DocCard
        title="Routing & HTLCs"
        href="/docs/lightning/routing"
        description="Understand how payments route through the Lightning Network using Hash Time-Locked Contracts (HTLCs) and routing fees."
        links={[
          { href: '/docs/lightning/routing#what-is-an-htlc', label: 'What is an HTLC' },
          { href: '/docs/lightning/routing#fee-structure', label: 'Fee structure' },
          { href: '/docs/lightning/routing#what-is-mpp', label: 'Multi-part payments (MPP)' },
          { href: '/docs/lightning/routing#tlv-encoding-for-mpp', label: 'TLV encoding' },
        ]}
      />

      <DocCard
        title="Onion Routing"
        href="/docs/lightning/onion"
        description="Understand how Lightning uses Sphinx onion routing to provide privacy and security for payments."
        links={[
          { href: '/docs/lightning/onion#sphinx-protocol', label: 'Sphinx protocol' },
          { href: '/docs/lightning/onion#shared-secret-derivation', label: 'Shared secrets' },
          { href: '/docs/lightning/onion#privacy-guarantees', label: 'Privacy guarantees' },
          { href: '/docs/lightning/onion#security-properties', label: 'Security properties' },
        ]}
      />

      <DocCard
        title="Invoices (BOLT11)"
        href="/docs/lightning/invoices"
        description="Learn about Lightning payment requests, their encoding format, and how to create and parse invoices."
        links={[
          { href: '/docs/lightning/invoices#invoice-structure', label: 'Invoice structure' },
          { href: '/docs/lightning/invoices#human-readable-part', label: 'Human-readable part' },
          { href: '/docs/lightning/invoices#parsing-invoices', label: 'Parsing invoices' },
          { href: '/docs/lightning/invoices#route-hints', label: 'Route hints' },
        ]}
      />

      <DocCard
        title="Watchtowers"
        href="/docs/lightning/watchtowers"
        description="Third-party services that monitor the blockchain for channel breaches when your node is offline."
        links={[
          { href: '/docs/lightning/watchtowers#how-watchtowers-work', label: 'How they work' },
          { href: '/docs/lightning/watchtowers#privacy-considerations', label: 'Privacy' },
          { href: '/docs/lightning/watchtowers#watchtower-implementations', label: 'Implementations' },
          { href: '/docs/lightning/watchtowers#setup-example-lnd', label: 'Setup example' },
        ]}
      />

      <DocCard
        title="Anchor Outputs"
        href="/docs/lightning/anchor-outputs"
        description="Modern channel format that enables dynamic fee adjustment through CPFP fee bumping."
        links={[
          { href: '/docs/lightning/anchor-outputs#the-fee-problem', label: 'The fee problem' },
          { href: '/docs/lightning/anchor-outputs#how-anchor-outputs-work', label: 'How it works' },
          { href: '/docs/lightning/anchor-outputs#cpfp-fee-bumping', label: 'CPFP fee bumping' },
          { href: '/docs/lightning/anchor-outputs#channel-types', label: 'Channel types' },
        ]}
      />

      <DocCard
        title="Zero-Conf Channels"
        href="/docs/lightning/zero-conf"
        description="Instant channel opening without waiting for blockchain confirmations."
        links={[
          { href: '/docs/lightning/zero-conf#how-zero-conf-works', label: 'How it works' },
          { href: '/docs/lightning/zero-conf#trust-model', label: 'Trust model' },
          { href: '/docs/lightning/zero-conf#use-cases', label: 'Use cases' },
          { href: '/docs/lightning/zero-conf#security-considerations', label: 'Security' },
        ]}
      />

      <DocCard
        title="Trampoline Routing"
        href="/docs/lightning/trampoline"
        description="Delegated pathfinding for lightweight clients that cannot maintain the full network graph."
        links={[
          { href: '/docs/lightning/trampoline#the-mobile-routing-problem', label: 'The problem' },
          { href: '/docs/lightning/trampoline#how-trampoline-works', label: 'How it works' },
          { href: '/docs/lightning/trampoline#privacy-trade-offs', label: 'Privacy trade-offs' },
          { href: '/docs/lightning/trampoline#current-support', label: 'Current support' },
        ]}
      />
    </SectionIndexLayout>
  )
}
