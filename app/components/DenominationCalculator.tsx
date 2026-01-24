'use client'

import { useState, useCallback } from 'react'
import { UNITS, toSats, fromSats, formatForUnit } from '@/app/utils/denominationUtils'

const inputStyles =
  'px-3 py-2 bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded text-zinc-800 dark:text-zinc-200 focus:outline-none focus:border-btc'

export default function DenominationCalculator() {
  const [value, setValue] = useState('')
  const [fromUnit, setFromUnit] = useState('sat')

  const sats = useCallback(() => toSats(value, fromUnit), [value, fromUnit])

  const results = (() => {
    const s = sats()
    if (s === null) return null
    return UNITS.filter((u) => u.id !== fromUnit).map((u) => ({
      id: u.id,
      label: u.label,
      name: u.name,
      formatted: formatForUnit(fromSats(s, u.id), u.id),
    }))
  })()

  return (
    <div className="my-6 max-w-md">
      <div className="bg-zinc-100 dark:bg-zinc-900 rounded-lg border border-zinc-300 dark:border-zinc-700 p-4">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <label htmlFor="denom-input" className="sr-only">
            Amount
          </label>
          <input
            id="denom-input"
            type="text"
            inputMode="decimal"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter amount"
            className={`${inputStyles} min-w-[10rem]`}
            aria-label="Amount to convert"
          />
          <label htmlFor="denom-unit" className="sr-only">
            From unit
          </label>
          <select
            id="denom-unit"
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className={`${inputStyles} min-w-[8rem]`}
            aria-label="Unit to convert from"
          >
            {UNITS.map((u) => (
              <option key={u.id} value={u.id}>
                {u.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-y-2 text-sm">
          {results === null ? (
            <p className="text-zinc-500 dark:text-zinc-400">Enter an amount</p>
          ) : (
            results.map(({ id, label, name, formatted }) => (
              <div key={id} className="flex justify-between gap-4">
                <span className="text-zinc-600 dark:text-zinc-400">{label} ({name})</span>
                <span className="font-mono text-zinc-800 dark:text-zinc-200 tabular-nums">{formatted}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
