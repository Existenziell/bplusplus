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
  const { setNumberOfCells } = useAppContext()
  const [birthdate, setBirthdate] = useState<string>('')
  const { granularity, setGranularity } = useAppContext()

  const handleChoice = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event
    const granularity = target.value
    console.log(granularity)
    setGranularity(granularity)
  }

  const handleSubmit = async (e: FormEvent) => {
    const day = new Date().getDate()
    const month = new Date().getMonth()
    const year = new Date().getFullYear()

    const today = new Date(year, month, day)
    const start = new Date(birthdate.replaceAll('/', ','))

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
      <div className='flex items-center justify-center h-full w-full'>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col items-center justify-center space-y-4 px-8 py-4 bg-zinc-300 bg-opacity-50 border rounded-sm'
        >
          <h1>When were you born?</h1>
          <input
            type='text'
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            placeholder='YYYY/MM/DD'
            className='bg-gray-50 border text-center text-gray-900 text-sm rounded-lg border-gray-200 hover:bg-gray-100 focus:outline-none focus:z-10 focus:ring-4 focus:ring-gray-200 block p-2.5'
          />
          <div className="flex items-center gap-4">
            <div>
              <input id="monthly" type="radio" value="monthly" onChange={handleChoice} name="granularity" className="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 focus:ring-teal-500 dark:focus:ring-teal-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label htmlFor="monthly" className="ms-1 text-sm font-medium text-gray-900 dark:text-gray-300">Monthly</label>
            </div>
            <div>
              <input id="daily" type="radio" value="daily" onChange={handleChoice} name="granularity" className="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 focus:ring-teal-500 dark:focus:ring-teal-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label htmlFor="daily" className="ms-1 text-sm font-medium text-gray-900 dark:text-gray-300">Daily</label>
            </div>
          </div>
          <button
            type='submit'
            className='py-2.5 px-5 text-sm text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200'
          >
            Go
          </button>
        </form>
      </div>
    </div>
  )
}
