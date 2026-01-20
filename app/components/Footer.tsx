'use client'

import { useAppContext } from '@/app/context/AppContext'
import copyToClipboard from '@/app/utils/copyToClipboard'
import Link from 'next/link'

interface Resource {
  name: string
  url: string
  description: string
}

export default function Footer() {
  const address =
    'npub1v7vslj3ewmdlqpzh3ta3glut80xg4vendfyvkypulydsqfmgc6kq90w3he'

  const { setShowNotification, setNotificationText } = useAppContext()

  const resources: Resource[] = [
    { name: 'Bitcoin Dev Project', url: 'https://bitcoindevs.xyz', description: 'Learning & development tools' },
    { name: 'ClarkMoody Dashboard', url: 'https://bitcoin.clarkmoody.com/dashboard/', description: 'Bitcoin analytics dashboard' },
    { name: 'Mempool.space', url: 'https://mempool.space', description: 'Blockchain explorer & mempool' },
    { name: 'Blockstream.info', url: 'https://blockstream.info', description: 'Blockchain explorer' },
    { name: 'Bitcoin Optech', url: 'https://bitcoinops.org', description: 'Technical resources' },
    { name: 'Bitcoin Visuals', url: 'https://bitcoinvisuals.com', description: 'Charts & metrics' },
  ]

  return (
    <footer className='text-xs text-center pb-4 overflow-hidden border-t border-zinc-300 dark:border-zinc-700 pt-6 mt-8'>
      {/* Resources Section */}
      <div className='mb-6'>
        <h3 className='text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-3'>
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
                <span className='text-[10px] text-zinc-600 dark:text-zinc-400 mt-0.5'>
                  {resource.description}
                </span>
              </Link>
            ))}
          </div>
        </nav>
      </div>

      {/* Footer Credit */}
      <p
        className='hover:cursor-pointer hover:underline'
        onClick={() => copyToClipboard({ data: address, notificationText: 'npub', setShowNotification, setNotificationText })}
      >
        Made with <span className='text-btc text-lg' aria-hidden='true'>&#9829;</span> by Chris
      </p>
    </footer>
  )
}
