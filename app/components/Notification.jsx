'use client'

import { useAppContext } from '../context/AppContext'

const Notification = () => {
  const { showNotification, notificationText } = useAppContext()

  if (!showNotification) return <></>

  return (
    <div className='fixed top-0 bg-btc w-full text-zinc-800 text-center py-4 transition-all opacity-100'>
      {`${notificationText} copied to clipboard`}
    </div>
  )
}
export default Notification
