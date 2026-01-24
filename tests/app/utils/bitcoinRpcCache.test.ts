import { describe, it, expect } from 'vitest'
import { getCacheTime, validateRpcRequest } from '@/app/utils/bitcoinRpcCache'

describe('getCacheTime', () => {
  it('getmempoolinfo → 10', () => {
    expect(getCacheTime('getmempoolinfo')).toBe(10)
  })
  it('getrawmempool → 10', () => expect(getCacheTime('getrawmempool')).toBe(10))
  it('getmempoolentry → 10', () => expect(getCacheTime('getmempoolentry')).toBe(10))

  it('getblockchaininfo → 30', () => expect(getCacheTime('getblockchaininfo')).toBe(30))
  it('getblockcount → 30', () => expect(getCacheTime('getblockcount')).toBe(30))
  it('getmininginfo → 30', () => expect(getCacheTime('getmininginfo')).toBe(30))

  it('getnetworkinfo → 60', () => expect(getCacheTime('getnetworkinfo')).toBe(60))
  it('getnettotals → 60', () => expect(getCacheTime('getnettotals')).toBe(60))
  it('getpeerinfo → 60', () => expect(getCacheTime('getpeerinfo')).toBe(60))

  it('getblock → 3600', () => expect(getCacheTime('getblock')).toBe(3600))
  it('getblockhash → 3600', () => expect(getCacheTime('getblockhash')).toBe(3600))
  it('getrawtransaction → 3600', () => expect(getCacheTime('getrawtransaction')).toBe(3600))

  it('gettxoutsetinfo → 300', () => expect(getCacheTime('gettxoutsetinfo')).toBe(300))

  it('unknown method → 30', () => {
    expect(getCacheTime('unknown')).toBe(30)
  })
})

describe('validateRpcRequest', () => {
  it('disallowed method → error', () => {
    const result = validateRpcRequest({ method: 'sendtoaddress', params: [] })
    expect('ok' in result).toBe(false)
    expect('error' in result && result.error.code).toBe(-32601)
    expect('error' in result && result.error.message).toContain('not allowed')
  })

  it('getblock with [] → error (missing params)', () => {
    const result = validateRpcRequest({ method: 'getblock', params: [] })
    expect('ok' in result).toBe(false)
    expect('error' in result && result.error.code).toBe(-1)
    expect('error' in result && result.error.message).toContain('getblock')
  })

  it('getblock with [hash] → ok', () => {
    const result = validateRpcRequest({ method: 'getblock', params: ['abc'] })
    expect(result).toEqual({ ok: true })
  })

  it('uptime with [] → ok (simulated, no required params)', () => {
    const result = validateRpcRequest({ method: 'uptime', params: [] })
    expect(result).toEqual({ ok: true })
  })
})
