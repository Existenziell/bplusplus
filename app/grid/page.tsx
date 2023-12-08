'use client'

import Cell from './cell'
import Display from './display'

export default function Grid() {
  const amount: number = 1024

  const getRandomHslColor = () => {
    const getRandomNumber = (min:number, max:number) =>
      Math.round(Math.random() * (max - min) + min)
    const { hue, saturation, lightness } = {
      hue: getRandomNumber(0, 360),
      saturation: getRandomNumber(0, 100),
      lightness: getRandomNumber(0, 100),
    }
    return {
      lightness,
      value: `hsl(${hue}, ${saturation}%, ${lightness}%)`
    }
  }

  return (
    <main className='min-h-screen font-mono p-4 md:p-8'>
      <Display />
      <h1 className='text-xl text-center mb-8'>Grid</h1>
      <div className='flex flex-wrap gap-1'>
      {[...Array(amount)].map((_, i) => {
        const hsl = getRandomHslColor()
        const number = i + 1
        return (
          <Cell key={i} number={number} hsl={hsl} />
        )
      })}
      </div>
    </main>
  )
}
