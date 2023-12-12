'use client'

import React, {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from 'react'
import { useAppContext } from '../../context/AppContext'
import { getMonthsBetweenDates } from '../../utils/getMonthsBetweenDates'
import { getDaysBetweenDates } from '../../utils/getDaysBetweenDates'
import Link from 'next/link'

interface OnboardingProps {
  setShowOnboarding: Dispatch<SetStateAction<boolean>>
}

const Onboarding: React.FC<OnboardingProps> = ({ setShowOnboarding }) => {
  const { setNumberOfCells, granularity, setGranularity, loading, setLoading } =
    useAppContext()
  const [birthyear, setBirthyear] = useState<number | string>('')
  const [birthmonth, setBirthmonth] = useState<number | string>('')
  const [birthday, setBirthday] = useState<number | string>('')

  const handleGranularityChoice = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event
    const granularity = target.value
    setGranularity(granularity)
  }

  const calculateDifference = async () => {
    const day = new Date().getDate()
    const month = new Date().getMonth()
    const year = new Date().getFullYear()

    const today = new Date(year, month, day)
    const start = new Date(
      Number(birthyear),
      Number(birthmonth),
      Number(birthday)
    )

    let difference
    if (granularity === 'daily') {
      difference = await getDaysBetweenDates(start, today)
    } else {
      difference = await getMonthsBetweenDates(start, today)
    }
    return difference
  }

  const handleRandom = async () => {
    if (granularity === 'daily') {
      setNumberOfCells(Math.floor(Math.random() * 30000))
    } else {
      setNumberOfCells(Math.floor(Math.random() * 1000))
    }
    setShowOnboarding(false)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const difference = await calculateDifference()
    setNumberOfCells(difference)
    setLoading(false)
    setShowOnboarding(false)
  }

  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 bg-opacity-50 bg-grid bg-cover bg-center h-full w-full'>
      <Link href='/' className='button absolute top-2 left-2'>
        <p>Back</p>
      </Link>
      <div className='flex items-center justify-center h-full'>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col items-center justify-center px-8 py-4 bg-zinc-900 text-zinc-200 bg-opacity-70 rounded-sm shadow-sm'
        >
          <h1 className='text-zinc-200 mb-2'>When were you born?</h1>
          <div className='flex items-center space-x-1'>
            <input
              type='number'
              value={birthyear}
              onChange={(e) => setBirthyear(e.target.value)}
              placeholder='YYYY'
              className='w-28 bg-gray-50 border text-center text-zinc-900 text-sm rounded-lg border-gray-200 hover:bg-gray-100 focus:outline-none focus:z-10 focus:ring-2 focus:ring-gray-200 p-2.5'
              required
              min={1800}
              max={2020}
              disabled={loading}
            />
            <input
              type='number'
              value={birthmonth}
              onChange={(e) => setBirthmonth(e.target.value)}
              placeholder='MM'
              className='input'
              required
              min={1}
              max={12}
              disabled={loading}
            />
            <input
              type='number'
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              placeholder='DD'
              className='input'
              required
              min={1}
              max={31}
              disabled={loading}
            />
          </div>
          <p className='mt-4 mb-2'>Granularity:</p>
          <div className='flex items-center gap-4'>
            <div>
              <label htmlFor='monthly' className='form-control'>
                <input
                  id='monthly'
                  type='radio'
                  value='monthly'
                  onChange={handleGranularityChoice}
                  name='granularity'
                  defaultChecked={granularity === 'monthly'}
                  required
                  disabled={loading}
                />
                Monthly
              </label>
            </div>
            <div>
              <label htmlFor='daily' className='form-control'>
                <input
                  id='daily'
                  type='radio'
                  value='daily'
                  onChange={handleGranularityChoice}
                  name='granularity'
                  defaultChecked={granularity === 'daily'}
                  required
                  disabled={loading}
                />
                Daily
              </label>
            </div>
          </div>
          <div className='flex items-center justify-center mt-6 gap-2'>
            <button type='submit' className='button' disabled={loading}>
              Go
            </button>
            <button
              type='button'
              className='button'
              disabled={loading}
              onClick={handleRandom}
            >
              Random
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Onboarding
