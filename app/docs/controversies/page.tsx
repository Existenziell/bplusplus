import type { Metadata } from 'next'
import DocCard from '../../components/DocCard'

export const metadata: Metadata = {
  title: 'Bitcoin Controversies | B++',
  description: "Major debates and controversies that have shaped Bitcoin's development and community.",
  openGraph: {
    title: 'Bitcoin Controversies | B++',
    description: "Major debates and controversies that have shaped Bitcoin's development and community.",
  },
}

export default function ControversiesPage() {
  return (
    <div>
      <h1 className="text-5xl font-bold mb-4">Bitcoin Controversies</h1>
      <p className="text-xl text-zinc-400 mb-12">
        Major debates and controversies that have shaped Bitcoin&apos;s development and community.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <DocCard
          title="OP_RETURN Debate"
          href="/docs/controversies/op-return"
          description='The ongoing debate about OP_RETURN data storage limits, Bitcoin Core v30 changes, and the philosophical divide between "sound money" and "platform" visions.'
          links={[
            { href: '/docs/controversies/op-return#what-is-op_return', label: 'What is OP_RETURN' },
            { href: '/docs/controversies/op-return#the-historical-context', label: 'Historical context' },
            { href: '/docs/controversies/op-return#the-recent-controversy', label: 'The recent controversy' },
            { href: '/docs/controversies/op-return#the-philosophical-divide', label: 'The philosophical divide' },
          ]}
        />

        <DocCard
          title="Blocksize Wars"
          href="/docs/controversies/blocksize-wars"
          description="The 2015-2017 controversy over increasing Bitcoin's block size limit, which led to the Bitcoin Cash hard fork and shaped Bitcoin's scaling philosophy."
          links={[
            { href: '/docs/controversies/blocksize-wars#the-two-sides', label: 'Big blockers vs small blockers' },
            { href: '/docs/controversies/blocksize-wars#the-outcome', label: 'The outcome' },
            { href: '/docs/controversies/blocksize-wars#timeline-of-events', label: 'Timeline of events' },
            { href: '/docs/controversies/blocksize-wars#impact-on-bitcoin', label: 'Impact on Bitcoin' },
          ]}
        />

        <DocCard
          title="Energy Consumption"
          href="/docs/controversies/energy-consumption"
          description="The debate over Bitcoin's energy consumption, including comparisons with other industries, renewable energy usage, and the role of energy in network security."
          links={[
            { href: '/docs/controversies/energy-consumption#energy-use-as-a-security-feature', label: 'Energy as security feature' },
            { href: '/docs/controversies/energy-consumption#renewable-energy-usage', label: 'Renewable energy usage' },
            { href: '/docs/controversies/energy-consumption#energy-consumption-in-context', label: 'Energy consumption in context' },
            { href: '/docs/controversies/energy-consumption#environmental-concerns', label: 'Environmental concerns' },
          ]}
        />

        <DocCard
          title="Mt. Gox Collapse"
          href="/docs/controversies/mt-gox"
          description='The 2014 collapse of the world&apos;s largest Bitcoin exchange, which lost 850,000 BTC and taught the community "not your keys, not your coins."'
          links={[
            { href: '/docs/controversies/mt-gox#the-rise-of-mt-gox', label: 'Rise of Mt. Gox' },
            { href: '/docs/controversies/mt-gox#the-collapse', label: 'The collapse' },
            { href: '/docs/controversies/mt-gox#lessons-learned', label: 'Lessons learned' },
            { href: '/docs/controversies/mt-gox#the-ongoing-saga', label: 'The ongoing saga' },
          ]}
        />

        <DocCard
          title='Craig Wright / "Faketoshi"'
          href="/docs/controversies/craig-wright"
          description="The ongoing saga of Craig Wright's claim to be Satoshi Nakamoto, his failed proofs, forged documents, and the 2024 UK court ruling against him."
          links={[
            { href: '/docs/controversies/craig-wright#the-claim', label: 'The claim' },
            { href: '/docs/controversies/craig-wright#timeline-of-events', label: 'Timeline of events' },
            { href: '/docs/controversies/craig-wright#evidence-of-fraud', label: 'Evidence of fraud' },
            { href: '/docs/controversies/craig-wright#conclusion', label: 'The verdict' },
          ]}
        />
      </div>
    </div>
  )
}
