'use client'

import Link from 'next/link'
import copyToClipboard from '@/app/utils/copyToClipboard'

interface Resource {
  name: string
  url: string
  description: string
}

const NPUB_ADDRESS = 'npub1v7vslj3ewmdlqpzh3ta3glut80xg4vendfyvkypulydsqfmgc6kq90w3he'

const resources: Resource[] = [
  { name: 'Bitcoin Dev Project', url: 'https://bitcoindevs.xyz', description: 'Learning & development tools' },
  { name: 'ClarkMoody Dashboard', url: 'https://bitcoin.clarkmoody.com/dashboard/', description: 'Bitcoin analytics dashboard' },
  { name: 'Mempool.space', url: 'https://mempool.space', description: 'Blockchain explorer & mempool' },
  { name: 'Blockstream.info', url: 'https://blockstream.info', description: 'Blockchain explorer' },
  { name: 'Bitcoin Optech', url: 'https://bitcoinops.org', description: 'Technical resources' },
  { name: 'Bitcoin Visuals', url: 'https://bitcoinvisuals.com', description: 'Charts & metrics' },
]

export default function Footer() {
  return (
    <footer className='text-xs text-center pb-6 overflow-hidden border-t border-zinc-300 dark:border-zinc-700 pt-6 mt-10'>
      {/* Resources Section */}
      <div className='mb-6'>
        <h3 className='heading-section text-sm mb-3'>
          More Bitcoin Resources
        </h3>
        <nav aria-label='External resources'>
          <div className='flex flex-wrap justify-center gap-4 md:gap-6'>
            {resources.map((resource) => (
              <Link
                key={resource.name}
                href={resource.url}
                target='_blank'
                rel='noopener noreferrer'
                className='group flex flex-col items-center hover:opacity-80 transition-opacity no-underline hover:no-underline'
              >
                <span className='text-btc font-medium'>
                  {resource.name}
                </span>
                <span className='text-[10px] text-secondary mt-0.5 hidden md:block'>
                  {resource.description}
                </span>
              </Link>
            ))}
          </div>
        </nav>
      </div>

      {/* Footer Credit */}
      <p className='flex items-center justify-center gap-2'>
        <Link
          href='/author'
          className='hover:text-btc transition-colors hover:no-underline'
        >
          Made with <span className='text-btc' aria-hidden='true'>&#9829;</span> by Chris
        </Link>
      </p>
    </footer>
  )
}
