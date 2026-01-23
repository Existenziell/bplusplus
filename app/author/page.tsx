'use client'

import Image from 'next/image'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import { CopyIcon, HomeIcon } from '@/app/components/Icons'
import copyToClipboard from '@/app/utils/copyToClipboard'
import Link from 'next/link'

const NPUB_ADDRESS = 'npub1v7vslj3ewmdlqpzh3ta3glut80xg4vendfyvkypulydsqfmgc6kq90w3he'
const BITCOIN_ADDRESS = 'bc1qtu2z558uwvutm6xqjdvv7jrjcg9020hc0964wl'

export default function AuthorPage() {
  const handleCopyNpub = () => {
    copyToClipboard(NPUB_ADDRESS, 'npub')
  }

  const handleCopyBitcoin = () => {
    copyToClipboard(BITCOIN_ADDRESS, 'Bitcoin address')
  }

  const handleCopyNostr = () => {
    copyToClipboard(NPUB_ADDRESS, 'Nostr address')
  }

  return (
    <main className="min-h-screen page-bg flex flex-col">
        <Header />

        <div className="container-content py-8 md:py-12 flex-grow">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-6 rounded-full overflow-hidden border-2 border-zinc-300 dark:border-zinc-700">
                <Image
                  src="/images/existenziell.jpg"
                  alt="Existenziell"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 128px, 160px"
                  priority
                />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-zinc-900 dark:text-zinc-100">
                Existenziell
              </h1>
              <p className="text-xl md:text-2xl text-secondary mb-1">
                Developer & Bitcoin Educator
              </p>
              <p className="text-sm md:text-base text-secondary mb-2">Giving back to the Bitcoin community 💛</p>
            </div>

            {/* About Section */}
            <section className="mb-12">
              <div className="">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-btc">
                  About
                </h2>
                <p className="text-zinc-800 dark:text-zinc-200 leading-7 mb-4">
                  I have been traveling the world for the last 6 years. I often live in poorer, remote communities and having been financially vulnerable myself for some time, I started thinking about money. I got a grasp of what it entails to earn a living day by day, the uncertainty and the realization how inaccessible money can be.
                  {' '}But then I found Bitcoin. It gave me hope. It gave me a way to build a life on my own terms. I&apos;m now building a life on Bitcoin.
                  {' '}This site represents my contribution and dedication to the Bitcoin community.
                </p>
              </div>
            </section>

            {/* Mission Section */}
            <section className="mb-12">
              <div className="">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-btc">
                  Why B++?
                </h2>
                <p className="text-zinc-800 dark:text-zinc-200 leading-7 mb-4">
                  Bitcoin education is fragmented. Some resources are too technical,
                  others too superficial. I created B++ to bridge that gap, providing
                  comprehensive, accurate, and accessible documentation that covers
                  everything from fundamental concepts to advanced protocol details.
                  This site is open source, free, and will always remain so. No ads,
                  no paywalls, no tracking. Just pure Bitcoin knowledge for anyone
                  who wants to learn.
                </p>
              </div>
            </section>

            {/* Connect Section */}
            <section className="mb-12">
              <div className="">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-btc">
                  Connect
                </h2>
                <p className="text-zinc-800 dark:text-zinc-200 mb-2">
                  You can find me on Nostr:
                </p>
                <div className="author-address-box">
                  <code className="author-address-code">
                    {NPUB_ADDRESS}
                  </code>
                  <button
                    onClick={handleCopyNpub}
                    className="author-copy-button"
                    aria-label="Copy npub to clipboard"
                  >
                    <CopyIcon />
                    Copy
                  </button>
                </div>
              </div>
            </section>

            {/* Support Section */}
            <section className="mb-12">
              <div className="">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-btc">
                  Support
                </h2>
                <p className="text-zinc-800 dark:text-zinc-200 mb-6">
                Every sat helps keep this resource free and open for everyone.
                Thank you for your support 💛
                </p>
                {/* Bitcoin On-Chain */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2 text-zinc-900 dark:text-zinc-100">
                    Bitcoin (On-Chain)
                  </h3>
                  <div className="author-address-box">
                    <code className="author-address-code">
                      {BITCOIN_ADDRESS}
                    </code>
                    <button
                      onClick={handleCopyBitcoin}
                      className="author-copy-button"
                      aria-label="Copy Bitcoin address to clipboard"
                    >
                      <CopyIcon />
                      Copy
                    </button>
                  </div>
                </div>

                {/* Lightning Network via Nostr */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2 text-zinc-900 dark:text-zinc-100">
                    Lightning Network
                  </h3>
                  <div className="author-address-box">
                    <code className="author-address-code">
                      Zap me on Nostr ⚡
                    </code>
                    <button
                      onClick={handleCopyNostr}
                      className="author-copy-button"
                      aria-label="Copy Nostr address to clipboard"
                    >
                      <CopyIcon />
                      Copy
                    </button>
                  </div>
                </div>
              </div>
            </section>
            <div className="mt-20 text-center flex flex-row items-center justify-center gap-2">
              <Link href="/" className="inline-flex items-center gap-2 text-btc hover:underline transition-colors">
                <HomeIcon />
                <span>Back Home</span>
              </Link>
            </div>
          </div>
        </div>

        <Footer />
      </main>
  )
}
