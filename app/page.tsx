'use client'

import { useState } from 'react'
import SatoshiIcon from './components/SatoshiIcon'
import Metrics from './components/Metrics'
import Notification from './components/Notification'
import Footer from './components/Footer'
import Header from './components/Header'

export default function Home() {
  const address =
    'npub1v7vslj3ewmdlqpzh3ta3glut80xg4vendfyvkypulydsqfmgc6kq90w3he'

  const [showNotification, setShowNotification] = useState(false)

  const handleClick = () => {
    try {
      navigator.clipboard.writeText(address)
    } catch (e) {
      console.error(e)
      return
    }
    setShowNotification(true)
    setTimeout(() => {
      setShowNotification(false)
    }, 3000)
  }

  return (
    <main className='flex min-h-screen bg-grid bg-cover bg-center'>
      {showNotification && <Notification text='npub copied to clipboard!' />}
      <Header />
      <div className='w-full items-center justify-between flex flex-col text-zinc-300 overflow-hidden'>
        <div className='h-full items-center justify-center flex flex-col'>
          <h1 className='text-6xl'>B++</h1>
          <h2 className='text-xl'>Bitcoin Education</h2>
          <p className='text-xs'>coming soon...</p>
          <Metrics />
          <SatoshiIcon />
        </div>
        <Footer handleClick={handleClick} />
      </div>
    </main>
  )
}
