import { describe, it, expect } from 'vitest'
import {
  COMMANDS,
  parseCommand,
  findMatchingCommands,
  commandRequiresParams,
  getUsageInfo,
  getParameterDetails,
  getParameterFormat,
  generateExample,
} from '@/app/utils/terminalCommands'

describe('parseCommand', () => {
  it('getblockcount → { method: "getblockcount", params: [] }', () => {
    expect(parseCommand('getblockcount')).toEqual({ method: 'getblockcount', params: [] })
  })

  it('getblock abc 2 → { method: "getblock", params: ["abc", 2] }', () => {
    expect(parseCommand('getblock abc 2')).toEqual({ method: 'getblock', params: ['abc', 2] })
  })

  it('estimatesmartfee 6 → { method: "estimatesmartfee", params: [6] }', () => {
    expect(parseCommand('estimatesmartfee 6')).toEqual({ method: 'estimatesmartfee', params: [6] })
  })

  it('help -getblockchaininfo → method help, params pass through', () => {
    const r = parseCommand('help -getblockchaininfo')
    expect(r.method).toBe('help')
    expect(r.params).toEqual(['-getblockchaininfo'])
  })

  it('parses boolean params', () => {
    expect(parseCommand('foo true false').params).toEqual([true, false])
  })

  it('parses numeric param', () => {
    expect(parseCommand('getblockhash 800000').params).toEqual([800000])
  })
})

describe('findMatchingCommands', () => {
  it('"" → all command keys', () => {
    const matches = findMatchingCommands('', COMMANDS)
    expect(matches).toContain('getblock')
    expect(matches).toContain('help')
    expect(matches.length).toBe(Object.keys(COMMANDS).length)
  })

  it('"   " → all command keys', () => {
    const matches = findMatchingCommands('   ', COMMANDS)
    expect(matches.length).toBe(Object.keys(COMMANDS).length)
  })

  it('"get" → getblock, getblockcount, etc.', () => {
    const matches = findMatchingCommands('get', COMMANDS)
    expect(matches).toContain('getblock')
    expect(matches).toContain('getblockcount')
    expect(matches).toContain('getblockchaininfo')
    expect(matches.every(c => c.startsWith('get'))).toBe(true)
  })

  it('"getblock" → getblock and all commands starting with getblock', () => {
    const matches = findMatchingCommands('getblock', COMMANDS)
    expect(matches).toContain('getblock')
    expect(matches.every(c => c.startsWith('getblock'))).toBe(true)
  })

  it('"zzz" → []', () => {
    expect(findMatchingCommands('zzz', COMMANDS)).toEqual([])
  })
})

describe('commandRequiresParams', () => {
  it('getblock → true', () => {
    expect(commandRequiresParams('getblock', COMMANDS)).toBe(true)
  })

  it('getblockcount → false', () => {
    expect(commandRequiresParams('getblockcount', COMMANDS)).toBe(false)
  })

  it('help → false', () => {
    expect(commandRequiresParams('help', COMMANDS)).toBe(false)
  })

  it('clear → false', () => {
    expect(commandRequiresParams('clear', COMMANDS)).toBe(false)
  })
})

describe('getUsageInfo', () => {
  it('getblock → "<blockhash> [verbosity]"', () => {
    const u = getUsageInfo('getblock', COMMANDS)
    expect(u).toContain('blockhash')
    expect(u).toContain('verbosity')
  })

  it('getblockcount → null', () => {
    expect(getUsageInfo('getblockcount', COMMANDS)).toBe(null)
  })
})

describe('getParameterDetails', () => {
  it('usage with <blockhash> and [verbosity] → required blockhash, optional verbosity', () => {
    const usage = '<blockhash> [verbosity]'
    const details = getParameterDetails(usage)
    const blockhash = details.find(d => d.name === 'blockhash')
    const verbosity = details.find(d => d.name === 'verbosity')
    expect(blockhash).toBeDefined()
    expect(blockhash?.isOptional).toBe(false)
    expect(blockhash?.format).toMatch(/hex|64/)
    expect(verbosity).toBeDefined()
    expect(verbosity?.isOptional).toBe(true)
  })
})

describe('getParameterFormat', () => {
  it('blockhash → hex string format', () => {
    const r = getParameterFormat('blockhash')
    expect(r.format).toMatch(/hex|64/)
    expect(r.description).toMatch(/block hash/i)
  })

  it('height → number format', () => {
    const r = getParameterFormat('height')
    expect(r.format).toMatch(/number|integer/)
  })

  it('txid → hex string format', () => {
    const r = getParameterFormat('txid')
    expect(r.format).toMatch(/hex|64/)
  })

  it('conf_target → number format', () => {
    const r = getParameterFormat('conf_target')
    expect(r.format).toMatch(/number|integer/)
  })

  it('verbose → boolean or number', () => {
    const r = getParameterFormat('verbose')
    expect(r.format).toMatch(/boolean|number/)
  })

  it('verbosity → number (0, 1, or 2)', () => {
    const r = getParameterFormat('verbosity')
    expect(r.format).toMatch(/number|0|1|2/)
  })

  it('unknown param → format "string"', () => {
    const r = getParameterFormat('unknownparam')
    expect(r.format).toBe('string')
    expect(r.description).toBe('Parameter value')
  })
})

describe('generateExample', () => {
  it('replaces <blockhash> with exampleBlockHash', () => {
    const out = generateExample('getblock', '<blockhash> [verbosity]', {
      exampleBlockHash: 'abc123def456',
    })
    expect(out).toContain('abc123def456')
    expect(out).not.toContain('<blockhash>')
  })

  it('replaces <txid> with exampleTxId', () => {
    const out = generateExample('getrawtransaction', '<txid> [verbose]', {
      exampleTxId: 'deadbeef00',
    })
    expect(out).toContain('deadbeef00')
    expect(out).not.toContain('<txid>')
  })

  it('replaces <height> with 800000', () => {
    const out = generateExample('getblockhash', '<height>', {})
    expect(out).toBe('800000')
  })

  it('replaces <conf_target> with 6', () => {
    const out = generateExample('estimatesmartfee', '<conf_target>', {})
    expect(out).toBe('6')
  })

  it('strips [verbose] and [verbosity]', () => {
    const out = generateExample('x', '<blockhash> [verbosity] [verbose]', {
      exampleBlockHash: 'aa',
    })
    expect(out).not.toMatch(/\[\s*verbose\s*\]|\[\s*verbosity\s*\]/i)
  })

  it('without opts: uses fallback for <blockhash>', () => {
    const out = generateExample('getblock', '<blockhash>', {})
    expect(out).not.toContain('<blockhash>')
    expect(out.length).toBe(64)
  })

  it('without opts: uses fallback for <txid>', () => {
    const out = generateExample('getrawtransaction', '<txid>', {})
    expect(out).not.toContain('<txid>')
    expect(out.length).toBe(64)
  })
})
