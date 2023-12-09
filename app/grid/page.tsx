'use client'

import Link from 'next/link'
import Cell from '../components/Cell'
import Display from '../components/Display'
import Onboarding from '../components/Onboarding'
import { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { getRandomHslColor } from '../utils/getRandomHslColor'

export default function Grid() {
  const { numberOfCells, granularity } = useAppContext()
  const [showOnboarding, setShowOnboarding] = useState<boolean>(true)

  return (
    <main className='min-h-screen font-mono px-4 md:px-8'>
      {showOnboarding ? (
        <Onboarding setShowOnboarding={setShowOnboarding} />
      ) : (
        <>
          <Link href='/' className='button absolute top-2 left-2'>
            <p>Back</p>
          </Link>
          <Display />
          <p
            onClick={() => setShowOnboarding(true)}
            className='button absolute top-2 right-2'
          >
            Reset
          </p>
          <h1 className='text-xl text-center mb-8 mt-16'>
            Displaying {numberOfCells}{' '}
            {granularity === 'monthly' ? 'months' : 'days'}
          </h1>
          <div className='flex flex-wrap'>
            {[...Array(numberOfCells)].map((_, i) => {
              const hsl = getRandomHslColor()
              const number = i + 1
              return <Cell key={i} number={number} hsl={hsl} />
            })}
          </div>
        </>
      )}
    </main>
  )
}
