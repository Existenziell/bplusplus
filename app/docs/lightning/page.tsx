import type { Metadata } from 'next'
import DocCard from '@/app/components/DocCard'
import SectionIndexLayout from '@/app/components/SectionIndexLayout'
import { sections } from '@/app/data/navigation'

export const metadata: Metadata = {
  title: 'Lightning Network Documentation | B++',
  description: sections.lightning.description,
  openGraph: {
    title: 'Lightning Network Documentation | B++',
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
        title="Getting Started"
        href="/docs/lightning/basics"
        description="Learn how to set up a Lightning node, open channels, create invoices, and make payments on the Lightning Network."
        links={[
          { href: '/docs/lightning/basics#node-setup', label: 'Node setup' },
          { href: '/docs/lightning/basics#opening-channels', label: 'Opening channels' },
          { href: '/docs/lightning/basics#creating-and-paying-invoices', label: 'Creating and paying invoices' },
          { href: '/docs/lightning/basics#basic-operations', label: 'Basic operations' },
        ]}
      />

      <DocCard
        title="Routing & HTLCs"
        href="/docs/lightning/routing"
        description="Understand how payments route through the Lightning Network using Hash Time Locked Contracts (HTLCs) and routing policies."
        links={[
          { href: '/docs/lightning/routing#what-is-an-htlc', label: 'What is an HTLC' },
          { href: '/docs/lightning/routing#fee-structure', label: 'Fee structure' },
          { href: '/docs/lightning/routing#what-is-mpp', label: 'Multi-part payments (MPP)' },
          { href: '/docs/lightning/routing#tlv-encoding-for-mpp', label: 'TLV encoding' },
        ]}
      />

      <DocCard
        title="Channels"
        href="/docs/lightning/channels"
        description="Learn about payment channels, their lifecycle, funding, closing, and different channel states."
        links={[
          { href: '/docs/lightning/channels#channel-lifecycle', label: 'Channel lifecycle' },
          { href: '/docs/lightning/channels#commitment-transactions', label: 'Commitment transactions' },
          { href: '/docs/lightning/channels#channel-states', label: 'Channel states' },
          { href: '/docs/lightning/channels#channel-management', label: 'Channel management' },
        ]}
      />

      <DocCard
        title="Onion Routing"
        href="/docs/lightning/onion"
        description="Understand how Lightning uses Sphinx onion routing to provide privacy and security for payments."
        links={[
          { href: '/docs/lightning/onion#sphinx-protocol', label: 'Sphinx protocol' },
          { href: '/docs/lightning/onion#onion-packet-structure', label: 'Onion packet structure' },
          { href: '/docs/lightning/onion#privacy-guarantees', label: 'Privacy guarantees' },
          { href: '/docs/lightning/onion#security-properties', label: 'Security properties' },
        ]}
      />
    </SectionIndexLayout>
  )
}
