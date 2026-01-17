import Link from 'next/link'

export default function WalletsDocsPage() {
  return (
    <div>
      <h1 className="text-5xl font-bold mb-4">Wallet Development Documentation</h1>
      <p className="text-xl text-zinc-400 mb-12">
        Build Bitcoin wallets with proper coin selection, multisig support, and transaction construction.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card">
          <h2 className="text-2xl font-bold mb-4 text-btc">
            <Link href="/docs/wallets/overview">Overview</Link>
          </h2>
          <p className="mb-4">
            Introduction to Bitcoin wallets, including what they are, different types, how they work, and how to create one.
          </p>
          <ul className="list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-300">
            <li><Link href="/docs/wallets/overview" className="hover:text-btc hover:underline">What is a wallet</Link></li>
            <li><Link href="/docs/wallets/overview" className="hover:text-btc hover:underline">Wallet types and categories</Link></li>
            <li><Link href="/docs/wallets/overview" className="hover:text-btc hover:underline">How wallets work</Link></li>
            <li><Link href="/docs/wallets/overview" className="hover:text-btc hover:underline">Creating wallets</Link></li>
          </ul>
        </div>

        <div className="card">
          <h2 className="text-2xl font-bold mb-4 text-btc">
            <Link href="/docs/wallets/coin-selection">Coin Selection</Link>
          </h2>
          <p className="mb-4">
            Learn about UTXO selection algorithms, fee calculation, and transaction sizing for efficient wallet operations.
          </p>
          <ul className="list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-300">
            <li><Link href="/docs/wallets/coin-selection" className="hover:text-btc hover:underline">UTXO selection strategies</Link></li>
            <li><Link href="/docs/wallets/coin-selection" className="hover:text-btc hover:underline">Fee calculation</Link></li>
            <li><Link href="/docs/wallets/coin-selection" className="hover:text-btc hover:underline">Transaction sizing</Link></li>
            <li><Link href="/docs/wallets/coin-selection" className="hover:text-btc hover:underline">Change output creation</Link></li>
          </ul>
        </div>

        <div className="card">
          <h2 className="text-2xl font-bold mb-4 text-btc">
            <Link href="/docs/wallets/multisig">Multisig</Link>
          </h2>
          <p className="mb-4">
            Understand multi-signature concepts, script patterns, and how to create and spend from multisig wallets.
          </p>
          <ul className="list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-300">
            <li><Link href="/docs/wallets/multisig" className="hover:text-btc hover:underline">Multisig script patterns</Link></li>
            <li><Link href="/docs/wallets/multisig" className="hover:text-btc hover:underline">Key management</Link></li>
            <li><Link href="/docs/wallets/multisig" className="hover:text-btc hover:underline">Spending from multisig</Link></li>
            <li><Link href="/docs/wallets/multisig" className="hover:text-btc hover:underline">Security considerations</Link></li>
          </ul>
        </div>

        <div className="card">
          <h2 className="text-2xl font-bold mb-4 text-btc">
            <Link href="/docs/wallets/transactions">Transaction Creation</Link>
          </h2>
          <p className="mb-4">
            Learn how to construct, sign, and broadcast Bitcoin transactions programmatically.
          </p>
          <ul className="list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-300">
            <li><Link href="/docs/wallets/transactions" className="hover:text-btc hover:underline">Transaction structure</Link></li>
            <li><Link href="/docs/wallets/transactions" className="hover:text-btc hover:underline">Input and output creation</Link></li>
            <li><Link href="/docs/wallets/transactions" className="hover:text-btc hover:underline">Signing transactions</Link></li>
            <li><Link href="/docs/wallets/transactions" className="hover:text-btc hover:underline">Broadcasting to network</Link></li>
          </ul>
        </div>
      </div>
    </div>
  )
}
