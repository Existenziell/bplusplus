import Link from 'next/link'

export default function FundamentalsDocsPage() {
  return (
    <div>
      <h1 className="text-5xl font-bold mb-4">Bitcoin Fundamentals</h1>
      <p className="text-xl text-zinc-400 mb-12">
        Essential concepts and principles that form the foundation of Bitcoin, from high-level overview to core design principles.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card">
          <h2 className="text-2xl font-bold mb-4 text-btc">
            <Link href="/docs/fundamentals/overview">What is Bitcoin?</Link>
          </h2>
          <p className="mb-4">
            High-level introduction to Bitcoin, including what it is, how it works, and what makes it unique.
          </p>
          <ul className="list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-300">
            <li>Core definition and characteristics</li>
            <li>How Bitcoin works</li>
            <li>Key innovations</li>
          </ul>
        </div>

        <div className="card">
          <h2 className="text-2xl font-bold mb-4 text-btc">
            <Link href="/docs/fundamentals/problems">Problems Bitcoin Solved</Link>
          </h2>
          <p className="mb-4">
            Explore the fundamental problems Bitcoin was designed to solve, including the double-spending problem and the Two Generals problem.
          </p>
          <ul className="list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-300">
            <li>Distributed networks</li>
            <li>Double-spending problem</li>
            <li>Two Generals problem</li>
            <li>Other solved problems</li>
          </ul>
        </div>

        <div className="card">
          <h2 className="text-2xl font-bold mb-4 text-btc">
            <Link href="/docs/fundamentals/trilemma">Bitcoin Trilemma</Link>
          </h2>
          <p className="mb-4">
            Understanding the fundamental trade-offs between scalability, security, and decentralization in Bitcoin&apos;s design.
          </p>
          <ul className="list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-300">
            <li>The three pillars</li>
            <li>Trade-offs and solutions</li>
            <li>Layer 2 scaling</li>
            <li>Historical examples</li>
          </ul>
        </div>

        <div className="card">
          <h2 className="text-2xl font-bold mb-4 text-btc">
            <Link href="/docs/fundamentals/decentralization">Decentralization</Link>
          </h2>
          <p className="mb-4">
            Why decentralization matters, how Bitcoin achieves it, and the threats and benefits of a decentralized system.
          </p>
          <ul className="list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-300">
            <li>What is decentralization</li>
            <li>Why it matters</li>
            <li>How Bitcoin achieves it</li>
            <li>Threats and metrics</li>
          </ul>
        </div>

        <div className="card">
          <h2 className="text-2xl font-bold mb-4 text-btc">
            <Link href="/docs/fundamentals/trust-model">Trust Model</Link>
          </h2>
          <p className="mb-4">
            How Bitcoin eliminates the need for trust in intermediaries through cryptographic proof and economic incentives.
          </p>
          <ul className="list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-300">
            <li>Trustless vs trust-based</li>
            <li>Cryptographic proof</li>
            <li>Economic incentives</li>
            <li>Trust minimization</li>
          </ul>
        </div>

        <div className="card">
          <h2 className="text-2xl font-bold mb-4 text-btc">
            <Link href="/docs/fundamentals/monetary-properties">Monetary Properties</Link>
          </h2>
          <p className="mb-4">
            The six key monetary properties of Bitcoin: scarcity, divisibility, portability, durability, fungibility, and acceptability.
          </p>
          <ul className="list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-300">
            <li>The six properties</li>
            <li>Comparison to traditional money</li>
            <li>Economic characteristics</li>
            <li>Store of value vs medium of exchange</li>
          </ul>
        </div>

        <div className="card">
          <h2 className="text-2xl font-bold mb-4 text-btc">
            <Link href="/docs/fundamentals/consensus">Consensus Mechanism</Link>
          </h2>
          <p className="mb-4">
            How Bitcoin achieves agreement among network participants about transaction validity and blockchain state without a central authority.
          </p>
          <ul className="list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-300">
            <li>What is consensus</li>
            <li>Proof-of-work mechanism</li>
            <li>Consensus rules</li>
            <li>Security through consensus</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
