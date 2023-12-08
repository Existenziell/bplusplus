'use client'

import Cell from './cell'
import Display from './display'
import { getRandomHslColor } from '../utils/getRandomHslColor'

export default function Grid() {
  const amount: number = 1024

  return (
    <main className='min-h-screen font-mono p-4 md:p-8'>
      <Display />
      <h1 className='text-xl text-center mb-8'>Grid</h1>
      <div className='flex flex-wrap gap-1'>
        {[...Array(amount)].map((_, i) => {
          const hsl = getRandomHslColor()
          const number = i + 1
          return <Cell key={i} number={number} hsl={hsl} />
        })}
      </div>
    </main>
  )
}
