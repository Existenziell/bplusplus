'use client'

import Cell from './cell'
import Display from './display'
import { useState } from 'react'
import { Onboarding } from '../components/Onboarding'
import { useAppContext } from '../context/AppContext'
import { getRandomHslColor } from '../utils/getRandomHslColor'

export default function Grid() {
  const { numberOfCells } = useAppContext()
  const [showOnboarding, setShowOnboarding] = useState<boolean>(true)

  return (
    <main className='min-h-screen font-mono p-4 md:p-8'>
      {showOnboarding ? (
        <Onboarding setShowOnboarding={setShowOnboarding} />
      ) : (
        <>
          <Display />
          <h1 className='text-2xl text-center mb-8'>Grid</h1>
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
