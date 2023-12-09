import Link from 'next/link'
import Image from 'next/image'
import Header from './components/Header'
import Footer from './components/Footer'
import Metrics from './components/Metrics'
import Notification from './components/Notification'
import SatoshiIcon from './components/SatoshiIcon'

export default function Home() {
  return (
    <main className='flex min-h-screen bg-grid bg-cover bg-center'>
      <Notification text='npub copied to clipboard!' />
      <Header />
      <div className='w-full items-center justify-between flex flex-col text-zinc-300 overflow-hidden'>
        <div className='h-full items-center justify-center flex flex-col'>
          <h1 className='text-6xl'>B++</h1>
          <h2 className='text-xl'>Bitcoin Education</h2>
          <p className='text-xs'>coming soon...</p>
          <Metrics />
          <div className='flex items-center justify-center gap-8'>
            <Link href={'/history'} aria-label='Link to Botcoin History'>
              <Image
                src='/grid.png'
                alt='Link to Botcoin History'
                width={60}
                height={60}
                className='invert'
              />
            </Link>
            <Link href={'/grid'} aria-label='Link to the Grid'>
              <SatoshiIcon />
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    </main>
  )
}
