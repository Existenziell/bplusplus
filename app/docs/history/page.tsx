import Link from 'next/link'

export default function HistoryDocsPage() {
  return (
    <div>
      <h1 className="text-5xl font-bold mb-4">Bitcoin History</h1>
      <p className="text-xl text-zinc-400 mb-12">
        Explore Bitcoin&apos;s history from the Genesis Block to future halvings, including key milestones, events, forks, and the complete supply schedule.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card">
          <h2 className="text-2xl font-bold mb-4 text-btc">
            <Link href="/docs/history/overview">Overview</Link>
          </h2>
          <p className="mb-4">
            Introduction to Bitcoin&apos;s history, from its creation in 2009 to its future supply schedule extending into the 22nd century.
          </p>
          <ul className="list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-300">
            <li><Link href="/docs/history/overview" className="hover:text-btc hover:underline">Bitcoin launch and Genesis Block</Link></li>
            <li><Link href="/docs/history/overview" className="hover:text-btc hover:underline">First transaction</Link></li>
            <li><Link href="/docs/history/overview" className="hover:text-btc hover:underline">Key historical events</Link></li>
            <li><Link href="/docs/history/overview" className="hover:text-btc hover:underline">Halving overview</Link></li>
          </ul>
        </div>

        <div className="card">
          <h2 className="text-2xl font-bold mb-4 text-btc">
            <Link href="/docs/history/halvings">Halvings</Link>
          </h2>
          <p className="mb-4">
            Complete schedule of all Bitcoin halving events, from the first halving in 2012 to the final halving in 2140.
          </p>
          <ul className="list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-300">
            <li><Link href="/docs/history/halvings" className="hover:text-btc hover:underline">Complete halving schedule</Link></li>
            <li><Link href="/docs/history/halvings" className="hover:text-btc hover:underline">Block reward reductions</Link></li>
            <li><Link href="/docs/history/halvings" className="hover:text-btc hover:underline">Historical halvings</Link></li>
            <li><Link href="/docs/history/halvings" className="hover:text-btc hover:underline">Future halving dates</Link></li>
          </ul>
        </div>

        <div className="card">
          <h2 className="text-2xl font-bold mb-4 text-btc">
            <Link href="/docs/history/milestones">Milestones</Link>
          </h2>
          <p className="mb-4">
            Major milestones in Bitcoin&apos;s history, from the first pizza purchase to major exchange launches and protocol upgrades.
          </p>
          <ul className="list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-300">
            <li><Link href="/docs/history/milestones" className="hover:text-btc hover:underline">Key events timeline</Link></li>
            <li><Link href="/docs/history/milestones" className="hover:text-btc hover:underline">Major achievements</Link></li>
            <li><Link href="/docs/history/milestones" className="hover:text-btc hover:underline">Protocol upgrades</Link></li>
            <li><Link href="/docs/history/milestones" className="hover:text-btc hover:underline">Market milestones</Link></li>
          </ul>
        </div>

        <div className="card">
          <h2 className="text-2xl font-bold mb-4 text-btc">
            <Link href="/docs/history/forks">Forks</Link>
          </h2>
          <p className="mb-4">
            Comprehensive history of Bitcoin forks, including soft forks, hard forks, and their impact on the network.
          </p>
          <ul className="list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-300">
            <li><Link href="/docs/history/forks" className="hover:text-btc hover:underline">Soft forks vs hard forks</Link></li>
            <li><Link href="/docs/history/forks" className="hover:text-btc hover:underline">Major fork events</Link></li>
            <li><Link href="/docs/history/forks" className="hover:text-btc hover:underline">Protocol upgrades</Link></li>
            <li><Link href="/docs/history/forks" className="hover:text-btc hover:underline">Chain splits</Link></li>
          </ul>
        </div>

        <div className="card">
          <h2 className="text-2xl font-bold mb-4 text-btc">
            <Link href="/docs/history/supply">Supply Schedule</Link>
          </h2>
          <p className="mb-4">
            Understand Bitcoin&apos;s fixed supply of 21 million BTC, the mathematical formula behind it, and how the supply schedule works.
          </p>
          <ul className="list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-300">
            <li><Link href="/docs/history/supply" className="hover:text-btc hover:underline">21 million cap</Link></li>
            <li><Link href="/docs/history/supply" className="hover:text-btc hover:underline">Supply formula</Link></li>
            <li><Link href="/docs/history/supply" className="hover:text-btc hover:underline">Geometric series</Link></li>
            <li><Link href="/docs/history/supply" className="hover:text-btc hover:underline">Supply timeline</Link></li>
          </ul>
        </div>
      </div>
    </div>
  )
}
