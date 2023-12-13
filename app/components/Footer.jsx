'use client'

import { useAppContext } from '../context/AppContext'
import copyToClipboard from '../utils/copyToClipboard'

export default function Footer () {
  const address =
  'npub1v7vslj3ewmdlqpzh3ta3glut80xg4vendfyvkypulydsqfmgc6kq90w3he'

  const { setShowNotification, setNotificationText } = useAppContext()

  return (
    <div className='text-xs text-center pb-2 overflow-hidden'>
      <p
        className='hover:cursor-pointer hover:underline'
        onClick={() => copyToClipboard({ data: address, notificationText: 'npub', setShowNotification, setNotificationText })}
      >
        Made with <span className='text-btc text-lg'>&#9829;</span> by Chris
      </p>
    </div>
  )
}
