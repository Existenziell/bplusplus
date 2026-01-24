'use client'

interface ExecutionControlsProps {
  onExecute: () => void
  onStep: () => void
  onStepBack?: () => void
  onReset: () => void
  canStep: boolean
  canStepBack?: boolean
  canExecute: boolean
  isExecuting: boolean
}

export default function ExecutionControls({
  onExecute,
  onStep,
  onStepBack,
  onReset,
  canStep,
  canStepBack = false,
  canExecute,
  isExecuting,
}: ExecutionControlsProps) {
  return (
    <div className="flex items-center justify-start gap-2 w-full text-sm">
      <button
        onClick={onExecute}
        disabled={!canExecute || isExecuting}
        className="btn-primary-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Execute
      </button>
      {onStepBack && (
        <button
          onClick={onStepBack}
          disabled={!canStepBack || isExecuting}
          className="px-5 py-2 bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 rounded hover:border-btc hover:bg-zinc-300 dark:hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          title="Step back to previous execution state"
        >
          ←
        </button>
      )}
      <button
        onClick={onStep}
        disabled={!canStep || isExecuting}
        className="px-5 py-2 bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 rounded hover:border-btc hover:bg-zinc-300 dark:hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        →
      </button>
      <button
        onClick={onReset}
        disabled={isExecuting}
        className="px-4 py-2 bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 rounded hover:border-zinc-400 dark:hover:border-zinc-600 hover:bg-zinc-300 dark:hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Reset
      </button>
    </div>
  )
}
