import type { Metadata } from 'next'
import DocCard from '@/app/components/DocCard'
import SectionIndexLayout from '@/app/components/SectionIndexLayout'
import { sections } from '@/app/utils/navigation'

export const metadata: Metadata = {
  title: 'Wallet Development | B++',
  description: sections.wallets.description,
  openGraph: {
    title: 'Wallet Development | B++',
    description: sections.wallets.description,
  },
}

export default function WalletsDocsPage() {
  return (
    <SectionIndexLayout
      title={sections.wallets.title}
      description={sections.wallets.description}
    >
      <DocCard
        title="What is a Wallet?"
        href="/docs/wallets/what-is-a-wallet"
        description="Introduction to Bitcoin wallets, including what they are, different types, how they work, and how to create one."
        links={[
          { href: '/docs/wallets/what-is-a-wallet#overview', label: 'Overview' },
          { href: '/docs/wallets/what-is-a-wallet#types-of-wallets', label: 'Types of wallets' },
          { href: '/docs/wallets/what-is-a-wallet#how-wallets-work', label: 'How wallets work' },
          { href: '/docs/wallets/what-is-a-wallet#creating-a-wallet', label: 'Creating a wallet' },
        ]}
      />

      <DocCard
        title="Coin Selection"
        href="/docs/wallets/coin-selection"
        description="Learn about UTXO selection algorithms, fee calculation, and transaction sizing for efficient wallet operations."
        links={[
          { href: '/docs/wallets/coin-selection#coin-selection-strategies', label: 'Coin selection strategies' },
          { href: '/docs/wallets/coin-selection#fee-calculation', label: 'Fee calculation' },
          { href: '/docs/wallets/coin-selection#utxo-characteristics', label: 'UTXO characteristics' },
          { href: '/docs/wallets/coin-selection#change-output-creation', label: 'Change output creation' },
        ]}
      />

      <DocCard
        title="Multisig"
        href="/docs/wallets/multisig"
        description="Understand multi-signature concepts, script patterns, and how to create and spend from multisig wallets."
        links={[
          { href: '/docs/wallets/multisig#multisig-script-patterns', label: 'Multisig script patterns' },
          { href: '/docs/wallets/multisig#key-management', label: 'Key management' },
          { href: '/docs/wallets/multisig#spending-from-multisig', label: 'Spending from multisig' },
          { href: '/docs/wallets/multisig#security-considerations', label: 'Security considerations' },
        ]}
      />

      <DocCard
        title="Transaction Creation"
        href="/docs/wallets/transactions"
        description="Learn how to construct, sign, and broadcast Bitcoin transactions programmatically."
        links={[
          { href: '/docs/wallets/transactions#transaction-structure', label: 'Transaction structure' },
          { href: '/docs/wallets/transactions#step-by-step-process', label: 'Step-by-step process' },
          { href: '/docs/wallets/transactions#signing-process', label: 'Signing process' },
          { href: '/docs/wallets/transactions#transaction-validation', label: 'Transaction validation' },
        ]}
      />
    </SectionIndexLayout>
  )
}
