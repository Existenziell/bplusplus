import type { Metadata } from 'next'
import DocCard from '@/app/components/DocCard'
import SectionIndexLayout from '@/app/components/SectionIndexLayout'
import { sections } from '@/app/utils/navigation'

export const metadata: Metadata = {
  title: 'Mining | B++',
  description: sections.mining.description,
  openGraph: {
    title: 'Mining | B++',
    description: sections.mining.description,
  },
}

export default function MiningDocsPage() {
  return (
    <SectionIndexLayout
      title={sections.mining.title}
      description={sections.mining.description}
    >
      <DocCard
        title="Overview"
        href="/docs/mining/overview"
        description="Introduction to Bitcoin mining, including architecture, key concepts, and how the mining process works."
        links={[
          { href: '/docs/mining/overview#what-is-bitcoin-mining', label: 'What is Bitcoin mining' },
          { href: '/docs/mining/overview#how-mining-works', label: 'How mining works' },
          { href: '/docs/mining/overview#key-concepts', label: 'Key concepts' },
        ]}
      />

      <DocCard
        title="Proof-of-Work"
        href="/docs/mining/proof-of-work"
        description="Understand how the Bitcoin mining algorithm works, including hash functions, nonce searching, and block validation."
        links={[
          { href: '/docs/mining/proof-of-work#how-it-works', label: 'How it works' },
          { href: '/docs/mining/proof-of-work#hash-function-sha256d', label: 'SHA-256 hashing' },
          { href: '/docs/mining/proof-of-work#mining-difficulty', label: 'Mining difficulty' },
          { href: '/docs/mining/proof-of-work#mining-process-flow', label: 'Mining process flow' },
        ]}
      />

      <DocCard
        title="Difficulty Adjustment"
        href="/docs/mining/difficulty"
        description="Learn how Bitcoin automatically adjusts mining difficulty every 2016 blocks to maintain ~10 minute block times."
        links={[
          { href: '/docs/mining/difficulty#how-difficulty-adjustment-works', label: 'How it works' },
          { href: '/docs/mining/difficulty#why-difficulty-adjustment-exists', label: 'Why it exists' },
          { href: '/docs/mining/difficulty#impact-on-miners', label: 'Impact on miners' },
          { href: '/docs/mining/difficulty#historical-difficulty-adjustments', label: 'Historical trends' },
        ]}
      />

      <DocCard
        title="Economics"
        href="/docs/mining/economics"
        description="Explore the economic incentives behind Bitcoin mining, including block rewards, transaction fees, and profitability calculations."
        links={[
          { href: '/docs/mining/economics#block-rewards', label: 'Block rewards' },
          { href: '/docs/mining/economics#mining-profitability-factors', label: 'Profitability factors' },
          { href: '/docs/mining/economics#pool-mining-economics', label: 'Pool mining economics' },
          { href: '/docs/mining/economics#cost-analysis', label: 'Cost analysis' },
        ]}
      />

      <DocCard
        title="Mempool"
        href="/docs/mining/mempool"
        description="Understand the mempool—Bitcoin's waiting room for unconfirmed transactions, fee markets, and transaction prioritization."
        links={[
          { href: '/docs/mining/mempool#how-the-mempool-works', label: 'How it works' },
          { href: '/docs/mining/mempool#fee-market-dynamics', label: 'Fee market dynamics' },
          { href: '/docs/mining/mempool#replace-by-fee-rbf', label: 'Replace-by-Fee (RBF)' },
          { href: '/docs/mining/mempool#child-pays-for-parent-cpfp', label: 'Child Pays for Parent (CPFP)' },
        ]}
      />

      <DocCard
        title="Block Construction"
        href="/docs/mining/block-construction"
        description="Learn how miners build blocks, from transaction selection to Merkle tree construction and the coinbase transaction."
        links={[
          { href: '/docs/mining/block-construction#transaction-selection', label: 'Transaction selection' },
          { href: '/docs/mining/block-construction#the-coinbase-transaction', label: 'Coinbase transaction' },
          { href: '/docs/mining/block-construction#constructing-the-merkle-root', label: 'Merkle tree construction' },
          { href: '/docs/mining/block-construction#block-weight-and-segwit', label: 'Block weight and SegWit' },
        ]}
      />

      <DocCard
        title="Mining Pools"
        href="/docs/mining/pools"
        description="Explore how mining pools work, including payout schemes, pool protocols, and centralization concerns."
        links={[
          { href: '/docs/mining/pools#why-mining-pools-exist', label: 'Why pools exist' },
          { href: '/docs/mining/pools#payout-schemes', label: 'Payout schemes' },
          { href: '/docs/mining/pools#pool-protocols', label: 'Pool protocols' },
          { href: '/docs/mining/pools#centralization-concerns', label: 'Centralization concerns' },
        ]}
      />

      <DocCard
        title="Hardware Evolution"
        href="/docs/mining/hardware"
        description="The history of mining hardware from CPUs to ASICs, including efficiency metrics and the modern mining landscape."
        links={[
          { href: '/docs/mining/hardware#the-four-eras-of-mining-hardware', label: 'The four eras of hardware' },
          { href: '/docs/mining/hardware#asic-evolution', label: 'ASIC evolution' },
          { href: '/docs/mining/hardware#efficiency-metrics', label: 'Efficiency metrics' },
          { href: '/docs/mining/hardware#home-mining', label: 'Home mining' },
        ]}
      />

      <DocCard
        title="Mining Attacks"
        href="/docs/mining/attacks"
        description="Understanding potential attacks on Bitcoin mining and why the economics make them irrational."
        links={[
          { href: '/docs/mining/attacks#the-51-attack', label: '51% attack' },
          { href: '/docs/mining/attacks#selfish-mining', label: 'Selfish mining' },
          { href: '/docs/mining/attacks#block-withholding-attack', label: 'Block withholding' },
          { href: '/docs/mining/attacks#eclipse-attack', label: 'Eclipse attack' },
        ]}
      />
    </SectionIndexLayout>
  )
}
