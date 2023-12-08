'use client'

import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { getMonthsBetweenDates } from '../utils/getMonthsBetweenDates'
import { getDaysBetweenDates } from '../utils/getDaysBetweenDates'

interface OnboardingProps {
  setShowOnboarding: Dispatch<SetStateAction<boolean>>
}

export const Onboarding: React.FC<OnboardingProps> = ({
  setShowOnboarding,
}) => {
  const { setNumberOfCells, granularity, setGranularity } = useAppContext()
  const [birthyear, setBirthyear] = useState<number | string>('')
  const [birthmonth, setBirthmonth] = useState<number | string>('')
  const [birthday, setBirthday] = useState<number | string>('')

  const handleChoice = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event
    const granularity = target.value
    setGranularity(granularity)
  }

  const handleSubmit = async (e: FormEvent) => {
    const day = new Date().getDate()
    const month = new Date().getMonth()
    const year = new Date().getFullYear()

    const today = new Date(year, month, day)
    const start = new Date(Number(birthyear), Number(birthmonth), Number(birthday))

    let difference
    if (granularity === 'daily') {
      difference = await getDaysBetweenDates(start, today)
    } else {
      difference = await getMonthsBetweenDates(start, today)
    }

    setNumberOfCells(difference)
    setShowOnboarding(false)
    e.preventDefault()
  }

  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 bg-opacity-50 bg-grid h-full w-full'>
      <div className='flex items-center justify-center h-full'>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col items-center justify-center space-y-4 px-8 py-4 bg-zinc-200 bg-opacity-40 border rounded-sm'
        >
          <h1 className='text-zinc-200'>When were you born?</h1>
          <div className='flex items-center space-x-1'>
            <input
              type='number'
              value={birthyear}
              onChange={(e) => setBirthyear(e.target.value)}
              placeholder='YYYY'
              className='w-28 bg-gray-50 border text-center text-zinc-900 text-sm rounded-lg border-gray-200 hover:bg-gray-100 focus:outline-none focus:z-10 focus:ring-2 focus:ring-gray-200 p-2.5'
              required
              min={1900}
              max={2020}
            />
            <input
              type='number'
              value={birthmonth}
              onChange={(e) => setBirthmonth(e.target.value)}
              placeholder='MM'
              className='w-20 bg-gray-50 border text-center text-zinc-900 text-sm rounded-lg border-gray-200 hover:bg-gray-100 focus:outline-none focus:z-10 focus:ring-2 focus:ring-gray-200 p-2.5'
              required
              min={1}
              max={12}
            />
            <input
              type='number'
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              placeholder='DD'
              className='w-20 bg-gray-50 border text-center text-zinc-900 text-sm rounded-lg border-gray-200 hover:bg-gray-100 focus:outline-none focus:z-10 focus:ring-2 focus:ring-gray-200 p-2.5'
              required
              min={1}
              max={31}
            />
          </div>
          <div className="flex items-center gap-4">
            <div>
              <input required id="monthly" type="radio" value="monthly" onChange={handleChoice} name="granularity" className="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 focus:ring-teal-500 focus:ring-2" />
              <label htmlFor="monthly" className="ms-1 text-sm font-medium text-zinc-200">Monthly</label>
            </div>
            <div>
              <input required id="daily" type="radio" value="daily" onChange={handleChoice} name="granularity" className="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 focus:ring-teal-500 focus:ring-2" />
              <label htmlFor="daily" className="ms-1 text-sm font-medium text-zinc-200">Daily</label>
            </div>
          </div>
          <button
            type='submit'
            className='py-2.5 px-5 text-sm text-zinc-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-gray-200'
          >
            Go
          </button>
        </form>
      </div>
    </div>
  )
}
