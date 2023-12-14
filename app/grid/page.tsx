'use client'

import Link from 'next/link'
import Cell from '../components/grid/Cell'
import ColorDisplay from '../components/ColorDisplay'
import Onboarding from '../components/grid/Onboarding'
import { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { getRandomHslColor } from '../utils/getRandomHslColor'

export default function Grid() {
  const { numberOfCells, granularity } = useAppContext()
  const [showOnboarding, setShowOnboarding] = useState<boolean>(true)

  return (
    <main className='min-h-screen w-full font-mono px-4 md:px-8 bg-zinc-800 pb-16'>
      {showOnboarding ? (
        <Onboarding setShowOnboarding={setShowOnboarding} />
      ) : (
        <>
          <Link href='/' className='button absolute top-2 left-2'>
            <p>Back</p>
          </Link>
          <ColorDisplay />
          <p
            onClick={() => setShowOnboarding(true)}
            className='button absolute top-2 right-2'
          >
            Reset
          </p>
          <h1 className='text-xl text-center text-btc mb-8 pt-16'>
            Displaying {numberOfCells}{' '}
            {granularity === 'monthly' ? 'months' : 'days'}
          </h1>
          <div className='flex flex-wrap gap-1 w-full justify-start'>
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
