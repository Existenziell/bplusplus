import { describe, it, expect, beforeEach, vi } from 'vitest'
import { NextRequest } from 'next/server'
import { POST, GET } from '@/app/api/bitcoin-rpc/route'
import { validateRpcRequest, ALLOWED_COMMANDS } from '@/app/utils/bitcoinRpcCache'

// Mock the bitcoinRpcCache module
vi.mock('@/app/utils/bitcoinRpcCache', () => ({
  getCacheTime: vi.fn(() => 60),
  validateRpcRequest: vi.fn(),
  ALLOWED_COMMANDS: new Set(['getblockcount', 'getblockhash', 'uptime']),
}))

// Mock fetch globally
global.fetch = vi.fn()

describe('bitcoin-rpc API route', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('POST', () => {
    it('validates request and returns error for invalid method', async () => {
      ;(validateRpcRequest as any).mockReturnValue({
        error: { code: -32601, message: 'Method not found' },
      })

      const request = new NextRequest('http://localhost/api/bitcoin-rpc', {
        method: 'POST',
        body: JSON.stringify({ method: 'invalid', params: [] }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toEqual({ code: -32601, message: 'Method not found' })
    })

    it('returns simulated result for uptime command', async () => {
      ;(validateRpcRequest as any).mockReturnValue({ ok: true })

      const request = new NextRequest('http://localhost/api/bitcoin-rpc', {
        method: 'POST',
        body: JSON.stringify({ method: 'uptime', params: [] }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.result).toBeDefined()
      expect(typeof data.result).toBe('number')
      expect(data.result).toBeGreaterThan(0)
      expect(global.fetch).not.toHaveBeenCalled()
    })

    it('makes RPC call to PublicNode for allowed commands', async () => {
      ;(validateRpcRequest as any).mockReturnValue({ ok: true })
      ;(global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          result: 123456,
          id: 'bitcoindev',
        }),
      })

      const request = new NextRequest('http://localhost/api/bitcoin-rpc', {
        method: 'POST',
        body: JSON.stringify({ method: 'getblockcount', params: [] }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.result).toBe(123456)
      expect(global.fetch).toHaveBeenCalledWith(
        'https://bitcoin-rpc.publicnode.com',
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            jsonrpc: '1.0',
            id: 'bitcoindev',
            method: 'getblockcount',
            params: [],
          }),
        })
      )
    })

    it('handles RPC error response', async () => {
      ;(validateRpcRequest as any).mockReturnValue({ ok: true })
      ;(global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          error: { code: -32602, message: 'Invalid params' },
          id: 'bitcoindev',
        }),
      })

      const request = new NextRequest('http://localhost/api/bitcoin-rpc', {
        method: 'POST',
        body: JSON.stringify({ method: 'getblockcount', params: [] }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toEqual({ code: -32602, message: 'Invalid params' })
    })

    it('handles non-ok HTTP response', async () => {
      ;(validateRpcRequest as any).mockReturnValue({ ok: true })
      ;(global.fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => ({
          error: { message: 'Internal server error' },
        }),
      })

      const request = new NextRequest('http://localhost/api/bitcoin-rpc', {
        method: 'POST',
        body: JSON.stringify({ method: 'getblockcount', params: [] }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error.code).toBe(-32603)
      expect(data.error.message).toContain('Internal server error')
    })

    it('handles 500 status with default message', async () => {
      ;(validateRpcRequest as any).mockReturnValue({ ok: true })
      ;(global.fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => {
          throw new Error('Not JSON')
        },
      })

      const request = new NextRequest('http://localhost/api/bitcoin-rpc', {
        method: 'POST',
        body: JSON.stringify({ method: 'getblockcount', params: [] }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error.message).toContain('Method "getblockcount" failed')
    })

    it('handles 503 status with service unavailable message', async () => {
      ;(validateRpcRequest as any).mockReturnValue({ ok: true })
      ;(global.fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 503,
        json: async () => {
          throw new Error('Not JSON')
        },
      })

      const request = new NextRequest('http://localhost/api/bitcoin-rpc', {
        method: 'POST',
        body: JSON.stringify({ method: 'getblockcount', params: [] }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(503)
      expect(data.error.message).toContain('Service unavailable')
    })

    it('handles fetch errors', async () => {
      ;(validateRpcRequest as any).mockReturnValue({ ok: true })
      ;(global.fetch as any).mockRejectedValueOnce(new Error('Network error'))

      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

      const request = new NextRequest('http://localhost/api/bitcoin-rpc', {
        method: 'POST',
        body: JSON.stringify({ method: 'getblockcount', params: [] }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error.code).toBe(-32603)
      expect(data.error.message).toBe('Network error')
      expect(consoleSpy).toHaveBeenCalledWith('Bitcoin RPC error:', expect.any(Error))

      consoleSpy.mockRestore()
    })

    it('handles invalid JSON in request body', async () => {
      const request = new NextRequest('http://localhost/api/bitcoin-rpc', {
        method: 'POST',
        body: 'invalid json',
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toEqual({ code: -32700, message: 'Invalid JSON in request body' })
    })

    it('handles empty request body', async () => {
      const request = new NextRequest('http://localhost/api/bitcoin-rpc', {
        method: 'POST',
        body: '',
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toEqual({ code: -32700, message: 'Empty request body' })
    })
  })

  describe('GET', () => {
    it('returns health check with allowed commands', async () => {
      const response = await GET()
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.status).toBe('ok')
      expect(data.allowedCommands).toBeDefined()
      expect(Array.isArray(data.allowedCommands)).toBe(true)
    })
  })
})
