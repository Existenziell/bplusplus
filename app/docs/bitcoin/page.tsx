import type { Metadata } from 'next'
import DocCard from '@/app/components/DocCard'
import SectionIndexLayout from '@/app/components/SectionIndexLayout'
import { sections } from '@/app/data/navigation'

export const metadata: Metadata = {
  title: 'Bitcoin Core Documentation | B++',
  description: sections.bitcoin.description,
  openGraph: {
    title: 'Bitcoin Core Documentation | B++',
    description: sections.bitcoin.description,
  },
}

export default function BitcoinDocsPage() {
  return (
    <SectionIndexLayout
      title={sections.bitcoin.title}
      description={sections.bitcoin.description}
    >
      <DocCard
        title="Script System"
        href="/docs/bitcoin/script"
        description="Understand how Bitcoin Script works, including execution flow, opcodes, and common patterns like P2PKH, P2SH, P2WPKH, and P2TR."
        links={[
          { href: '/docs/bitcoin/script#script-types-evolution', label: 'Script types evolution' },
          { href: '/docs/bitcoin/script#understanding-p2pkh-script-execution', label: 'P2PKH script execution' },
          { href: '/docs/bitcoin/script#reasons-to-lock-transactions', label: 'Locking mechanisms' },
          { href: '/docs/bitcoin/script#key-takeaways', label: 'Key takeaways' },
        ]}
      />

      <DocCard
        title="RPC Guide"
        href="/docs/bitcoin/rpc"
        description="Guide to Bitcoin Core RPC commands for interacting with your node, monitoring status, and managing wallets."
        links={[
          { href: '/docs/bitcoin/rpc#essential-node-information-commands', label: 'Essential node commands' },
          { href: '/docs/bitcoin/rpc#wallet-commands-if-wallet-is-loaded', label: 'Wallet commands' },
          { href: '/docs/bitcoin/rpc#transaction-and-block-commands', label: 'Transaction and block commands' },
          { href: '/docs/bitcoin/rpc#zmq-notifications', label: 'ZMQ notifications' },
        ]}
      />

      <DocCard
        title="Block Propagation"
        href="/docs/bitcoin/blocks"
        description="Understand how blocks propagate through the Bitcoin network, including the gossip protocol, validation, and orphan block handling."
        links={[
          { href: '/docs/bitcoin/blocks#block-propagation-flow', label: 'Block propagation flow' },
          { href: '/docs/bitcoin/blocks#orphan-block-scenarios', label: 'Orphan block scenarios' },
          { href: '/docs/bitcoin/blocks#network-topology', label: 'Network topology' },
          { href: '/docs/bitcoin/blocks#propagation-timing', label: 'Propagation timing' },
        ]}
      />

      <DocCard
        title="OP Codes"
        href="/docs/bitcoin/op-codes"
        description="Reference of Bitcoin Script OP codes with explanations, examples, and common usage patterns."
        links={[
          { href: '/docs/bitcoin/op-codes#stack-operations', label: 'Stack operations' },
          { href: '/docs/bitcoin/op-codes#cryptographic-operations', label: 'Cryptographic operations' },
          { href: '/docs/bitcoin/op-codes#control-flow', label: 'Control flow' },
          { href: '/docs/bitcoin/op-codes#common-script-patterns', label: 'Common script patterns' },
        ]}
      />

      <DocCard
        title="Subsidy Equation"
        href="/docs/bitcoin/subsidy"
        description="Understand Bitcoin's block subsidy formula, halving mechanism, and how the 21 million supply cap is mathematically enforced."
        links={[
          { href: '/docs/bitcoin/subsidy#the-equation', label: 'The equation' },
          { href: '/docs/bitcoin/subsidy#how-it-works', label: 'How it works' },
          { href: '/docs/bitcoin/subsidy#economic-implications', label: 'Economic implications' },
          { href: '/docs/bitcoin/subsidy#key-properties', label: 'Key properties' },
        ]}
      />
    </SectionIndexLayout>
  )
}
