import Link from 'next/link'

export default async function Denominations() {
  return (
    <main className='min-h-screen font-mono px-4 md:px-8 bg-grid bg-cover bg-center text-zinc-200'>
      <Link href='/' className='button absolute top-2 left-2'>
        <p>Back</p>
      </Link>
      <h1 className='text-xl text-center mb-8 pt-16'>Denominations</h1>
      <div className='card mx-auto max-w-4xl'>
        <div className='table text-sm'>
          <div className='row'>
            <div className='cell font-bold'>Bitcoin denomination</div>
            <div className='cell font-bold'>Bitcoin units</div>
            <div className='cell font-bold'>Value</div>
          </div>
          <div className='row'>
            <div className='cell'>Satoshi</div>
            <div className='cell'>SAT</div>
            <div className='cell'>0.000 000 01 BTC</div>
          </div>
          <div className='row'>
            <div className='cell'>Microbit</div>
            <div className='cell'>µBTC (uBTC)</div>
            <div className='cell'>0.000 001 BTC</div>
          </div>
          <div className='row'>
            <div className='cell'>Millibit</div>
            <div className='cell'>mBTC</div>
            <div className='cell'>0.001 BTC</div>
          </div>
          <div className='row'>
            <div className='cell'>Centibit</div>
            <div className='cell'>cBTC</div>
            <div className='cell'>0.01 BTC</div>
          </div>
          <div className='row'>
            <div className='cell'>Decibit</div>
            <div className='cell'>dBTC</div>
            <div className='cell'>0.1 BTC</div>
          </div>
          <div className='row'>
            <div className='cell'>Bitcoin</div>
            <div className='cell'>BTC</div>
            <div className='cell'>1 BTC</div>
          </div>
          <div className='row'>
            <div className='cell'>DecaBit</div>
            <div className='cell'>daBTC</div>
            <div className='cell'>10 BTC</div>
          </div>
          <div className='row'>
            <div className='cell'>Hectobit</div>
            <div className='cell'>hBTC</div>
            <div className='cell'>100 BTC</div>
          </div>
          <div className='row'>
            <div className='cell'>Kilobit</div>
            <div className='cell'>kBTC</div>
            <div className='cell'>1000 BTC</div>
          </div>
          <div className='row'>
            <div className='cell'>Megabit</div>
            <div className='cell'>MBTC</div>
            <div className='cell'>1 000 000 BTC</div>
          </div>
        </div>
      </div>
    </main>
  )
}
