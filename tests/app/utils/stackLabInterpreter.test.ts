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
  })
})
