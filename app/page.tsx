'use client'

import Footer from './components/Footer'
import Header from './components/Header'
import DocCard from './components/DocCard'
import { useEffect, useState } from 'react'

export default function Home() {
  const quotes = [
    // Original quotes
    "Fiat means 'Only the elite can print money'. Crypto means 'Everyone can print money'. Bitcoin means 'No one can print money'",
    "Bitcoin is a titanic base layer of absolute truth, robust enough to carry the entire world economy on its shoulders.",
    "Bitcoin is nothing but mathematics and decentralized communication. It requires no army to defend, no borders to enforce, no politicians to maintain.",
    "Bitcoin is a trust machine. It replaces trust in institutions with mathematical verification.",
    "Bitcoin is a protocol that allows for free and instant transfers of value across the entire planet. Trustless, Permissionless.",
    "Nothing in this world is more powerful than an idea. Bitcoin is that idea. It is unstoppable.",
    "Never ending wars are the consensus mechanism for the FIAT system.",
    "Bitcoin is deflationary money with absolute scarcity. Scarcity will produce beautiful unseen conditions of human interaction, abundance and deflation.",
    "Bitcoin fixes this.",
    // Satoshi Nakamoto
    "The root problem with conventional currency is all the trust that's required to make it work. — Satoshi Nakamoto",
    "I've been working on a new electronic cash system that's fully peer-to-peer, with no trusted third party. — Satoshi Nakamoto",
    "If you don't believe it or don't get it, I don't have the time to try to convince you, sorry. — Satoshi Nakamoto",
    "It might make sense just to get some in case it catches on. — Satoshi Nakamoto",
    "Lost coins only make everyone else's coins worth slightly more. Think of it as a donation to everyone. — Satoshi Nakamoto",
    // Hal Finney
    "Bitcoin seems to be a very promising idea. I like the idea of basing security on the assumption that the CPU power of honest participants outweighs that of the attacker. — Hal Finney",
    "The computer can be used as a tool to liberate and protect people, rather than to control them. — Hal Finney",
  ]

  const [quote, setQuote] = useState<string>('')
  useEffect(() => {
    const getRandomQuote = () => quotes[Math.floor(Math.random() * quotes.length)]
    setQuote(getRandomQuote())
    const interval = setInterval(() => {
      setQuote(getRandomQuote())
    }, 10000)
    return () => clearInterval(interval)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main className="min-h-screen bg-gradient-linear from-zinc-100 via-zinc-50 to-zinc-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 text-zinc-800 dark:text-zinc-200">
      <Header />

      {/* Content Area */}
      <div className="container mx-auto px-4 md:px-8 py-4 md:py-8">
        <div>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8 text-center max-w-4xl mx-auto italic min-h-[4rem] md:min-h-[4rem]">
            {quote && <>&quot;{quote}&quot;</>}
          </p>

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
              title="Bitcoin Core"
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
                { href: '/docs/mining/proof-of-work', label: 'Proof-of-work mechanism' },
                { href: '/docs/mining/overview', label: 'Block construction' },
                { href: '/docs/mining/pools', label: 'Pool mining setup' },
                { href: '/docs/mining/economics', label: 'Mining economics' },
              ]}
            />

            <DocCard
              title="Lightning Network"
              href="/docs/lightning"
              description="Understand the Lightning Network protocol, including channel management, routing, HTLCs, and onion routing."
              links={[
                { href: '/docs/lightning/basics', label: 'Getting Started' },
                { href: '/docs/lightning/routing', label: 'Routing & HTLCs' },
                { href: '/docs/lightning/channels', label: 'Channels' },
                { href: '/docs/lightning/onion', label: 'Onion Routing' },
              ]}
            />

            <DocCard
              title="Wallet Development"
              href="/docs/wallets"
              description="Build Bitcoin wallets with proper coin selection, multisig support, and transaction construction."
              links={[
                { href: '/docs/wallets/coin-selection', label: 'Coin Selection' },
                { href: '/docs/wallets/multisig', label: 'Multisig' },
                { href: '/docs/wallets/transactions', label: 'Transaction Creation' },
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
              title="History"
              href="/docs/history"
              description="Explore Bitcoin's history from the Genesis Block to future halvings, including key milestones, events, and the complete supply schedule."
              links={[
                { href: '/docs/history/overview', label: 'Overview' },
                { href: '/docs/history/milestones', label: 'Key Milestones' },
                { href: '/docs/history/halvings', label: 'Halvings' },
                { href: '/docs/history/supply', label: 'Supply Schedule' },
              ]}
            />

            <DocCard
              title="Controversies"
              href="/docs/controversies"
              description="Major debates and controversies that have shaped Bitcoin's development, including the OP_RETURN debate and Blocksize Wars."
              links={[
                { href: '/docs/controversies/op-return', label: 'OP_RETURN Debate' },
                { href: '/docs/controversies/blocksize-wars', label: 'Blocksize Wars' },
                { href: '/docs/controversies/mt-gox', label: 'Mt. Gox Collapse' },
                { href: '/docs/controversies/craig-wright', label: 'Craig Wright / "Faketoshi"' },
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
