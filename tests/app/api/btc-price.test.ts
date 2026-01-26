import { describe, it, expect, beforeEach, vi } from 'vitest'
import { GET } from '@/app/api/btc-price/route'

// Mock fetch globally
global.fetch = vi.fn()

describe('btc-price API route', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns Bitcoin price from CoinGecko', async () => {
    const mockPrice = 45000.50
    ;(global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        bitcoin: { usd: mockPrice },
      }),
    })

    const response = await GET()
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.price).toBe(mockPrice)
    expect(data.timestamp).toBeDefined()
    expect(typeof data.timestamp).toBe('number')

    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd',
      {
        next: { revalidate: 300 },
      }
    )
  })

  it('returns null price when bitcoin data is missing', async () => {
    ;(global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    })

    const response = await GET()
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.price).toBeNull()
    expect(data.timestamp).toBeDefined()
  })

  it('handles non-ok response', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    ;(global.fetch as any).mockResolvedValueOnce({
      ok: false,
      status: 429,
    })

    const response = await GET()
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.price).toBeNull()
    expect(data.error).toBe('Failed to fetch price')
    expect(consoleSpy).toHaveBeenCalledWith('Failed to fetch BTC price:', expect.any(Error))

    consoleSpy.mockRestore()
  })

  it('handles fetch errors', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const error = new Error('Network error')
    ;(global.fetch as any).mockRejectedValueOnce(error)

    const response = await GET()
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.price).toBeNull()
    expect(data.error).toBe('Failed to fetch price')
    expect(consoleSpy).toHaveBeenCalledWith('Failed to fetch BTC price:', error)

    consoleSpy.mockRestore()
  })

  it('handles JSON parse errors', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    ;(global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => {
        throw new Error('Invalid JSON')
      },
    })

    const response = await GET()
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.price).toBeNull()
    expect(data.error).toBe('Failed to fetch price')
    expect(consoleSpy).toHaveBeenCalled()

    consoleSpy.mockRestore()
  })
})
