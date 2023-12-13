'use client'

import Link from 'next/link'
import copyToClipboard from '../utils/copyToClipboard'
import { useAppContext } from '../context/AppContext'

const Metrics = () => {
  const hexValue = '#f2a900'
  const { setShowNotification, setNotificationText } = useAppContext()

  return (
    <div className='bg-zinc-800 bg-opacity-50 shadow-md px-12 py-4 my-8 w-screen'>
      <div className='text-sm font-mono'>
        <ul className='flex flex-row items-center flex-wrap justify-around gap-8'>
          <li className='flex flex-col items-center justify-between space-y-2'>
            <Link
              href='https://bitcoin.org/bitcoin.pdf'
              passHref
              legacyBehavior
            >
              <a
                target='_blank'
                rel='noopener noreferrer'
                className='font-bold text-xl text-btc'
              >
                Bitcoin
              </a>
            </Link>
            <span className='text-xs'>Whitepaper</span>
          </li>
          <li className='flex flex-col items-center justify-betwee space-y-2'>
            <span
              className='text-xl font-bold text-btc hover:underline cursor-pointer'
              onClick={() =>
                copyToClipboard({
                  data: 'BTC',
                  notificationText: 'BTC',
                  setShowNotification,
                  setNotificationText,
                })
              }
            >
              BTC
            </span>
            <span className='text-xs'>Ticker</span>
          </li>
          <li className='flex flex-col items-center justify-between space-y-2'>
            <div className='w-6'>
              <svg xmlSpace='preserve' viewBox='0 0 273.6 360'>
                <path
                  fill='currentColor'
                  className='text-btc'
                  d='M217.021 167.042c18.631-9.483 30.288-26.184 27.565-54.007-3.667-38.023-36.526-50.773-78.006-54.404l-.008-52.741h-32.139l-.009 51.354c-8.456 0-17.076.166-25.657.338l-.007-51.685-32.11-.003-.006 52.728c-6.959.142-13.793.277-20.466.277v-.156l-44.33-.018.006 34.282s23.734-.446 23.343-.013c13.013.009 17.262 7.559 18.484 14.076l.01 60.083v84.397c-.573 4.09-2.984 10.625-12.083 10.637.414.364-23.379-.004-23.379-.004l-6.375 38.335h41.817c7.792.009 15.448.13 22.959.19l.028 53.338 32.102.009-.009-52.779c8.832.18 17.357.258 25.684.247l-.009 52.532h32.138l.018-53.249c54.022-3.1 91.842-16.697 96.544-67.385 3.79-40.809-15.434-59.025-46.105-66.379zM109.535 95.321c18.126 0 75.132-5.767 75.14 32.064-.008 36.269-56.996 32.032-75.14 32.032V95.321zm-.014 167.126.014-70.672c21.778-.006 90.085-6.261 90.094 35.32.009 39.876-68.316 35.336-90.108 35.352z'
                />
              </svg>
            </div>
            <span className='text-xs'>Symbol</span>
          </li>
          <li className='flex flex-col items-center justify-between space-y-2'>
            <span
              className='text-btc text-xl font-bold hover:underline cursor-pointer'
              onClick={() =>
                copyToClipboard({
                  data: hexValue,
                  notificationText: hexValue,
                  setShowNotification,
                  setNotificationText,
                })
              }
            >
              {hexValue}
            </span>
            <span className='text-xs'>Hex</span>
          </li>
          <li className='flex flex-col items-center justify-between space-y-2'>
            <Link
              href='https://github.com/bitcoin/bitcoin'
              passHref
              legacyBehavior
            >
              <a
                target='_blank'
                rel='noopener noreferrer'
                className='font-bold text-xl text-btc'
              >
                GitHub
              </a>
            </Link>
            <span className='text-xs'>Source Code</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Metrics
