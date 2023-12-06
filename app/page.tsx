'use client'
import { useState } from 'react'
import SatoshiIcon from './components/SatoshiIcon'

export default function Home() {
  const address =
    'npub1v7vslj3ewmdlqpzh3ta3glut80xg4vendfyvkypulydsqfmgc6kq90w3he'

  const [showNotification, setShowNotification] = useState(false)

  const handleClick = () => {
    try {
      navigator.clipboard.writeText(address)
    } catch(e) {
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
      {showNotification && (
        <div className='fixed top-0 bg-emerald-400 w-full text-center py-4 transition-all opacity-100'>
          npub copied to clipboard!
        </div>
      )}
      <div className='w-full items-center justify-between flex flex-col text-zinc-300 overflow-hidden'>
        <div className='h-full items-center justify-center flex flex-col'>
          <h1 className='text-6xl'>B++</h1>
          <h2 className='text-xl'>Bitcoin Education</h2>
          <p className='text-xs mb-6'>coming soon...</p>
          <SatoshiIcon />
        </div>
        <div className='text-xs text-center pb-2 overflow-hidden'>
          Made with &#x1f9e1; by{' '}
          <a className='hover:cursor-pointer' onClick={handleClick}>
            Chris
          </a>
          <br />
        </div>
      </div>
    </main>
  )
}
