import DocCard from '../../components/DocCard'

export default function DevelopmentDocsPage() {
  return (
    <div>
      <h1 className="text-5xl font-bold mb-4">Development Tools Documentation</h1>
      <p className="text-xl text-zinc-400 mb-12">
        Tools and techniques for monitoring the blockchain, mining, and tracking Bitcoin prices.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <DocCard
          title="Getting Started"
          href="/docs/development/getting-started"
          description="Introduction to Bitcoin development, including programming languages, development approaches, and essential tools."
          links={[
            { href: '/docs/development/getting-started#programming-languages-in-bitcoin', label: 'Programming languages' },
            { href: '/docs/development/getting-started#development-approaches', label: 'Development approaches' },
            { href: '/docs/development/getting-started#development-networks', label: 'Development networks' },
            { href: '/docs/development/getting-started#essential-tools', label: 'Essential tools' },
          ]}
        />

        <DocCard
          title="Blockchain Monitoring"
          href="/docs/development/monitoring"
          description="Learn how to monitor the Bitcoin blockchain in real-time using ZMQ notifications, detect new blocks, and identify mining pools."
          links={[
            { href: '/docs/development/monitoring#zmq-notifications', label: 'ZMQ notifications' },
            { href: '/docs/development/monitoring#block-detection', label: 'Block detection' },
            { href: '/docs/development/monitoring#mining-pool-identification', label: 'Mining pool identification' },
            { href: '/docs/development/monitoring#op_return-analysis', label: 'OP_RETURN analysis' },
          ]}
        />

        <DocCard
          title="Pool Mining"
          href="/docs/development/mining"
          description="Set up and monitor Bitcoin pool mining, including hash rate tracking, share submission, and reward management."
          links={[
            { href: '/docs/development/mining#mining-software-setup', label: 'Mining software setup' },
            { href: '/docs/development/mining#monitoring-hash-rate', label: 'Monitoring hash rate' },
            { href: '/docs/development/mining#pool-configuration', label: 'Pool configuration' },
            { href: '/docs/development/mining#performance-optimization', label: 'Performance optimization' },
          ]}
        />

        <DocCard
          title="Price Tracking"
          href="/docs/development/tools"
          description="Integrate Bitcoin price data into your applications with API integration, caching strategies, and multi-source fallbacks."
          links={[
            { href: '/docs/development/tools#api-providers', label: 'API providers' },
            { href: '/docs/development/tools#caching-strategies', label: 'Caching strategies' },
            { href: '/docs/development/tools#multi-source-fallbacks', label: 'Multi-source fallbacks' },
            { href: '/docs/development/tools#rate-limiting', label: 'Rate limiting' },
          ]}
        />
      </div>
    </div>
  )
}
