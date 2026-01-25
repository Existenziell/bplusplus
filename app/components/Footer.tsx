'use client'

import Link from 'next/link'
import { ExternalLinkIcon } from '@/app/components/Icons'
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
  { href: '/home', title: 'Home' },
  { href: '/docs/fundamentals', title: 'Fundamentals' },
  ...staticNavLinks, // Whitepaper, CLI Terminal, Stack Lab
  { href: '/docs/fundamentals/denominations', title: 'Denominations Calculator' },
  ...footerNavLinks, // Glossary, About B++, Feedback
]

export default function Footer() {
  return (
    <footer className='border-t border-gray-200 dark:border-gray-700 bg-gray-100/80 dark:bg-gray-800/50 overflow-hidden'>
      <div className='container-content pt-8 pb-4'>
        {/* 2-column layout: external resources (left), internal links (right) */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-8 mb-4'>
          <nav aria-label='External resources' className='md:border-r border-gray-200 dark:border-gray-700 md:pr-8 text-left md:text-right'>
            <h3 className="heading-section-sm mb-3">
              More Resources
            </h3>
            <div className='flex flex-col gap-y-1'>
              <ul className='flex flex-wrap gap-x-6 gap-y-1 justify-start md:justify-end'>
                {resources.slice(0, Math.ceil(resources.length / 2)).map((resource) => (
                  <li key={resource.name}>
                    <Link
                      href={resource.url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='group inline-flex items-center gap-1.5 text-sm text-secondary hover:text-btc transition-colors no-underline hover:underline'
                    >
                      <span>{resource.name}</span>
                      <ExternalLinkIcon className='w-3 h-3 flex-shrink-0' aria-hidden='true' />
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className='flex flex-wrap gap-x-6 gap-y-1 justify-start md:justify-end'>
                {resources.slice(Math.ceil(resources.length / 2)).map((resource) => (
                  <li key={resource.name}>
                    <Link
                      href={resource.url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='group inline-flex items-center gap-1.5 text-sm text-secondary hover:text-btc transition-colors no-underline hover:underline'
                    >
                      <span>{resource.name}</span>
                      <ExternalLinkIcon className='w-3 h-3 flex-shrink-0' aria-hidden='true' />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
          <nav aria-label='Site navigation'>
            <h3 className="heading-section-sm mb-3">
              Explore B++
            </h3>
            <div className='flex flex-col gap-y-1'>
              <ul className='flex flex-wrap gap-x-6 gap-y-1'>
                {internalLinks.slice(0, Math.ceil(internalLinks.length / 2)).map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className='text-sm text-secondary hover:text-btc transition-colors no-underline hover:underline'
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className='flex flex-wrap gap-x-6 gap-y-1'>
                {internalLinks.slice(Math.ceil(internalLinks.length / 2)).map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className='text-sm text-secondary hover:text-btc transition-colors no-underline hover:underline'
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

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
