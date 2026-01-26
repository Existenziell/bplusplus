'use client'

import Link from 'next/link'
import { footerNavLinks, staticNavLinks } from '@/app/utils/navigation'

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

const internalLinks = [
  { href: '/docs/fundamentals', title: 'Fundamentals' },
  ...staticNavLinks, // Whitepaper, CLI Terminal, Stack Lab
  ...footerNavLinks, // Glossary, About B++, Feedback
]

export default function Footer() {
  return (
    <footer className='border-t border-gray-200 dark:border-gray-700 bg-gray-100/80 dark:bg-gray-800/50 overflow-hidden'>
      <div className='container-content pt-8 pb-4'>
        {/* 2-column layout: external resources (left), internal links (right) */}
        <div className='grid grid-cols-[1fr_auto_1fr] md:flex md:flex-row md:items-start gap-8 mb-8 relative'>
          <nav aria-label='External resources' className='w-full md:flex-1'>
            <h3 className="heading-section-sm mb-3 text-center">
              More Resources
            </h3>
            <ul className='flex flex-col md:flex-row md:flex-wrap md:justify-center md:gap-x-6 gap-y-1'>
              {resources.map((resource) => (
                <li key={resource.name} className='text-center'>
                  <Link
                    href={resource.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-sm text-secondary hover:text-btc transition-colors no-underline hover:underline'
                  >
                    {resource.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          {/* Vertical divider */}
          <div className='w-px bg-gray-200 dark:bg-gray-700 self-stretch' aria-hidden='true' />
          <nav aria-label='Site navigation' className='w-full md:flex-1'>
            <h3 className="heading-section-sm mb-3 text-center">
              Explore B++
            </h3>
            <ul className='flex flex-col md:flex-row md:flex-wrap md:justify-center md:gap-x-6 gap-y-1'>
              {internalLinks.map((link) => (
                <li key={link.href} className='text-center'>
                  <Link
                    href={link.href}
                    className='text-sm text-secondary hover:text-btc transition-colors no-underline hover:underline'
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom bar: credit + copyright + tagline */}
        <div className='w-full border-t border-gray-200 dark:border-gray-700 pt-4 flex flex-col md:flex-row items-center justify-center gap-y-1 md:gap-x-4 md:gap-y-0 text-sm text-secondary'>
          <Link
            href='/author'
            className='hover:text-btc transition-colors no-underline hover:underline'
          >
            Made with <span className='text-btc' aria-hidden='true'>&#9829;</span> by Chris
          </Link>
          <span aria-hidden='true' className='hidden md:inline'>|</span>
          <span>Open source · No ads · No tracking</span>
          <span aria-hidden='true' className='hidden md:inline'>|</span>
          <span>© {new Date().getFullYear()} B++</span>
        </div>
      </div>
    </footer>
  )
}
