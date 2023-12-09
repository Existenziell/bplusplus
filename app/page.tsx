import Link from 'next/link'
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
          <Link href={'/grid'} aria-label='Link to the Grid'>
            <SatoshiIcon />
          </Link>
        </div>
        <Footer />
      </div>
    </main>
  )
}
