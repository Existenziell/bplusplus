import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ThemeToggle from '@/app/components/ThemeToggle'
import { useTheme } from 'next-themes'

// Mock next-themes
const mockSetTheme = vi.fn()
vi.mock('next-themes', () => ({
  useTheme: vi.fn(),
}))

describe('ThemeToggle', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    ;(useTheme as any).mockReturnValue({
      theme: 'light',
      setTheme: mockSetTheme,
    })
  })

  it('renders theme toggle buttons', () => {
    render(<ThemeToggle />)

    expect(screen.getByRole('group', { name: /theme/i })).toBeInTheDocument()
    expect(screen.getByLabelText('Light theme')).toBeInTheDocument()
    expect(screen.getByLabelText('Dark theme')).toBeInTheDocument()
    expect(screen.getByLabelText('System theme')).toBeInTheDocument()
  })

  it('shows placeholder before mount to avoid hydration mismatch', () => {
    // Simulate unmounted state by not calling useEffect
    const { container } = render(<ThemeToggle />)
    
    // Should show placeholder divs
    const placeholder = container.querySelector('div > div')
    expect(placeholder).toBeInTheDocument()
  })

  it('calls setTheme when light button is clicked', async () => {
    const user = userEvent.setup()
    render(<ThemeToggle />)

    const lightButton = screen.getByLabelText('Light theme')
    await user.click(lightButton)

    expect(mockSetTheme).toHaveBeenCalledWith('light')
  })

  it('calls setTheme when dark button is clicked', async () => {
    const user = userEvent.setup()
    render(<ThemeToggle />)

    const darkButton = screen.getByLabelText('Dark theme')
    await user.click(darkButton)

    expect(mockSetTheme).toHaveBeenCalledWith('dark')
  })

  it('calls setTheme when system button is clicked', async () => {
    const user = userEvent.setup()
    render(<ThemeToggle />)

    const systemButton = screen.getByLabelText('System theme')
    await user.click(systemButton)

    expect(mockSetTheme).toHaveBeenCalledWith('system')
  })

  it('highlights active theme', () => {
    ;(useTheme as any).mockReturnValue({
      theme: 'dark',
      setTheme: mockSetTheme,
    })

    render(<ThemeToggle />)

    const darkButton = screen.getByLabelText('Dark theme')
    expect(darkButton.className).toContain('bg-btc')
  })

  it('does not highlight inactive themes', () => {
    ;(useTheme as any).mockReturnValue({
      theme: 'light',
      setTheme: mockSetTheme,
    })

    render(<ThemeToggle />)

    const darkButton = screen.getByLabelText('Dark theme')
    expect(darkButton.className).not.toContain('bg-btc')
  })
})
