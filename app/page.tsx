import Link from 'next/link'
import Footer from './components/Footer'
import Metrics from './components/Metrics'
import Notification from './components/Notification'
import ThemeToggle from './components/ThemeToggle'

export default function Home() {
  return (
    <main className='flex min-h-screen bg-gradient-linear from-zinc-100 via-zinc-50 to-zinc-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900'>
      <Notification />
      <div className='w-full items-center justify-between flex flex-col text-zinc-800 dark:text-zinc-300 overflow-hidden'>
        {/* Sticky Header and Metrics */}
        <div className="sticky top-0 z-10 w-full bg-gradient-linear from-zinc-100 via-zinc-50 to-zinc-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 pb-4">
          <div className='w-full max-w-7xl mx-auto px-4 md:px-8 pt-4'>
            <div className="flex justify-between items-start mb-4">
              <Link href="/" className="text-center flex-1 hover:opacity-80 transition-opacity no-underline hover:no-underline">
                <h1 className='text-4xl sm:text-5xl md:text-6xl mb-2'>B++</h1>
                <h2 className='text-base sm:text-lg md:text-xl'>Bitcoin Education</h2>
              </Link>
              <div className="flex-shrink-0">
                <ThemeToggle />
              </div>
            </div>
            <Metrics />
          </div>
        </div>

        {/* Content Area */}
        <div className='w-full max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-8'>
          <div>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-12 text-center max-w-4xl mx-auto">
              Comprehensive guides and explanations of Bitcoin and Lightning Network concepts, code implementations, and development practices.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="card">
                <h2 className="text-2xl font-bold mb-4 text-btc">
                  <Link href="/docs/fundamentals">Fundamentals</Link>
                </h2>
                <p className="mb-4 text-zinc-700 dark:text-zinc-300">
                  Essential concepts and principles that form the foundation of Bitcoin, from high-level overview to core design principles.
                </p>
                <ul className="list-disc list-inside space-y-2 text-zinc-700 dark:text-zinc-300">
                  <li><Link href="/docs/fundamentals/overview" className="hover:text-btc hover:underline">What is Bitcoin?</Link></li>
                  <li><Link href="/docs/fundamentals/trilemma" className="hover:text-btc hover:underline">Bitcoin Trilemma</Link></li>
                  <li><Link href="/docs/fundamentals/decentralization" className="hover:text-btc hover:underline">Decentralization</Link></li>
                  <li><Link href="/docs/fundamentals/trust-model" className="hover:text-btc hover:underline">Trust Model</Link></li>
                </ul>
              </div>

              <div className="card">
                <h2 className="text-2xl font-bold mb-4 text-btc">
                  <Link href="/docs/bitcoin">Bitcoin Core</Link>
                </h2>
                <p className="mb-4 text-zinc-700 dark:text-zinc-300">
                  Learn about Bitcoin&apos;s core concepts including script execution, OP codes, RPC interfaces, and block propagation.
                </p>
                <ul className="list-disc list-inside space-y-2 text-zinc-700 dark:text-zinc-300">
                  <li><Link href="/docs/bitcoin/script" className="hover:text-btc hover:underline">Script System</Link></li>
                  <li><Link href="/docs/bitcoin/op-codes" className="hover:text-btc hover:underline">OP Codes</Link></li>
                  <li><Link href="/docs/bitcoin/rpc" className="hover:text-btc hover:underline">RPC Guide</Link></li>
                  <li><Link href="/docs/bitcoin/blocks" className="hover:text-btc hover:underline">Block Propagation</Link></li>
                </ul>
              </div>

              <div className="card">
                <h2 className="text-2xl font-bold mb-4 text-btc">
                  <Link href="/docs/mining">Mining</Link>
                </h2>
                <p className="mb-4 text-zinc-700 dark:text-zinc-300">
                  Learn about proof-of-work, block construction, pool mining, and the economic incentives that secure the Bitcoin network.
                </p>
                <ul className="list-disc list-inside space-y-2 text-zinc-700 dark:text-zinc-300">
                  <li>Proof-of-work mechanism</li>
                  <li>Block construction</li>
                  <li>Pool mining setup</li>
                  <li>Mining economics</li>
                </ul>
              </div>

              <div className="card">
                <h2 className="text-2xl font-bold mb-4 text-btc">
                  <Link href="/docs/lightning">Lightning Network</Link>
                </h2>
                <p className="mb-4 text-zinc-700 dark:text-zinc-300">
                  Understand the Lightning Network protocol, including channel management, routing, HTLCs, and onion routing.
                </p>
                <ul className="list-disc list-inside space-y-2 text-zinc-700 dark:text-zinc-300">
                  <li><Link href="/docs/lightning/basics" className="hover:text-btc hover:underline">Getting Started</Link></li>
                  <li><Link href="/docs/lightning/routing" className="hover:text-btc hover:underline">Routing & HTLCs</Link></li>
                  <li><Link href="/docs/lightning/channels" className="hover:text-btc hover:underline">Channels</Link></li>
                  <li><Link href="/docs/lightning/onion" className="hover:text-btc hover:underline">Onion Routing</Link></li>
                </ul>
              </div>

              <div className="card">
                <h2 className="text-2xl font-bold mb-4 text-btc">
                  <Link href="/docs/wallets">Wallet Development</Link>
                </h2>
                <p className="mb-4 text-zinc-700 dark:text-zinc-300">
                  Build Bitcoin wallets with proper coin selection, multisig support, and transaction construction.
                </p>
                <ul className="list-disc list-inside space-y-2 text-zinc-700 dark:text-zinc-300">
                  <li><Link href="/docs/wallets/coin-selection" className="hover:text-btc hover:underline">Coin Selection</Link></li>
                  <li><Link href="/docs/wallets/multisig" className="hover:text-btc hover:underline">Multisig</Link></li>
                  <li><Link href="/docs/wallets/transactions" className="hover:text-btc hover:underline">Transaction Creation</Link></li>
                </ul>
              </div>

              <div className="card">
                <h2 className="text-2xl font-bold mb-4 text-btc">
                  <Link href="/docs/development">Development Tools</Link>
                </h2>
                <p className="mb-4 text-zinc-700 dark:text-zinc-300">
                  Tools and techniques for monitoring the blockchain, mining, and tracking Bitcoin prices.
                </p>
                <ul className="list-disc list-inside space-y-2 text-zinc-700 dark:text-zinc-300">
                  <li><Link href="/docs/development/monitoring" className="hover:text-btc hover:underline">Blockchain Monitoring</Link></li>
                  <li><Link href="/docs/development/mining" className="hover:text-btc hover:underline">Pool Mining</Link></li>
                  <li><Link href="/docs/development/tools" className="hover:text-btc hover:underline">Price Tracking</Link></li>
                </ul>
              </div>

              <div className="card">
                <h2 className="text-2xl font-bold mb-4 text-btc">
                  <Link href="/docs/history">History</Link>
                </h2>
                <p className="mb-4 text-zinc-700 dark:text-zinc-300">
                  Explore Bitcoin&apos;s history from the Genesis Block to future halvings, including key milestones, events, and the complete supply schedule.
                </p>
              </div>

              <div className="card">
                <h2 className="text-2xl font-bold mb-4 text-btc">
                  <Link href="/docs/controversies">Controversies</Link>
                </h2>
                <p className="mb-4 text-zinc-700 dark:text-zinc-300">
                  Major debates and controversies that have shaped Bitcoin&apos;s development, including the OP_RETURN debate and Blocksize Wars.
                </p>
                <ul className="list-disc list-inside space-y-2 text-zinc-700 dark:text-zinc-300">
                  <li><Link href="/docs/controversies/op-return" className="hover:text-btc hover:underline">OP_RETURN Debate</Link></li>
                  <li><Link href="/docs/controversies/blocksize-wars" className="hover:text-btc hover:underline">Blocksize Wars</Link></li>
                </ul>
              </div>

              <div className="card">
                <h2 className="text-2xl font-bold mb-4 text-btc">
                  <Link href="/docs/glossary">Glossary</Link>
                </h2>
                <p className="mb-4 text-zinc-700 dark:text-zinc-300">
                  A comprehensive glossary of Bitcoin and Lightning Network development terms, from ASIC to ZMQ.
                </p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </main>
  )
}
