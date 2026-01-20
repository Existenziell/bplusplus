import Footer from './components/Footer'
import Header from './components/Header'
import DocCard from './components/DocCard'
import QuoteRotator from './components/QuoteRotator'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-linear from-zinc-100 via-zinc-50 to-zinc-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 text-zinc-800 dark:text-zinc-200">
      <Header />

      {/* Content Area */}
      <div className="container mx-auto px-4 md:px-8 py-4 md:py-8">
        <div>
          <QuoteRotator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <DocCard
              title="Fundamentals"
              href="/docs/fundamentals"
              description="Essential concepts and principles that form the foundation of Bitcoin, from high-level overview to core design principles."
              links={[
                { href: '/docs/fundamentals/overview', label: 'What is Bitcoin?' },
                { href: '/docs/fundamentals/trilemma', label: 'Bitcoin Trilemma' },
                { href: '/docs/fundamentals/decentralization', label: 'Decentralization' },
                { href: '/docs/fundamentals/trust-model', label: 'Trust Model' },
              ]}
            />

            <DocCard
              title="History"
              href="/docs/history"
              description="Explore Bitcoin's history from the Genesis Block to future halvings, including key milestones, events, and the complete supply schedule."
              links={[
                { href: '/docs/history/halvings', label: 'Halvings' },
                { href: '/docs/history/milestones', label: 'Milestones' },
                { href: '/docs/history/forks', label: 'Forks' },
                { href: '/docs/history/bips', label: 'BIPs' },
              ]}
            />

            <DocCard
              title="Bitcoin"
              href="/docs/bitcoin"
              description="Learn about Bitcoin's core concepts including script execution, OP codes, RPC interfaces, and block propagation."
              links={[
                { href: '/docs/bitcoin/script', label: 'Script System' },
                { href: '/docs/bitcoin/op-codes', label: 'OP Codes' },
                { href: '/docs/bitcoin/rpc', label: 'RPC Guide' },
                { href: '/docs/bitcoin/blocks', label: 'Block Propagation' },
              ]}
            />

            <DocCard
              title="Mining"
              href="/docs/mining"
              description="Learn about proof-of-work, block construction, pool mining, and the economic incentives that secure the Bitcoin network."
              links={[
                { href: '/docs/mining/proof-of-work', label: 'Proof-of-Work' },
                { href: '/docs/mining/difficulty', label: 'Difficulty Adjustment' },
                { href: '/docs/mining/mempool', label: 'Mempool' },
                { href: '/docs/mining/attacks', label: 'Mining Attacks' },
              ]}
            />

            <DocCard
              title="Wallets"
              href="/docs/wallets"
              description="Build Bitcoin wallets with proper coin selection, multisig support, and transaction construction."
              links={[
                { href: '/docs/wallets/coin-selection', label: 'Coin Selection' },
                { href: '/docs/wallets/multisig', label: 'Multisig' },
                { href: '/docs/wallets/transactions', label: 'Transactions' },
              ]}
            />

            <DocCard
              title="Lightning Network"
              href="/docs/lightning"
              description="Understand the Lightning Network protocol, including channel management, routing, HTLCs, and onion routing."
              links={[
                { href: '/docs/lightning/channels', label: 'Channels' },
                { href: '/docs/lightning/routing', label: 'Routing' },
                { href: '/docs/lightning/onion', label: 'Onion Routing' },
              ]}
            />

            <DocCard
              title="Development Tools"
              href="/docs/development"
              description="Tools and techniques for monitoring the blockchain, mining, and tracking Bitcoin prices."
              links={[
                { href: '/docs/development/monitoring', label: 'Blockchain Monitoring' },
                { href: '/docs/development/mining', label: 'Pool Mining' },
                { href: '/docs/development/tools', label: 'Price Tracking' },
              ]}
            />

            <DocCard
              title="Controversies"
              href="/docs/controversies"
              description="Major debates and controversies that have shaped Bitcoin's development."
              links={[
                { href: '/docs/controversies/op-return', label: 'OP_RETURN Debate' },
                { href: '/docs/controversies/blocksize-wars', label: 'Blocksize Wars' },
                { href: '/docs/controversies/mt-gox', label: 'Mt. Gox Collapse' },
              ]}
            />

            <DocCard
              title="Glossary"
              href="/docs/glossary"
              description="A comprehensive glossary of Bitcoin and Lightning Network development terms, from ASIC to ZMQ."
            />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
