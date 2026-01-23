'use client'

import { ExecutionStep } from '@/app/utils/stackLabInterpreter'
import { formatStackForLog } from '@/app/utils/stackLabFormatters'
import InfoTooltip from '@/app/components/stack-lab/InfoTooltip'
import StackLabCard from '@/app/components/stack-lab/StackLabCard'

interface ExecutionLogProps {
  steps: ExecutionStep[]
  currentStep: number
  executionResult?: {
    success: boolean
    error?: string
  }
}

export default function ExecutionLog({ steps, currentStep, executionResult }: ExecutionLogProps) {
  if (steps.length === 0) {
    return (
      <StackLabCard>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-zinc-300">Execution Log</h3>
          <InfoTooltip content="The execution log shows each step of script execution, including the stack state before and after each operation. Use the Step button to execute one operation at a time." />
        </div>
        <div className="text-zinc-500 text-sm text-center py-8">
          No execution steps yet
        </div>
      </StackLabCard>
    )
  }

  const hasErrors = steps.some(step => !step.success) || (executionResult && !executionResult.success)

  return (
    <StackLabCard>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-zinc-300">Execution Log</h3>
        <InfoTooltip content="The execution log shows each step of script execution, including the stack state before and after each operation. Use the Step button to execute one operation at a time." />
      </div>
      {/* Execution Summary */}
      {executionResult && (
        <div className={`mb-3 p-3 rounded border ${
          executionResult.success
            ? 'bg-emerald-900/20 border-emerald-700/50'
            : 'bg-red-900/20 border-red-700/50'
        }`}>
          <div className="flex items-center gap-2">
            <div className={`text-sm font-semibold ${
              executionResult.success ? 'text-emerald-400' : 'text-red-400'
            }`}>
              {executionResult.success ? '✓ Script Valid' : '✗ Script Invalid'}
            </div>
          </div>
          {executionResult.error && (
            <div className="text-xs text-red-400 mt-1">
              {executionResult.error}
            </div>
          )}
          {executionResult.success && steps.length > 0 && (
            <div className="text-xs text-zinc-400 mt-1">
              Final stack contains a truthy value
            </div>
          )}
        </div>
      )}

      {/* Error Summary */}
      {hasErrors && !executionResult && (
        <div className="mb-3 p-3 rounded border bg-yellow-900/20 border-yellow-700/50">
          <div className="text-sm font-semibold text-yellow-400">
            ⚠ Execution Errors Detected
          </div>
          <div className="text-xs text-yellow-300 mt-1">
            Check individual steps for error details
          </div>
        </div>
      )}

      <div className="space-y-2 max-h-[300px] overflow-y-auto">
        {steps.map((step, index) => {
          const isCurrent = index === currentStep

          return (
            <div
              key={index}
              className={`
                p-3 rounded border text-sm
                ${isCurrent
                  ? 'bg-btc/20 border-btc/50'
                  : step.success
                    ? 'bg-zinc-800/50 border-zinc-700'
                    : 'bg-red-900/20 border-red-700/50'
                }
              `}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="font-mono font-semibold text-zinc-200 mb-1">
                    {step.opCode}
                  </div>
                  {step.error && (
                    <div className="text-red-400 text-xs mb-1">
                      Error: {step.error}
                    </div>
                  )}
                  <div className="text-xs text-zinc-400 space-y-1">
                    <div>Before: {formatStackForLog(step.stackBefore)}</div>
                    <div>After: {formatStackForLog(step.stackAfter)}</div>
                  </div>
                </div>
                {isCurrent && (
                  <div className="text-xs text-btc font-semibold">Current</div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </StackLabCard>
  )
}
