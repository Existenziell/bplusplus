import { describe, it, expect, beforeEach, vi } from 'vitest'
import { bitcoinRpc } from '@/app/utils/bitcoinRpc'

// Mock fetch globally
global.fetch = vi.fn()

describe('bitcoinRpc', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('calls /api/bitcoin-rpc with POST method', async () => {
    ;(global.fetch as any).mockResolvedValueOnce({
      json: async () => ({ result: 'test' }),
    })

    await bitcoinRpc('getblockcount')

    expect(global.fetch).toHaveBeenCalledWith('/api/bitcoin-rpc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ method: 'getblockcount', params: [] }),
    })
  })

  it('includes method and params in request body', async () => {
    ;(global.fetch as any).mockResolvedValueOnce({
      json: async () => ({ result: 'test' }),
    })

    await bitcoinRpc('getblockhash', [123456])

    expect(global.fetch).toHaveBeenCalledWith(
      '/api/bitcoin-rpc',
      expect.objectContaining({
        body: JSON.stringify({ method: 'getblockhash', params: [123456] }),
      })
    )
  })

  it('defaults params to empty array', async () => {
    ;(global.fetch as any).mockResolvedValueOnce({
      json: async () => ({ result: 'test' }),
    })

    await bitcoinRpc('getblockcount')

    expect(global.fetch).toHaveBeenCalledWith(
      '/api/bitcoin-rpc',
      expect.objectContaining({
        body: JSON.stringify({ method: 'getblockcount', params: [] }),
      })
    )
  })

  it('returns result from response', async () => {
    const mockResult = { result: 123456 }
    ;(global.fetch as any).mockResolvedValueOnce({
      json: async () => mockResult,
    })

    const response = await bitcoinRpc('getblockcount')

    expect(response).toEqual(mockResult)
    expect(response.result).toBe(123456)
  })

  it('returns error from response', async () => {
    const mockError = {
      error: { code: -32601, message: 'Method not found' },
    }
    ;(global.fetch as any).mockResolvedValueOnce({
      json: async () => mockError,
    })

    const response = await bitcoinRpc('invalidmethod')

    expect(response).toEqual(mockError)
    expect(response.error).toEqual({ code: -32601, message: 'Method not found' })
  })

  it('handles various param types', async () => {
    ;(global.fetch as any).mockResolvedValueOnce({
      json: async () => ({ result: 'test' }),
    })

    await bitcoinRpc('test', ['string', 123, true, null, { key: 'value' }])

    expect(global.fetch).toHaveBeenCalledWith(
      '/api/bitcoin-rpc',
      expect.objectContaining({
        body: JSON.stringify({
          method: 'test',
          params: ['string', 123, true, null, { key: 'value' }],
        }),
      })
    )
  })
})
