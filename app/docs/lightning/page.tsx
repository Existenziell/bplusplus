import Link from 'next/link'

export default function LightningDocsPage() {
  return (
    <div>
      <h1 className="text-5xl font-bold mb-4">Lightning Network Documentation</h1>
      <p className="text-xl text-zinc-400 mb-12">
        Understand the Lightning Network protocol, including channel management, routing, HTLCs, and onion routing.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card">
          <h2 className="text-2xl font-bold mb-4 text-btc">
            <Link href="/docs/lightning/basics">Getting Started</Link>
          </h2>
          <p className="mb-4">
            Learn how to set up a Lightning node, open channels, create invoices, and make payments on the Lightning Network.
          </p>
          <ul className="list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-300">
            <li><Link href="/docs/lightning/basics" className="hover:text-btc hover:underline">Node setup and configuration</Link></li>
            <li><Link href="/docs/lightning/basics" className="hover:text-btc hover:underline">Channel opening and management</Link></li>
            <li><Link href="/docs/lightning/basics" className="hover:text-btc hover:underline">Invoice creation and payment</Link></li>
            <li><Link href="/docs/lightning/basics" className="hover:text-btc hover:underline">Basic Lightning operations</Link></li>
          </ul>
        </div>

        <div className="card">
          <h2 className="text-2xl font-bold mb-4 text-btc">
            <Link href="/docs/lightning/routing">Routing & HTLCs</Link>
          </h2>
          <p className="mb-4">
            Understand how payments route through the Lightning Network using Hash Time Locked Contracts (HTLCs) and routing policies.
          </p>
          <ul className="list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-300">
            <li><Link href="/docs/lightning/routing" className="hover:text-btc hover:underline">HTLC mechanics</Link></li>
            <li><Link href="/docs/lightning/routing" className="hover:text-btc hover:underline">Fee calculation</Link></li>
            <li><Link href="/docs/lightning/routing" className="hover:text-btc hover:underline">Multi-part payments (MPP)</Link></li>
            <li><Link href="/docs/lightning/routing" className="hover:text-btc hover:underline">TLV encoding</Link></li>
          </ul>
        </div>

        <div className="card">
          <h2 className="text-2xl font-bold mb-4 text-btc">
            <Link href="/docs/lightning/channels">Channels</Link>
          </h2>
          <p className="mb-4">
            Learn about payment channels, their lifecycle, funding, closing, and different channel states.
          </p>
          <ul className="list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-300">
            <li><Link href="/docs/lightning/channels" className="hover:text-btc hover:underline">Channel lifecycle</Link></li>
            <li><Link href="/docs/lightning/channels" className="hover:text-btc hover:underline">Funding transactions</Link></li>
            <li><Link href="/docs/lightning/channels" className="hover:text-btc hover:underline">Channel states</Link></li>
            <li><Link href="/docs/lightning/channels" className="hover:text-btc hover:underline">Channel closing</Link></li>
          </ul>
        </div>

        <div className="card">
          <h2 className="text-2xl font-bold mb-4 text-btc">
            <Link href="/docs/lightning/onion">Onion Routing</Link>
          </h2>
          <p className="mb-4">
            Understand how Lightning uses Sphinx onion routing to provide privacy and security for payments.
          </p>
          <ul className="list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-300">
            <li><Link href="/docs/lightning/onion" className="hover:text-btc hover:underline">Sphinx protocol</Link></li>
            <li><Link href="/docs/lightning/onion" className="hover:text-btc hover:underline">Onion packet structure</Link></li>
            <li><Link href="/docs/lightning/onion" className="hover:text-btc hover:underline">Privacy guarantees</Link></li>
            <li><Link href="/docs/lightning/onion" className="hover:text-btc hover:underline">Route obfuscation</Link></li>
          </ul>
        </div>
      </div>
    </div>
  )
}
