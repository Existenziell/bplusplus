import Link from 'next/link'

export default async function History() {
  return (
    <main className='min-h-screen font-mono px-4 md:px-8 bg-grid bg-cover bg-center text-zinc-200'>
      <Link href='/' className='button absolute top-2 left-2'>
        <p>Back</p>
      </Link>
      <h1 className='text-xl text-center mb-8 pt-16'>History of Bitcoin</h1>
      <div className='card'>
        <div className='card-content'>
          <div className='table text-sm'>
            <div className='row'>
              <div className='cell font-bold'>Event</div>
              <div className='cell font-bold'>Date</div>
              <div className='cell font-bold'>Block number</div>
              <div className='cell font-bold'>Block reward (BTC)</div>
              <div className='cell font-bold'>
                Total new bitcoins between events
              </div>
            </div>
            <div className='row'>
              <div className='cell'>Bitcoin Launch</div>
              <div className='cell'>3 January 2009</div>
              <div className='cell'>0 (genesis block)</div>
              <div className='cell'>50</div>
              <div className='cell'>10,500,000 BTC</div>
            </div>
            <div className='row'>
              <div className='cell'>1. Halving</div>
              <div className='cell'>28 November 2012</div>
              <div className='cell'>210,000</div>
              <div className='cell'>25</div>
              <div className='cell'>5,250,000 BTC</div>
            </div>
            <div className='row'>
              <div className='cell'>2. Halving</div>
              <div className='cell'>9 July 2016</div>
              <div className='cell'>420,000</div>
              <div className='cell'>12.5</div>
              <div className='cell'>2,625,000 BTC</div>
            </div>
            <div className='row'>
              <div className='cell'>3. Halving</div>
              <div className='cell'>11 May 2020</div>
              <div className='cell'>630,000</div>
              <div className='cell'>6.25</div>
              <div className='cell'>1,312,500 BTC</div>
            </div>
            <div className='row'>
              <div className='cell'>4. Halving</div>
              <div className='cell'>Expected April 2024</div>
              <div className='cell'>740,000</div>
              <div className='cell'>3.125</div>
              <div className='cell'>656,250 BTC</div>
            </div>
            <div className='row'>
              <div className='cell'>5. Halving</div>
              <div className='cell'>Expected 2028</div>
              <div className='cell'>850,000</div>
              <div className='cell'>1.5625</div>
              <div className='cell'>328,125 BTC</div>
            </div>
          </div>
          <p className='mb-1'>Total halving events: 32</p>
          <p className='mb-1'>All Coins Issued: December 22, 2137</p>
          <p className='mb-1'>
            First transaction: January 12, 2009 (Satoshi Nakamoto sent 10 BTC to
            Hal Finney)
          </p>
        </div>
      </div>
    </main>
  )
}
