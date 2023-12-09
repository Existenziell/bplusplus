import { Suspense } from 'react'
import { getBitcoinPrice } from '../utils/getBitcoinPrice'

export default async function Header() {
  const price = await getBitcoinPrice()
  if (!price) return <></>

  const usdFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  })

  const priceFormatted = usdFormat.format(price)
  const satsPerDollar = Math.round(100_000_000 / price)

  return (
    <Suspense fallback={<h2>Loading...</h2>}>
      <div className='text-xs absolute top-1 left-1 md:top-4 md:left-4 bg-opacity-50 shadow-md bg-zinc-800 text-zinc-300 px-2 py-1 md:px-4 md:py-2'>
        <p>SATs per $: {satsPerDollar}</p>
        <p>Price: {priceFormatted}</p>
      </div>
    </Suspense>
  )
}
