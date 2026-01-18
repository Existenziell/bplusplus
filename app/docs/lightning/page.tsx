import DocCard from '../../components/DocCard'

export default function LightningDocsPage() {
  return (
    <div>
      <h1 className="text-5xl font-bold mb-4">Lightning Network Documentation</h1>
      <p className="text-xl text-zinc-400 mb-12">
        Understand the Lightning Network protocol, including channel management, routing, HTLCs, and onion routing.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
      </div>
    </div>
  )
}
