import type { Metadata } from 'next'
import DocCard from '@/app/components/DocCard'
import SectionIndexLayout from '@/app/components/SectionIndexLayout'
import { sections } from '@/app/utils/navigation'

export const metadata: Metadata = {
  title: 'Bitcoin History | B++',
  description: sections.history.description,
  openGraph: {
    title: 'Bitcoin History | B++',
    description: sections.history.description,
  },
}

export default function HistoryDocsPage() {
  return (
    <SectionIndexLayout
      title={sections.history.title}
      description={sections.history.description}
    >
      <DocCard
        title="Overview"
        href="/docs/history/overview"
        description="Introduction to Bitcoin's history, from its creation in 2009 to its future supply schedule extending into the 22nd century."
        links={[
          { href: '/docs/history/overview#overview', label: 'Overview' },
          { href: '/docs/history/overview#key-historical-events', label: 'Key historical events' },
        ]}
      />

      <DocCard
        title="Halvings"
        href="/docs/history/halvings"
        description="Complete schedule of all Bitcoin halving events, from the first halving in 2012 to the final halving in 2140."
        links={[
          { href: '/docs/history/halvings#complete-halving-schedule', label: 'Complete halving schedule' },
          { href: '/docs/history/halvings#key-facts', label: 'Key facts' },
        ]}
      />

      <DocCard
        title="Milestones"
        href="/docs/history/milestones"
        description="Major milestones in Bitcoin's history, from the first pizza purchase to major exchange launches and protocol upgrades."
        links={[
          { href: '/docs/history/milestones#historical-milestones', label: 'Historical milestones' },
        ]}
      />

      <DocCard
        title="Forks"
        href="/docs/history/forks"
        description="History of Bitcoin forks, including soft forks, hard forks, and their impact on the network."
        links={[
          { href: '/docs/history/forks#understanding-forks', label: 'Understanding forks' },
          { href: '/docs/history/forks#complete-fork-history-table', label: 'Complete fork history' },
          { href: '/docs/history/forks#activation-mechanisms', label: 'Activation mechanisms' },
          { href: '/docs/history/forks#key-takeaways', label: 'Key takeaways' },
        ]}
      />

      <DocCard
        title="Supply Schedule"
        href="/docs/history/supply"
        description="Understand Bitcoin's fixed supply of 21 million BTC, the mathematical formula behind it, and how the supply schedule works."
        links={[
          { href: '/docs/history/supply#supply-formula', label: 'Supply formula' },
          { href: '/docs/history/supply#key-facts', label: 'Key facts' },
          { href: '/docs/history/supply#supply-schedule-breakdown', label: 'Supply schedule breakdown' },
          { href: '/docs/history/supply#after-all-coins-are-issued', label: 'After all coins are issued' },
        ]}
      />

      <DocCard
        title="Bitcoin Improvement Proposals (BIPs)"
        href="/docs/history/bips"
        description="The formal mechanism for proposing changes to Bitcoin, from SegWit to Taproot and wallet standards."
        links={[
          { href: '/docs/history/bips#consensus--protocol-bips', label: 'Consensus & Protocol BIPs' },
          { href: '/docs/history/bips#wallet--key-management-bips', label: 'Wallet & Key Management BIPs' },
          { href: '/docs/history/bips#address-format-bips', label: 'Address Format BIPs' },
          { href: '/docs/history/bips#transaction--script-bips', label: 'Transaction & Script BIPs' },
        ]}
      />
    </SectionIndexLayout>
  )
}
