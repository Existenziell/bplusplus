'use client'

import Link from 'next/link'
import { footerLinksExplore, footerLinksExternal } from '@/app/utils/navigation'
import { ExternalLinkIcon } from '@/app/components/Icons'

export default function Footer() {
  return (
    <footer className='border-t border-gray-200 dark:border-gray-700 bg-gray-100/80 dark:bg-gray-800/50 overflow-hidden mt-8'>
      <div className='container-content pt-8 pb-4'>
        {/* 2-column layout: external resources (left), internal links (right) */}
        <div className='grid grid-cols-[1fr_auto_1fr] md:flex md:flex-row md:items-start gap-8 mb-8 relative'>
          <nav aria-label='External resources' className='w-full md:flex-1'>
            <h2 className="heading-section-sm mb-3 text-center">
              More Resources
            </h2>
            <ul className='flex flex-col md:flex-row md:flex-wrap md:justify-center md:gap-x-6 gap-y-1'>
              {footerLinksExternal.map((resource) => (
                <li key={resource.name} className='text-center'>
                  <Link
                    href={resource.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='external group inline-flex items-center text-sm text-secondary hover:text-btc transition-colors no-underline hover:underline'
                  >
                    {resource.name}
                    <span className="inline-block w-0 group-hover:w-3 overflow-hidden transition-all duration-200 ml-0.5">
                      <ExternalLinkIcon className="opacity-0 group-hover:opacity-70 transition-opacity duration-200" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          {/* Vertical divider */}
          <div className='w-px bg-gray-200 dark:bg-gray-700 self-stretch' aria-hidden='true' />
          <nav aria-label='Site navigation' className='w-full md:flex-1'>
            <h2 className="heading-section-sm mb-3 text-center">
              Explore BitcoinDev
            </h2>
            <ul className='flex flex-col md:flex-row md:flex-wrap md:justify-center md:gap-x-6 gap-y-1'>
              {footerLinksExplore.map((link) => (
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
        <div className='footer-bar'>
          <Link
            href='/author'
            className='hover:text-btc transition-colors no-underline hover:underline'
          >
            Made with <span className='text-btc' aria-hidden='true'>&#9829;</span> by Chris
          </Link>
          <span aria-hidden='true' className='hidden md:inline'>|</span>
          <span>Open source · No ads · No tracking</span>
          <span aria-hidden='true' className='hidden md:inline'>|</span>
          <span>© {new Date().getFullYear()} BitcoinDev</span>
        </div>
      </div>
    </footer>
  )
}
