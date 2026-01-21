import type { Metadata } from 'next'
import DocCard from '@/app/components/DocCard'
import SectionIndexLayout from '@/app/components/SectionIndexLayout'
import { sections } from '@/app/utils/navigation'

export const metadata: Metadata = {
  title: 'Bitcoin Fundamentals | B++',
  description: sections.fundamentals.description,
  openGraph: {
    title: 'Bitcoin Fundamentals | B++',
    description: sections.fundamentals.description,
  },
}

export default function FundamentalsDocsPage() {
  return (
    <SectionIndexLayout
      title={sections.fundamentals.title}
      description={sections.fundamentals.description}
    >
      <DocCard
        title="What is Bitcoin?"
        href="/docs/fundamentals/what-is-bitcoin"
        description="High-level introduction to Bitcoin, including what it is, how it works, and what makes it unique."
        links={[
          { href: '/docs/fundamentals/what-is-bitcoin#core-definition', label: 'Core definition' },
          { href: '/docs/fundamentals/what-is-bitcoin#how-bitcoin-works', label: 'How Bitcoin works' },
          { href: '/docs/fundamentals/what-is-bitcoin#technical-innovation', label: 'Technical innovation' },
        ]}
      />

      <DocCard
        title="Problems Bitcoin Solved"
        href="/docs/fundamentals/problems"
        description="Explore the fundamental problems Bitcoin was designed to solve, including the double-spending problem and the Two Generals problem."
        links={[
          { href: '/docs/fundamentals/problems#distributed-networks', label: 'Distributed networks' },
          { href: '/docs/fundamentals/problems#the-double-spending-problem', label: 'Double-spending problem' },
          { href: '/docs/fundamentals/problems#the-two-generals-problem', label: 'Two Generals problem' },
          { href: '/docs/fundamentals/problems#other-problems-bitcoin-solved', label: 'Other solved problems' },
        ]}
      />

      <DocCard
        title="Decentralization"
        href="/docs/fundamentals/decentralization"
        description="Why decentralization matters, how Bitcoin achieves it, and the trade-offs between scalability, security, and decentralization."
        links={[
          { href: '/docs/fundamentals/decentralization#what-decentralization-means', label: 'What decentralization means' },
          { href: '/docs/fundamentals/decentralization#how-bitcoin-achieves-decentralization', label: 'How Bitcoin achieves it' },
          { href: '/docs/fundamentals/decentralization#the-bitcoin-trilemma', label: 'The Bitcoin Trilemma' },
          { href: '/docs/fundamentals/decentralization#threats-to-decentralization', label: 'Threats to decentralization' },
        ]}
      />

      <DocCard
        title="Trust Model"
        href="/docs/fundamentals/trust-model"
        description="How Bitcoin eliminates the need for trust in intermediaries through cryptographic proof and economic incentives."
        links={[
          { href: '/docs/fundamentals/trust-model#traditional-trust-model', label: 'Traditional trust model' },
          { href: '/docs/fundamentals/trust-model#bitcoins-trustless-model', label: "Bitcoin's trustless model" },
          { href: '/docs/fundamentals/trust-model#trust-assumptions-in-bitcoin', label: 'Trust assumptions in Bitcoin' },
          { href: '/docs/fundamentals/trust-model#trust-minimization-techniques', label: 'Trust minimization' },
        ]}
      />

      <DocCard
        title="Monetary Properties"
        href="/docs/fundamentals/monetary-properties"
        description="The six key monetary properties of Bitcoin: scarcity, divisibility, portability, durability, fungibility, and acceptability."
        links={[
          { href: '/docs/fundamentals/monetary-properties#the-six-monetary-properties', label: 'The six properties' },
          { href: '/docs/fundamentals/monetary-properties#comparison-to-traditional-money', label: 'Comparison to traditional money' },
          { href: '/docs/fundamentals/monetary-properties#economic-properties', label: 'Economic properties' },
          { href: '/docs/fundamentals/monetary-properties#additional-properties', label: 'Additional properties' },
        ]}
      />
    </SectionIndexLayout>
  )
}
