'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import copyToClipboard from '@/app/utils/copyToClipboard'
import { useAppContext } from '@/app/context/AppContext'

interface MetricsProps {
  initialPrice?: number | null
}

const Metrics = ({ initialPrice = null }: MetricsProps) => {
  const hexValue = '#f2a900'
  const { setShowNotification, setNotificationText } = useAppContext()
  const [btcPrice, setBtcPrice] = useState<number | null>(initialPrice)
  const [priceLoading, setPriceLoading] = useState(initialPrice === null)
  const [satsPerUSD, setSatsPerUSD] = useState<number>(0)

  // Only fetch if we don't have an initial price
  useEffect(() => {
    if (initialPrice !== null) return

    const fetchPrice = async () => {
      try {
        const response = await fetch('/api/btc-price')
        const data = await response.json()
        setBtcPrice(data.price)
        setSatsPerUSD(Number((1 / data.price * 100000000).toFixed(0)))
      } catch (error) {
        console.error('Failed to fetch BTC price:', error)
      } finally {
        setPriceLoading(false)
      }
    }

    fetchPrice()
  }, [initialPrice])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className='bg-white dark:bg-zinc-800 bg-opacity-50 dark:bg-opacity-50 shadow-md px-4 sm:px-8 md:px-12 py-3 md:py-4'>
      <div className='text-xs sm:text-sm font-mono text-zinc-800 dark:text-zinc-200'>
        <ul className='flex flex-row items-center flex-wrap justify-around gap-4 sm:gap-6 md:gap-8'>
          <li className='flex flex-col items-center justify-between italic w-20'>
            <Link
              href='/whitepaper'
              className='font-bold text-base sm:text-lg md:text-xl text-btc'
              aria-label='Link to Bitcoin Whitepaper'
            >
              Bitcoin
            </Link>
            <span className='text-[10px] sm:text-xs text-zinc-600 dark:text-zinc-400 opacity-60'>Whitepaper</span>
          </li>
          <li className='flex flex-col items-center justify-between italic w-20'>
            <Link
              href='https://github.com/bitcoin/bitcoin'
              target='_blank'
              rel='noopener noreferrer'
              className='font-bold text-base sm:text-lg md:text-xl text-btc'
            >
              GitHub
            </Link>
            <span className='text-[10px] sm:text-xs text-zinc-600 dark:text-zinc-400 opacity-60'>Source Code</span>
          </li>
          <li className='flex flex-col items-center justify-between italic w-20'>
              <span
              className='text-btc text-base sm:text-lg md:text-xl font-bold hover:underline cursor-pointer'
              aria-label='Copy Bitcoin Hex Value'
              onClick={() =>
                copyToClipboard({
                  data: hexValue,
                  notificationText: hexValue,
                  setShowNotification,
                  setNotificationText,
                })
              }
            >
              {hexValue}
            </span>
            <span className='text-[10px] sm:text-xs text-zinc-600 dark:text-zinc-400 opacity-60'>Hex</span>
          </li>

          <li className='flex-col items-center justify-between italic w-20 hidden lg:flex'>
          <Link
                href='https://bitcointicker.co/'
                target='_blank'
                rel='noopener noreferrer'
                className='font-bold text-base sm:text-lg md:text-xl text-btc'
                aria-label='Link to Bitcoin Ticker'
              >
              <span className='font-bold text-base sm:text-lg md:text-xl text-btc inline-block min-w-[9ch] text-center'>
              {priceLoading ? (
                <span className='animate-pulse'>...</span>
              ) : btcPrice ? (
                formatPrice(btcPrice)
              ) : (
                '—'
              )}
            </span>
            </Link>
            <span className='text-[10px] sm:text-xs text-zinc-600 dark:text-zinc-400 opacity-60'>BTC/USD</span>
          </li>
          <li className='flex-col items-center justify-between italic w-20 hidden lg:flex'>
            <span className='font-bold text-base sm:text-lg md:text-xl text-btc inline-block min-w-[9ch] text-center'>
              {priceLoading ? (
                <span className='animate-pulse'>...</span>
              ) : (
                satsPerUSD || '—'
              )}
            </span>
            <span className='text-[10px] sm:text-xs text-zinc-600 dark:text-zinc-400 opacity-60'>Sats/USD</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Metrics
