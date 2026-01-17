import Link from 'next/link'

export default function DevelopmentDocsPage() {
  return (
    <div>
      <h1 className="text-5xl font-bold mb-4">Development Tools Documentation</h1>
      <p className="text-xl text-zinc-400 mb-12">
        Tools and techniques for monitoring the blockchain, mining, and tracking Bitcoin prices.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card">
          <h2 className="text-2xl font-bold mb-4 text-btc">
            <Link href="/docs/development/monitoring">Blockchain Monitoring</Link>
          </h2>
          <p className="mb-4">
            Learn how to monitor the Bitcoin blockchain in real-time using ZMQ notifications, detect new blocks, and identify mining pools.
          </p>
          <ul className="list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-300">
            <li><Link href="/docs/development/monitoring" className="hover:text-btc hover:underline">ZMQ setup and configuration</Link></li>
            <li><Link href="/docs/development/monitoring" className="hover:text-btc hover:underline">Real-time block detection</Link></li>
            <li><Link href="/docs/development/monitoring" className="hover:text-btc hover:underline">Pool identification</Link></li>
            <li><Link href="/docs/development/monitoring" className="hover:text-btc hover:underline">OP_RETURN analysis</Link></li>
          </ul>
        </div>

        <div className="card">
          <h2 className="text-2xl font-bold mb-4 text-btc">
            <Link href="/docs/development/mining">Pool Mining</Link>
          </h2>
          <p className="mb-4">
            Set up and monitor Bitcoin pool mining, including hash rate tracking, share submission, and reward management.
          </p>
          <ul className="list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-300">
            <li><Link href="/docs/development/mining" className="hover:text-btc hover:underline">Mining setup</Link></li>
            <li><Link href="/docs/development/mining" className="hover:text-btc hover:underline">Hash rate monitoring</Link></li>
            <li><Link href="/docs/development/mining" className="hover:text-btc hover:underline">Pool configuration</Link></li>
            <li><Link href="/docs/development/mining" className="hover:text-btc hover:underline">Performance optimization</Link></li>
          </ul>
        </div>

        <div className="card">
          <h2 className="text-2xl font-bold mb-4 text-btc">
            <Link href="/docs/development/tools">Price Tracking</Link>
          </h2>
          <p className="mb-4">
            Integrate Bitcoin price data into your applications with API integration, caching strategies, and multi-source fallbacks.
          </p>
          <ul className="list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-300">
            <li><Link href="/docs/development/tools" className="hover:text-btc hover:underline">API integration</Link></li>
            <li><Link href="/docs/development/tools" className="hover:text-btc hover:underline">Caching strategies</Link></li>
            <li><Link href="/docs/development/tools" className="hover:text-btc hover:underline">Multi-source fallbacks</Link></li>
            <li><Link href="/docs/development/tools" className="hover:text-btc hover:underline">Rate limiting</Link></li>
          </ul>
        </div>
      </div>
    </div>
  )
}
