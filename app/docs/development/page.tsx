import type { Metadata } from 'next'
import DocCard from '@/app/components/DocCard'
import SectionIndexLayout from '@/app/components/SectionIndexLayout'
import { sections } from '@/app/utils/navigation'

export const metadata: Metadata = {
  title: 'Development Tools | B++',
  description: sections.development.description,
  openGraph: {
    title: 'Development Tools | B++',
    description: sections.development.description,
  },
}

export default function DevelopmentDocsPage() {
  return (
    <SectionIndexLayout
      title={sections.development.title}
      description={sections.development.description}
    >
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
        href="/docs/development/blockchain-monitoring"
        description="Learn how to monitor the Bitcoin blockchain in real-time using ZMQ notifications, detect new blocks, and identify mining pools."
        links={[
          { href: '/docs/development/blockchain-monitoring#zmq-notifications', label: 'ZMQ notifications' },
          { href: '/docs/development/blockchain-monitoring#block-detection', label: 'Block detection' },
          { href: '/docs/development/blockchain-monitoring#mining-pool-identification', label: 'Mining pool identification' },
          { href: '/docs/development/blockchain-monitoring#op_return-analysis', label: 'OP_RETURN analysis' },
        ]}
      />

      <DocCard
        title="Pool Mining"
        href="/docs/development/pool-mining"
        description="Set up and monitor Bitcoin pool mining, including hash rate tracking, share submission, and reward management."
        links={[
          { href: '/docs/development/pool-mining#mining-software-setup', label: 'Mining software setup' },
          { href: '/docs/development/pool-mining#monitoring-hash-rate', label: 'Monitoring hash rate' },
          { href: '/docs/development/pool-mining#pool-configuration', label: 'Pool configuration' },
          { href: '/docs/development/pool-mining#performance-optimization', label: 'Performance optimization' },
        ]}
      />

      <DocCard
        title="Price Tracking"
        href="/docs/development/price-tracking"
        description="Integrate Bitcoin price data into your applications with API integration, caching strategies, and multi-source fallbacks."
        links={[
          { href: '/docs/development/price-tracking#api-providers', label: 'API providers' },
          { href: '/docs/development/price-tracking#caching-strategies', label: 'Caching strategies' },
          { href: '/docs/development/price-tracking#multi-source-fallbacks', label: 'Multi-source fallbacks' },
          { href: '/docs/development/price-tracking#rate-limiting', label: 'Rate limiting' },
        ]}
      />
    </SectionIndexLayout>
  )
}
