import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import DenominationCalculator from '@/app/components/DenominationCalculator'

describe('DenominationCalculator', () => {
  it('renders input and select', () => {
    render(<DenominationCalculator />)

    expect(screen.getByLabelText('Amount to convert')).toBeInTheDocument()
    expect(screen.getByLabelText('Unit to convert from')).toBeInTheDocument()
  })

  it('shows placeholder message when no value entered', () => {
    render(<DenominationCalculator />)

    expect(screen.getByText('Enter an amount')).toBeInTheDocument()
  })

  it('converts BTC to other units', async () => {
    const user = userEvent.setup()
    render(<DenominationCalculator />)

    const input = screen.getByLabelText('Amount to convert')
    await user.type(input, '1')

    // Should show converted values
    expect(screen.queryByText('Enter an amount')).not.toBeInTheDocument()
    expect(screen.getByText(/sats/i)).toBeInTheDocument()
  })

  it('updates results when value changes', async () => {
    const user = userEvent.setup()
    render(<DenominationCalculator />)

    const input = screen.getByLabelText('Amount to convert')
    
    await user.type(input, '1')
    const firstResult = screen.getByText(/sats/i).textContent

    await user.clear(input)
    await user.type(input, '2')
    const secondResult = screen.getByText(/sats/i).textContent

    expect(firstResult).not.toBe(secondResult)
  })

  it('updates results when unit changes', async () => {
    const user = userEvent.setup()
    render(<DenominationCalculator />)

    const input = screen.getByLabelText('Amount to convert')
    const select = screen.getByLabelText('Unit to convert from')

    await user.type(input, '1000000')
    
    // Change from BTC to sats
    await user.selectOptions(select, 'sats')

    // Results should update
    expect(screen.getByText(/btc/i)).toBeInTheDocument()
  })

  it('shows separator for current unit', async () => {
    const user = userEvent.setup()
    render(<DenominationCalculator />)

    const input = screen.getByLabelText('Amount to convert')
    await user.type(input, '1')

    // Should have separator (dotted border)
    const separator = document.querySelector('.border-dotted')
    expect(separator).toBeInTheDocument()
  })

  it('handles invalid input gracefully', async () => {
    const user = userEvent.setup()
    render(<DenominationCalculator />)

    const input = screen.getByLabelText('Amount to convert')
    await user.type(input, 'abc')

    // Should show "Enter an amount" or handle gracefully
    const results = screen.queryByText(/sats/i)
    // Either shows placeholder or empty results
    expect(results === null || screen.getByText('Enter an amount')).toBeTruthy()
  })

  it('handles empty input', () => {
    render(<DenominationCalculator />)

    expect(screen.getByText('Enter an amount')).toBeInTheDocument()
  })

  it('displays all unit options in select', () => {
    render(<DenominationCalculator />)

    const select = screen.getByLabelText('Unit to convert from')
    const options = Array.from(select.querySelectorAll('option'))

    expect(options.length).toBeGreaterThan(0)
    expect(options.some(opt => opt.textContent?.includes('BTC'))).toBe(true)
    expect(options.some(opt => opt.textContent?.includes('sats'))).toBe(true)
  })
})
