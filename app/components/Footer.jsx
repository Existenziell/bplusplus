'use client'

import { useAppContext } from '../context/AppContext'

export default function Footer () {
  const address =
  'npub1v7vslj3ewmdlqpzh3ta3glut80xg4vendfyvkypulydsqfmgc6kq90w3he'

  const { setShowNotification } = useAppContext()

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
    <div className='text-xs text-center pb-2 overflow-hidden'>
      <p className='hover:cursor-pointer hover:underline' onClick={handleClick}>
        Made with <span className='text-btc text-lg'>&#9829;</span> by Chris
      </p>
    </div>
  )
}
