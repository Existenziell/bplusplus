'use client'

import Link from 'next/link'
import { ExternalLinkIcon } from '@/app/components/Icons'

interface Resource {
  name: string
  url: string
  description: string
}

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
    <footer className='border-t border-gray-200 dark:border-gray-700 bg-gray-100/80 dark:bg-gray-800/50 overflow-hidden'>
      <div className='container-content py-4 flex flex-col items-center'>
        <nav aria-label='External resources' className='text-center mb-4'>
          <h3 className="heading-section-sm mb-4">
            More Bitcoin Resources
          </h3>
          <div className='flex flex-wrap justify-center gap-x-6 gap-y-2'>
            {resources.map((resource) => (
              <Link
                key={resource.name}
                href={resource.url}
                target='_blank'
                rel='noopener noreferrer'
                className='group inline-flex items-center gap-1.5 text-sm text-secondary hover:text-btc transition-colors no-underline hover:underline'
              >
                <span>{resource.name}</span>
                <ExternalLinkIcon className='w-3 h-3 flex-shrink-0' aria-hidden='true' />
              </Link>
            ))}
          </div>
        </nav>

        {/* Bottom bar: credit + copyright + tagline */}
        <div className='w-full border-t border-gray-200 dark:border-gray-700 pt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm text-secondary'>
          <Link
            href='/author'
            className='hover:text-btc transition-colors no-underline hover:underline'
          >
            Made with <span className='text-btc' aria-hidden='true'>&#9829;</span> by Chris
          </Link>
          <span aria-hidden='true'>|</span>
          <span>© {new Date().getFullYear()} B++</span>
          <span aria-hidden='true'>|</span>
          <span>Open source · No ads · No tracking</span>
        </div>
      </div>
    </footer>
  )
}
