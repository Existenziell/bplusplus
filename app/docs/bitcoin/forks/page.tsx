import Link from 'next/link'

export default function BitcoinForksPage() {
  return (
    <div>
      <h1 className="text-5xl font-bold mb-8">Bitcoin Forks History</h1>
      <p className="text-xl text-zinc-400 mb-8">
        The forks history has been moved to the <Link href="/docs/history" className="text-btc hover:underline">History</Link> page.
      </p>
      <Link href="/docs/history" className="text-btc hover:underline font-semibold">
        View Forks History →
      </Link>
    </div>
  )
}
