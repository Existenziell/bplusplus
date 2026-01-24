import { describe, it, expect } from 'vitest'
import { ScriptInterpreter } from '@/app/utils/stackLabInterpreter'

describe('ScriptInterpreter', () => {
  describe('execute', () => {
    it('PUSH / OP_1 / OP_2 produces finalStack [1, 2] and success', () => {
      const i = new ScriptInterpreter()
      const r = i.execute(['OP_1', 'OP_2'])
      expect(r.success).toBe(true)
      expect(r.finalStack).toEqual([1, 2])
    })

    it('OP_ADD: OP_3 OP_5 OP_ADD produces finalStack [8]', () => {
      const i = new ScriptInterpreter()
      const r = i.execute(['OP_3', 'OP_5', 'OP_ADD'])
      expect(r.success).toBe(true)
      expect(r.finalStack).toEqual([8])
    })

    it('OP_DUP: OP_7 OP_DUP produces [7, 7]', () => {
      const i = new ScriptInterpreter()
      const r = i.execute(['OP_7', 'OP_DUP'])
      expect(r.success).toBe(true)
      expect(r.finalStack).toEqual([7, 7])
    })

    it('OP_EQUAL: OP_5 OP_5 OP_EQUAL produces [1]', () => {
      const i = new ScriptInterpreter()
      const r = i.execute(['OP_5', 'OP_5', 'OP_EQUAL'])
      expect(r.success).toBe(true)
      expect(r.finalStack).toEqual([1])
    })

    it('OP_EQUAL: OP_5 OP_6 OP_EQUAL produces [0]', () => {
      const i = new ScriptInterpreter()
      const r = i.execute(['OP_5', 'OP_6', 'OP_EQUAL'])
      expect(r.finalStack).toEqual([0])
      expect(r.success).toBe(false) // script invalid: top is 0
    })

    it('OP_VERIFY: OP_1 OP_VERIFY runs without error (OP_VERIFY step succeeds, script invalid due to empty stack)', () => {
      const i = new ScriptInterpreter()
      const r = i.execute(['OP_1', 'OP_VERIFY'])
      expect(r.finalStack).toEqual([])
      const verifyStep = r.steps.find((s) => s.opCode === 'OP_VERIFY')
      expect(verifyStep?.success).toBe(true)
      expect(r.success).toBe(false) // empty stack => script invalid
    })

    it('OP_VERIFY: OP_0 OP_VERIFY fails with error', () => {
      const i = new ScriptInterpreter()
      const r = i.execute(['OP_0', 'OP_VERIFY'])
      expect(r.success).toBe(false)
      expect(r.error).toBeDefined()
      expect(r.error).toMatch(/[Vv]erification|[Ff]ail|false|zero/i)
    })

    it('OP_RETURN: OP_1 OP_RETURN fails and last step error mentions OP_RETURN', () => {
      const i = new ScriptInterpreter()
      const r = i.execute(['OP_1', 'OP_RETURN'])
      expect(r.success).toBe(false)
      const last = r.steps[r.steps.length - 1]
      expect(last?.error).toMatch(/OP_RETURN/i)
    })

    it('OP_IF OP_ELSE OP_ENDIF with true: pushes 1', () => {
      const i = new ScriptInterpreter()
      const r = i.execute(['OP_1', 'OP_IF', 'OP_1', 'OP_ELSE', 'OP_0', 'OP_ENDIF'])
      expect(r.success).toBe(true)
      expect(r.finalStack).toEqual([1])
    })

    it('OP_IF OP_ELSE OP_ENDIF with false: else branch pushes 1', () => {
      const i = new ScriptInterpreter()
      const r = i.execute(['OP_0', 'OP_IF', 'OP_0', 'OP_ELSE', 'OP_1', 'OP_ENDIF'])
      expect(r.success).toBe(true)
      expect(r.finalStack).toEqual([1])
    })

    it('locking/unlocking style: signature pubkey OP_2 OP_2 OP_EQUALVERIFY OP_CHECKSIG succeeds', () => {
      const i = new ScriptInterpreter()
      const r = i.execute(['signature', 'pubkey', 'OP_2', 'OP_2', 'OP_EQUALVERIFY', 'OP_CHECKSIG'])
      expect(r.success).toBe(true)
      expect(r.finalStack.length).toBeGreaterThan(0)
      expect(r.finalStack[r.finalStack.length - 1]).toBe(1)
    })

    it('OP_ADD on empty stack fails with stack error', () => {
      const i = new ScriptInterpreter()
      const r = i.execute(['OP_ADD'])
      expect(r.success).toBe(false)
      expect(r.error).toMatch(/[Ss]tack|less than 2/)
    })

    it('OP_DROP on empty stack fails', () => {
      const i = new ScriptInterpreter()
      const r = i.execute(['OP_DROP'])
      expect(r.success).toBe(false)
      expect(r.error).toMatch(/[Ss]tack|empty/i)
    })

    it('OP_SUB: OP_10 OP_3 OP_SUB produces [7]', () => {
      const i = new ScriptInterpreter()
      const r = i.execute(['OP_10', 'OP_3', 'OP_SUB'])
      expect(r.success).toBe(true)
      expect(r.finalStack).toEqual([7])
    })

    it('OP_1ADD: OP_5 OP_1ADD produces [6]', () => {
      const i = new ScriptInterpreter()
      const r = i.execute(['OP_5', 'OP_1ADD'])
      expect(r.success).toBe(true)
      expect(r.finalStack).toEqual([6])
    })

    it('OP_1SUB: OP_5 OP_1SUB produces [4]', () => {
      const i = new ScriptInterpreter()
      const r = i.execute(['OP_5', 'OP_1SUB'])
      expect(r.success).toBe(true)
      expect(r.finalStack).toEqual([4])
    })

    it('OP_NEGATE: OP_7 OP_NEGATE produces [-7]', () => {
      const i = new ScriptInterpreter()
      const r = i.execute(['OP_7', 'OP_NEGATE'])
      expect(r.success).toBe(true)
      expect(r.finalStack).toEqual([-7])
    })

    it('OP_ABS: OP_1NEGATE OP_ABS produces [1]', () => {
      const i = new ScriptInterpreter()
      const r = i.execute(['OP_1NEGATE', 'OP_ABS'])
      expect(r.success).toBe(true)
      expect(r.finalStack).toEqual([1])
    })

    it('OP_NOT: OP_0 OP_NOT produces [1]', () => {
      const i = new ScriptInterpreter()
      const r = i.execute(['OP_0', 'OP_NOT'])
      expect(r.success).toBe(true)
      expect(r.finalStack).toEqual([1])
    })

    it('OP_NOT: OP_1 OP_NOT produces [0] (script invalid: top is 0)', () => {
      const i = new ScriptInterpreter()
      const r = i.execute(['OP_1', 'OP_NOT'])
      expect(r.finalStack).toEqual([0])
      expect(r.success).toBe(false)
    })

    it('OP_0NOTEQUAL: OP_5 OP_0NOTEQUAL produces [1]', () => {
      const i = new ScriptInterpreter()
      const r = i.execute(['OP_5', 'OP_0NOTEQUAL'])
      expect(r.success).toBe(true)
      expect(r.finalStack).toEqual([1])
    })

    it('OP_0NOTEQUAL: OP_0 OP_0NOTEQUAL produces [0] (script invalid: top is 0)', () => {
      const i = new ScriptInterpreter()
      const r = i.execute(['OP_0', 'OP_0NOTEQUAL'])
      expect(r.finalStack).toEqual([0])
      expect(r.success).toBe(false)
    })

    // --- Stack ops ---
    it('OP_SWAP: OP_1 OP_2 OP_SWAP produces [2, 1]', () => {
      const i = new ScriptInterpreter()
      const r = i.execute(['OP_1', 'OP_2', 'OP_SWAP'])
      expect(r.success).toBe(true)
      expect(r.finalStack).toEqual([2, 1])
    })

    it('OP_SWAP on single item fails', () => {
      const i = new ScriptInterpreter()
      const r = i.execute(['OP_1', 'OP_SWAP'])
      expect(r.success).toBe(false)
      expect(r.error).toMatch(/[Ss]tack|less than 2/)
    })

    it('OP_OVER: OP_1 OP_2 OP_OVER produces [1, 2, 1]', () => {
      const i = new ScriptInterpreter()
      const r = i.execute(['OP_1', 'OP_2', 'OP_OVER'])
      expect(r.success).toBe(true)
      expect(r.finalStack).toEqual([1, 2, 1])
    })

    it('OP_ROT: OP_1 OP_2 OP_3 OP_ROT produces [2, 3, 1]', () => {
      const i = new ScriptInterpreter()
      const r = i.execute(['OP_1', 'OP_2', 'OP_3', 'OP_ROT'])
      expect(r.success).toBe(true)
      expect(r.finalStack).toEqual([2, 3, 1])
    })

    it('OP_2DROP: OP_1 OP_2 OP_3 OP_2DROP produces [1]', () => {
      const i = new ScriptInterpreter()
      const r = i.execute(['OP_1', 'OP_2', 'OP_3', 'OP_2DROP'])
      expect(r.success).toBe(true)
      expect(r.finalStack).toEqual([1])
    })

    it('OP_2DUP: OP_1 OP_2 OP_2DUP produces [1, 2, 1, 2]', () => {
      const i = new ScriptInterpreter()
      const r = i.execute(['OP_1', 'OP_2', 'OP_2DUP'])
      expect(r.success).toBe(true)
      expect(r.finalStack).toEqual([1, 2, 1, 2])
    })

    it('OP_NIP: OP_1 OP_2 OP_NIP produces [2]', () => {
      const i = new ScriptInterpreter()
      const r = i.execute(['OP_1', 'OP_2', 'OP_NIP'])
      expect(r.success).toBe(true)
      expect(r.finalStack).toEqual([2])
    })

    it('OP_TUCK: OP_1 OP_2 OP_TUCK produces [2, 2, 1]', () => {
      const i = new ScriptInterpreter()
      const r = i.execute(['OP_1', 'OP_2', 'OP_TUCK'])
      expect(r.success).toBe(true)
      expect(r.finalStack).toEqual([2, 2, 1])
    })

    // --- Comparison ---
    it('OP_LESSTHAN: OP_2 OP_5 OP_LESSTHAN produces [1]', () => {
      const i = new ScriptInterpreter()
      const r = i.execute(['OP_2', 'OP_5', 'OP_LESSTHAN'])
      expect(r.success).toBe(true)
      expect(r.finalStack).toEqual([1])
    })

    it('OP_GREATERTHAN: OP_5 OP_2 OP_GREATERTHAN produces [1]', () => {
      const i = new ScriptInterpreter()
      const r = i.execute(['OP_5', 'OP_2', 'OP_GREATERTHAN'])
      expect(r.success).toBe(true)
      expect(r.finalStack).toEqual([1])
    })

    it('OP_LESSTHANOREQUAL: OP_5 OP_5 OP_LESSTHANOREQUAL produces [1]', () => {
      const i = new ScriptInterpreter()
      const r = i.execute(['OP_5', 'OP_5', 'OP_LESSTHANOREQUAL'])
      expect(r.success).toBe(true)
      expect(r.finalStack).toEqual([1])
    })

    it('OP_GREATERTHANOREQUAL: OP_3 OP_5 produces [0] (script invalid: top is 0)', () => {
      const i = new ScriptInterpreter()
      const r = i.execute(['OP_3', 'OP_5', 'OP_GREATERTHANOREQUAL'])
      expect(r.finalStack).toEqual([0])
      expect(r.success).toBe(false)
    })

    it('OP_MIN: OP_10 OP_3 OP_MIN produces [3]', () => {
      const i = new ScriptInterpreter()
      const r = i.execute(['OP_10', 'OP_3', 'OP_MIN'])
      expect(r.success).toBe(true)
      expect(r.finalStack).toEqual([3])
    })

    it('OP_MAX: OP_3 OP_10 OP_MAX produces [10]', () => {
      const i = new ScriptInterpreter()
      const r = i.execute(['OP_3', 'OP_10', 'OP_MAX'])
      expect(r.success).toBe(true)
      expect(r.finalStack).toEqual([10])
    })

    // --- Control flow: OP_NOTIF; OP_ELSE/OP_ENDIF without OP_IF ---
    it('OP_NOTIF with zero: else branch runs', () => {
      const i = new ScriptInterpreter()
      const r = i.execute(['OP_0', 'OP_NOTIF', 'OP_1', 'OP_ELSE', 'OP_0', 'OP_ENDIF'])
      expect(r.success).toBe(true)
      expect(r.finalStack).toEqual([1])
    })

    it('OP_ELSE without matching OP_IF fails', () => {
      const i = new ScriptInterpreter()
      const r = i.execute(['OP_ELSE'])
      expect(r.success).toBe(false)
      expect(r.error).toMatch(/No matching OP_IF|OP_IF/i)
    })

    it('OP_ENDIF without matching OP_IF fails', () => {
      const i = new ScriptInterpreter()
      const r = i.execute(['OP_ENDIF'])
      expect(r.success).toBe(false)
      expect(r.error).toMatch(/No matching OP_IF|OP_IF/i)
    })

    // --- Crypto ---
    it('OP_SHA256: pops bytes, pushes hex string', () => {
      const i = new ScriptInterpreter()
      const r = i.execute(['hello', 'OP_SHA256'])
      expect(r.success).toBe(true)
      expect(r.finalStack.length).toBe(1)
      expect(typeof r.finalStack[0]).toBe('string')
      expect((r.finalStack[0] as string).startsWith('0x')).toBe(true)
    })

    it('OP_HASH160: pops bytes, pushes hex string', () => {
      const i = new ScriptInterpreter()
      const r = i.execute(['data', 'OP_HASH160'])
      expect(r.success).toBe(true)
      expect(r.finalStack.length).toBe(1)
      expect((r.finalStack[0] as string).startsWith('0x')).toBe(true)
    })

    it('OP_HASH256: pops bytes, pushes hex string', () => {
      const i = new ScriptInterpreter()
      const r = i.execute(['x', 'OP_HASH256'])
      expect(r.success).toBe(true)
      expect((r.finalStack[0] as string).startsWith('0x')).toBe(true)
    })

    it('OP_CHECKSIG with stack < 2 fails', () => {
      const i = new ScriptInterpreter()
      const r = i.execute(['OP_1', 'OP_CHECKSIG'])
      expect(r.success).toBe(false)
      expect(r.error).toMatch(/[Ss]tack|less than 2/)
    })

    it('OP_CHECKSIGVERIFY with stack < 2 fails', () => {
      const i = new ScriptInterpreter()
      const r = i.execute(['OP_CHECKSIGVERIFY'])
      expect(r.success).toBe(false)
      expect(r.error).toMatch(/[Ss]tack|less than 2/)
    })

    // --- Data and execute(): pushData, non-OP string, OP_TRUE/OP_FALSE, reset/getStack/getSteps ---
    it('pushData via execute: string as data', () => {
      const i = new ScriptInterpreter()
      const r = i.execute(['hello'])
      expect(r.success).toBe(true)
      expect(r.finalStack).toEqual(['hello'])
    })

    it('pushData via execute: number as data', () => {
      const i = new ScriptInterpreter()
      const r = i.execute([42])
      expect(r.success).toBe(true)
      expect(r.finalStack).toEqual([42])
    })

    it('pushData via execute: hex string as data', () => {
      const i = new ScriptInterpreter()
      const r = i.execute(['0xabcd'])
      expect(r.success).toBe(true)
      expect(r.finalStack).toEqual(['0xabcd'])
    })

    it('pushData via execute: Uint8Array as data', () => {
      const i = new ScriptInterpreter()
      const r = i.execute([new Uint8Array([0xab, 0xcd])])
      expect(r.success).toBe(true)
      expect(r.finalStack.length).toBe(1)
      expect(r.finalStack[0] instanceof Uint8Array).toBe(true)
      expect((r.finalStack[0] as Uint8Array)[0]).toBe(0xab)
    })

    it('non-OP string in execute treated as data', () => {
      const i = new ScriptInterpreter()
      const r = i.execute(['notAnOpCode'])
      expect(r.success).toBe(true)
      expect(r.finalStack).toEqual(['notAnOpCode'])
    })

    it('OP_TRUE and OP_FALSE aliases', () => {
      const i = new ScriptInterpreter()
      const r = i.execute(['OP_TRUE', 'OP_TRUE', 'OP_EQUAL'])
      expect(r.success).toBe(true)
      expect(r.finalStack).toEqual([1])
    })

    it('reset and getStack/getSteps', () => {
      const i = new ScriptInterpreter()
      i.execute(['OP_1', 'OP_2'])
      expect(i.getStack()).toEqual([1, 2])
      expect(i.getSteps().length).toBe(2)
      i.reset()
      expect(i.getStack()).toEqual([])
      expect(i.getSteps()).toEqual([])
    })

    it('stack overflow: 1001 pushes throws', () => {
      const i = new ScriptInterpreter()
      const script = Array(1001).fill('OP_1')
      expect(() => i.execute(script)).toThrow(/Stack overflow|1000/i)
    })

    // --- Validity: empty final stack or top 0 => success: false ---
    it('empty final stack => success false', () => {
      const i = new ScriptInterpreter()
      const r = i.execute(['OP_1', 'OP_DROP'])
      expect(r.success).toBe(false)
      expect(r.finalStack).toEqual([])
    })

    it('top is 0 => success false', () => {
      const i = new ScriptInterpreter()
      const r = i.execute(['OP_1', 'OP_1', 'OP_EQUAL', 'OP_1', 'OP_SUB'])
      expect(r.finalStack).toEqual([0])
      expect(r.success).toBe(false)
    })
  })
})
