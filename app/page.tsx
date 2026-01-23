import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/app/components/Footer'
import Header from '@/app/components/Header'
import QuoteRotator from '@/app/components/QuoteRotator'
import LiveStats from '@/app/components/LiveStats'
import HorizontalNav from '@/app/components/HorizontalNav'
import { ArrowRight, TerminalIcon } from '@/app/components/Icons'

export default function Home() {
  return (
    <main className="min-h-screen page-bg flex flex-col">
      <Header />

      <div className="flex-grow">
        <div className="bg-zinc-100 dark:bg-zinc-800/50 border-y border-zinc-200 dark:border-zinc-700">
          <div className="container-content py-8 md:py-8">
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <QuoteRotator />
              <div className="relative aspect-video overflow-hidden rounded-md border border-zinc-200 dark:border-zinc-700">
                <Image
                  src="/images/hope.jpg"
                  alt="Bitcoin inspiration"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Start Reading CTA */}
        <div className="container-content py-8 md:py-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="heading-page mb-1">
              A Developer&apos;s Guide to Bitcoin
            </h2>
            <p className="text-secondary mb-6">
              Open source and always free.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/docs/fundamentals"
                className="btn-primary"
              >
                Start Reading
                <ArrowRight />
              </Link>
              <Link
                href="/terminal"
                className="btn-secondary"
              >
                Bitcoin CLI
                <TerminalIcon />
              </Link>
            </div>
          </div>
        </div>

        {/* Horizontal Navigation */}
        <HorizontalNav />

        {/* Live Stats */}
        <LiveStats />
      </div>

      <Footer />
    </main>
  )
}
