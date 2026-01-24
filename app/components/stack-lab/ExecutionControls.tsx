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
          className="px-5 py-2 bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded hover:border-btc hover:bg-gray-300 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          title="Step back to previous execution state"
        >
          ←
        </button>
      )}
      <button
        onClick={onStep}
        disabled={!canStep || isExecuting}
        className="px-5 py-2 bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded hover:border-btc hover:bg-gray-300 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        →
      </button>
      <button
        onClick={onReset}
        disabled={isExecuting}
        className="px-4 py-2 bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded hover:border-gray-400 dark:hover:border-gray-600 hover:bg-gray-300 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Reset
      </button>
    </div>
  )
}
