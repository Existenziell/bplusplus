import Link from 'next/link'

export default function ControversiesPage() {
  return (
    <div>
      <h1 className="text-5xl font-bold mb-4">Bitcoin Controversies</h1>
      <p className="text-xl text-zinc-400 mb-12">
        Major debates and controversies that have shaped Bitcoin&apos;s development and community.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card">
          <h2 className="text-2xl font-bold mb-4 text-btc">
            <Link href="/docs/controversies/op-return">OP_RETURN Debate</Link>
          </h2>
          <p className="mb-4">
            The ongoing debate about OP_RETURN data storage limits, Bitcoin Core v30 changes, and the philosophical divide between &quot;sound money&quot; and &quot;platform&quot; visions.
          </p>
          <ul className="list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-300">
            <li>Technical implementation</li>
            <li>Historical context</li>
            <li>Community debate</li>
            <li>Bitcoin Core v30 changes</li>
          </ul>
        </div>

        <div className="card">
          <h2 className="text-2xl font-bold mb-4 text-btc">
            <Link href="/docs/controversies/blocksize-wars">Blocksize Wars</Link>
          </h2>
          <p className="mb-4">
            The 2015-2017 controversy over increasing Bitcoin&apos;s block size limit, which led to the Bitcoin Cash hard fork and shaped Bitcoin&apos;s scaling philosophy.
          </p>
          <ul className="list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-300">
            <li>Big blockers vs small blockers</li>
            <li>Bitcoin Cash fork</li>
            <li>SegWit activation</li>
            <li>Impact on Bitcoin</li>
          </ul>
        </div>

        <div className="card">
          <h2 className="text-2xl font-bold mb-4 text-btc">
            <Link href="/docs/controversies/energy-consumption">Energy Consumption</Link>
          </h2>
          <p className="mb-4">
            The debate over Bitcoin&apos;s energy consumption, including comparisons with other industries, renewable energy usage, and the role of energy in network security.
          </p>
          <ul className="list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-300">
            <li>Energy as security feature</li>
            <li>Renewable energy adoption</li>
            <li>Global energy comparisons</li>
            <li>Environmental concerns</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
