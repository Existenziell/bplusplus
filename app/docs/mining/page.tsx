import Link from 'next/link'

export default function MiningDocsPage() {
  return (
    <div>
      <h1 className="text-5xl font-bold mb-4">Mining Documentation</h1>
      <p className="text-xl text-zinc-400 mb-12">
        Learn about proof-of-work, block construction, pool mining, and the economic incentives that secure the Bitcoin network.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card">
          <h2 className="text-2xl font-bold mb-4 text-btc">
            <Link href="/docs/mining/overview">Overview</Link>
          </h2>
          <p className="mb-4">
            Introduction to Bitcoin mining, including architecture, key concepts, and how the mining process works.
          </p>
          <ul className="list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-300">
            <li><Link href="/docs/mining/overview" className="hover:text-btc hover:underline">Mining architecture</Link></li>
            <li><Link href="/docs/mining/overview" className="hover:text-btc hover:underline">Key concepts</Link></li>
            <li><Link href="/docs/mining/overview" className="hover:text-btc hover:underline">Data flow</Link></li>
            <li><Link href="/docs/mining/overview" className="hover:text-btc hover:underline">Pool mining basics</Link></li>
          </ul>
        </div>

        <div className="card">
          <h2 className="text-2xl font-bold mb-4 text-btc">
            <Link href="/docs/mining/proof-of-work">Proof-of-Work</Link>
          </h2>
          <p className="mb-4">
            Understand how the Bitcoin mining algorithm works, including hash functions, nonce searching, and block validation.
          </p>
          <ul className="list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-300">
            <li><Link href="/docs/mining/proof-of-work" className="hover:text-btc hover:underline">SHA-256 hashing</Link></li>
            <li><Link href="/docs/mining/proof-of-work" className="hover:text-btc hover:underline">Nonce searching</Link></li>
            <li><Link href="/docs/mining/proof-of-work" className="hover:text-btc hover:underline">Block validation</Link></li>
            <li><Link href="/docs/mining/proof-of-work" className="hover:text-btc hover:underline">Network security</Link></li>
          </ul>
        </div>

        <div className="card">
          <h2 className="text-2xl font-bold mb-4 text-btc">
            <Link href="/docs/mining/difficulty">Difficulty Adjustment</Link>
          </h2>
          <p className="mb-4">
            Learn how Bitcoin automatically adjusts mining difficulty every 2016 blocks to maintain ~10 minute block times.
          </p>
          <ul className="list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-300">
            <li><Link href="/docs/mining/difficulty" className="hover:text-btc hover:underline">Adjustment mechanism</Link></li>
            <li><Link href="/docs/mining/difficulty" className="hover:text-btc hover:underline">Target block time</Link></li>
            <li><Link href="/docs/mining/difficulty" className="hover:text-btc hover:underline">Impact on miners</Link></li>
            <li><Link href="/docs/mining/difficulty" className="hover:text-btc hover:underline">Historical trends</Link></li>
          </ul>
        </div>

        <div className="card">
          <h2 className="text-2xl font-bold mb-4 text-btc">
            <Link href="/docs/mining/economics">Economics</Link>
          </h2>
          <p className="mb-4">
            Explore the economic incentives behind Bitcoin mining, including block rewards, transaction fees, and profitability calculations.
          </p>
          <ul className="list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-300">
            <li><Link href="/docs/mining/economics" className="hover:text-btc hover:underline">Block rewards and halvings</Link></li>
            <li><Link href="/docs/mining/economics" className="hover:text-btc hover:underline">Transaction fees</Link></li>
            <li><Link href="/docs/mining/economics" className="hover:text-btc hover:underline">Mining profitability</Link></li>
            <li><Link href="/docs/mining/economics" className="hover:text-btc hover:underline">Hash rate economics</Link></li>
          </ul>
        </div>
      </div>
    </div>
  )
}
