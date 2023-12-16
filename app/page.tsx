import Link from 'next/link'
import Image from 'next/image'
import BitcoinPrice from './components/BitcoinPrice'
import Footer from './components/Footer'
import Metrics from './components/Metrics'
import Notification from './components/Notification'
import SatoshiIcon from './components/icons/SatoshiIcon'
import GraphIcon from './components/icons/GraphIcon'

export default function Home() {
  return (
    <main className='flex min-h-screen bg-grid bg-cover bg-center'>
      <Notification />
      <BitcoinPrice />
      <div className='w-full items-center justify-between flex flex-col text-zinc-300 overflow-hidden'>
        <div className='h-full items-center justify-center flex flex-col'>
          <h1 className='text-6xl'>B++</h1>
          <h2 className='text-xl'>Bitcoin Education</h2>
          <p className='text-xs'>coming soon...</p>
          <Metrics />
          <div className='flex items-center justify-center gap-8'>
            <Link href={'/history'} aria-label='Link to Bitcoin History'>
              <SatoshiIcon />
            </Link>
            <Link href={'/grid'} aria-label='Link to the Grid'>
              <Image
                src='/grid.png'
                alt='Image of Bitcoin History'
                width={60}
                height={60}
                className='invert'
              />
            </Link>
            <Link href={'/graphs'} aria-label='Link to Bitcoin Graphs'>
              <GraphIcon />
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    </main>
  )
}
