'use client'

import { getPrice } from '../utils/getPrice'
import { useEffect, useState } from 'react'

const Header = () => {
  const [price, setPrice] = useState<number | null>(null)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPrice() {
      const price = await getPrice()
      setPrice(price)
      setLoading(false)
    }
    fetchPrice()
  }, [])

  if (isLoading || !price) return <></>

  const usdFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  })

  const priceFormatted = usdFormat.format(price)
  const satsPerDollar = Math.round(100_000_000 / price)

  return (
    <div className="text-xs absolute top-1 left-1 md:top-4 md:left-4 bg-opacity-50 shadow-md bg-zinc-800 text-zinc-300 px-2 py-1 md:px-6 md:py-2">
      <p>SATs per $: {satsPerDollar}</p>
      <p>Price: {priceFormatted}</p>
    </div>
  )
}

export default Header
