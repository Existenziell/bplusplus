import Link from 'next/link'

export default function BitcoinDocsPage() {
  return (
    <div>
      <h1 className="text-5xl font-bold mb-4">Bitcoin Core Documentation</h1>
      <p className="text-xl text-zinc-400 mb-12">
        Learn about Bitcoin&apos;s core concepts including script execution, OP codes, RPC interfaces, and block propagation.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card">
          <h2 className="text-2xl font-bold mb-4 text-btc">
            <Link href="/docs/bitcoin/script">Script System</Link>
          </h2>
          <p className="mb-4">
            Understand how Bitcoin Script works, including execution flow, opcodes, and common patterns like P2PKH, P2SH, P2WPKH, and P2TR.
          </p>
          <ul className="list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-300">
            <li><Link href="/docs/bitcoin/script" className="hover:text-btc hover:underline">Script execution flow</Link></li>
            <li><Link href="/docs/bitcoin/script" className="hover:text-btc hover:underline">Common opcodes</Link></li>
            <li><Link href="/docs/bitcoin/script" className="hover:text-btc hover:underline">Locking mechanisms</Link></li>
            <li><Link href="/docs/bitcoin/script" className="hover:text-btc hover:underline">Transaction validation</Link></li>
          </ul>
        </div>

        <div className="card">
          <h2 className="text-2xl font-bold mb-4 text-btc">
            <Link href="/docs/bitcoin/rpc">RPC Guide</Link>
          </h2>
          <p className="mb-4">
            Comprehensive guide to Bitcoin Core RPC commands for interacting with your node, monitoring status, and managing wallets.
          </p>
          <ul className="list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-300">
            <li><Link href="/docs/bitcoin/rpc" className="hover:text-btc hover:underline">Essential RPC commands</Link></li>
            <li><Link href="/docs/bitcoin/rpc" className="hover:text-btc hover:underline">Wallet management</Link></li>
            <li><Link href="/docs/bitcoin/rpc" className="hover:text-btc hover:underline">Block and transaction queries</Link></li>
            <li><Link href="/docs/bitcoin/rpc" className="hover:text-btc hover:underline">ZMQ notifications</Link></li>
          </ul>
        </div>

        <div className="card">
          <h2 className="text-2xl font-bold mb-4 text-btc">
            <Link href="/docs/bitcoin/blocks">Block Propagation</Link>
          </h2>
          <p className="mb-4">
            Understand how blocks propagate through the Bitcoin network, including the gossip protocol, validation, and orphan block handling.
          </p>
          <ul className="list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-300">
            <li><Link href="/docs/bitcoin/blocks" className="hover:text-btc hover:underline">Gossip protocol</Link></li>
            <li><Link href="/docs/bitcoin/blocks" className="hover:text-btc hover:underline">Block validation</Link></li>
            <li><Link href="/docs/bitcoin/blocks" className="hover:text-btc hover:underline">Network topology</Link></li>
            <li><Link href="/docs/bitcoin/blocks" className="hover:text-btc hover:underline">Orphan blocks</Link></li>
          </ul>
        </div>

        <div className="card">
          <h2 className="text-2xl font-bold mb-4 text-btc">
            <Link href="/docs/bitcoin/op-codes">OP Codes</Link>
          </h2>
          <p className="mb-4">
            Comprehensive reference of Bitcoin Script OP codes with explanations, examples, and common usage patterns.
          </p>
          <ul className="list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-300">
            <li><Link href="/docs/bitcoin/op-codes" className="hover:text-btc hover:underline">Stack operations</Link></li>
            <li><Link href="/docs/bitcoin/op-codes" className="hover:text-btc hover:underline">Cryptographic functions</Link></li>
            <li><Link href="/docs/bitcoin/op-codes" className="hover:text-btc hover:underline">Control flow</Link></li>
            <li><Link href="/docs/bitcoin/op-codes" className="hover:text-btc hover:underline">Common script patterns</Link></li>
          </ul>
        </div>

        <div className="card">
          <h2 className="text-2xl font-bold mb-4 text-btc">
            <Link href="/docs/bitcoin/subsidy">Subsidy Equation</Link>
          </h2>
          <p className="mb-4">
            Understand Bitcoin&apos;s block subsidy formula, halving mechanism, and how the 21 million supply cap is mathematically enforced.
          </p>
          <ul className="list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-300">
            <li><Link href="/docs/bitcoin/subsidy" className="hover:text-btc hover:underline">Mathematical formula</Link></li>
            <li><Link href="/docs/bitcoin/subsidy" className="hover:text-btc hover:underline">Halving schedule</Link></li>
            <li><Link href="/docs/bitcoin/subsidy" className="hover:text-btc hover:underline">Historical halvings</Link></li>
            <li><Link href="/docs/bitcoin/subsidy" className="hover:text-btc hover:underline">Economic implications</Link></li>
          </ul>
        </div>
      </div>
    </div>
  )
}
