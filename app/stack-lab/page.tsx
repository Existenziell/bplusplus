'use client'

import { useState, useCallback, useEffect } from 'react'
import { DndContext, DragEndEvent, DragOverlay, closestCenter } from '@dnd-kit/core'
import StackVisualization from '@/app/components/stack-lab/StackVisualization'
import OpCodePalette from '@/app/components/stack-lab/OpCodePalette'
import ScriptBuilder from '@/app/components/stack-lab/ScriptBuilder'
import ExecutionControls from '@/app/components/stack-lab/ExecutionControls'
import ExecutionLog from '@/app/components/stack-lab/ExecutionLog'
import ScriptTemplates from '@/app/components/stack-lab/ScriptTemplates'
import { ScriptInterpreter, type StackItem, type ExecutionStep } from '@/app/utils/stackLabInterpreter'
import { ChevronDown, InfoIcon } from '@/app/components/Icons'

export default function StackLabPage() {
  const [isMounted, setIsMounted] = useState(false)
  const [unlockingScript, setUnlockingScript] = useState<Array<string | StackItem>>([])
  const [lockingScript, setLockingScript] = useState<Array<string | StackItem>>([])
  const [stack, setStack] = useState<StackItem[]>([])
  const [executionSteps, setExecutionSteps] = useState<ExecutionStep[]>([])
  const [currentStepIndex, setCurrentStepIndex] = useState(-1)
  const [isExecuting, setIsExecuting] = useState(false)
  const [showDataModal, setShowDataModal] = useState(false)
  const [dataModalTarget, setDataModalTarget] = useState<'unlocking' | 'locking' | null>(null)
  const [dataInput, setDataInput] = useState('')
  const [activeId, setActiveId] = useState<string | null>(null)
  const [activeItem, setActiveItem] = useState<string | StackItem | null>(null)
  const [showMobileWarning, setShowMobileWarning] = useState(false)
  const [mobileWarningDismissed, setMobileWarningDismissed] = useState(false)
  const [isFlowExplanationExpanded, setIsFlowExplanationExpanded] = useState(false)

  const interpreter = new ScriptInterpreter()

  // Prevent hydration mismatch by only rendering on client
  useEffect(() => {
    setIsMounted(true)
    
    // Check if mobile warning was previously dismissed
    const dismissed = localStorage.getItem('stack-lab-mobile-warning-dismissed')
    if (dismissed === 'true') {
      setMobileWarningDismissed(true)
      return
    }

    // Check if device is mobile
    const checkMobile = () => {
      const isMobile = window.innerWidth < 1024 // lg breakpoint
      if (isMobile) {
        setShowMobileWarning(true)
      }
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleDismissMobileWarning = (remember: boolean) => {
    setShowMobileWarning(false)
    setMobileWarningDismissed(true)
    if (remember) {
      localStorage.setItem('stack-lab-mobile-warning-dismissed', 'true')
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over, delta } = event
    setActiveId(null)
    setActiveItem(null)

    // Only process if there was an actual drag to a drop zone
    if (!over) return
    
    // Check if this was just a click (no actual movement)
    // If active and over are the same, it was likely just a click
    if (active.id === over.id) return
    
    // Check if there was meaningful drag distance (at least 5px)
    if (delta && (Math.abs(delta.x) < 5 && Math.abs(delta.y) < 5)) {
      return
    }

    const activeId = active.id as string
    const overId = over.id as string

    // Handle OP code drop - only if dropped on a script area
    if (activeId.startsWith('opcode-')) {
      const opCode = activeId.replace('opcode-', '')
      
      if (overId === 'unlocking-script') {
        setUnlockingScript(prev => [...prev, opCode])
      } else if (overId === 'locking-script') {
        setLockingScript(prev => [...prev, opCode])
      }
    }
  }

  const handleDragStart = (event: any) => {
    const id = event.active.id as string
    setActiveId(id)
    setActiveItem(null) // Only OP codes are draggable now
  }

  const handleRemoveFromScript = (scriptType: 'unlocking' | 'locking', index: number) => {
    if (scriptType === 'unlocking') {
      setUnlockingScript(prev => prev.filter((_, i) => i !== index))
    } else {
      setLockingScript(prev => prev.filter((_, i) => i !== index))
    }
  }

  const handleEditScriptItem = (scriptType: 'unlocking' | 'locking', index: number, newValue: string | StackItem) => {
    if (scriptType === 'unlocking') {
      setUnlockingScript(prev => {
        const updated = [...prev]
        updated[index] = newValue
        return updated
      })
    } else {
      setLockingScript(prev => {
        const updated = [...prev]
        updated[index] = newValue
        return updated
      })
    }
  }

  const [executionResult, setExecutionResult] = useState<{ success: boolean; error?: string } | undefined>(undefined)

  const handleExecute = useCallback(() => {
    setIsExecuting(true)
    setCurrentStepIndex(-1)

    // Combine unlocking and locking scripts
    const fullScript = [...unlockingScript, ...lockingScript]
    
    const result = interpreter.execute(fullScript)
    
    setStack(result.finalStack)
    setExecutionSteps(result.steps)
    setCurrentStepIndex(result.steps.length - 1)
    setExecutionResult({
      success: result.success,
      error: result.error,
    })
    setIsExecuting(false)
  }, [unlockingScript, lockingScript])

  const handleStep = useCallback(() => {
    const fullScript = [...unlockingScript, ...lockingScript]
    if (fullScript.length === 0) return

    if (currentStepIndex < 0) {
      // Start execution from beginning
      const scriptToExecute = fullScript.slice(0, 1)
      const result = interpreter.execute(scriptToExecute)
      setStack(result.finalStack)
      setExecutionSteps(result.steps)
      setCurrentStepIndex(0)
    } else if (currentStepIndex < executionSteps.length - 1) {
      // Move to next already-executed step
      setCurrentStepIndex(prev => prev + 1)
      if (executionSteps[currentStepIndex + 1]) {
        setStack(executionSteps[currentStepIndex + 1].stackAfter)
      }
    } else {
      // Execute next step
      const nextIndex = currentStepIndex + 1
      if (nextIndex >= fullScript.length) return
      
      const scriptToExecute = fullScript.slice(0, nextIndex + 1)
      const result = interpreter.execute(scriptToExecute)
      setStack(result.finalStack)
      setExecutionSteps(result.steps)
      setCurrentStepIndex(nextIndex)
    }
  }, [currentStepIndex, executionSteps, unlockingScript, lockingScript])

  const handleStepBack = useCallback(() => {
    if (currentStepIndex <= 0) {
      // Go back to initial state (before execution)
      setCurrentStepIndex(-1)
      setStack([])
      setExecutionSteps([])
    } else {
      // Go back to previous step
      const prevIndex = currentStepIndex - 1
      setCurrentStepIndex(prevIndex)
      if (executionSteps[prevIndex]) {
        setStack(executionSteps[prevIndex].stackAfter)
      }
    }
  }, [currentStepIndex, executionSteps])

  const handleReset = () => {
    setStack([])
    setExecutionSteps([])
    setCurrentStepIndex(-1)
    setExecutionResult(undefined)
    setUnlockingScript([])
    setLockingScript([])
  }

  const handleLoadTemplate = (template: { unlockingScript: Array<string | number>, lockingScript: Array<string | number> }) => {
    // Reset first to clear execution state
    setStack([])
    setExecutionSteps([])
    setCurrentStepIndex(-1)
    // Then load the template scripts
    setUnlockingScript(template.unlockingScript)
    setLockingScript(template.lockingScript)
  }

  const handleAddData = (target: 'unlocking' | 'locking') => {
    setDataModalTarget(target)
    setShowDataModal(true)
    setDataInput('')
  }

  const handleDataSubmit = () => {
    if (!dataModalTarget || !dataInput.trim()) return

    // Try to parse as number, otherwise use as string
    let value: StackItem = dataInput.trim()
    const numValue = Number(dataInput.trim())
    if (!isNaN(numValue) && dataInput.trim() !== '') {
      value = numValue
    }

    if (dataModalTarget === 'unlocking') {
      setUnlockingScript(prev => [...prev, value])
    } else {
      setLockingScript(prev => [...prev, value])
    }

    setShowDataModal(false)
    setDataModalTarget(null)
    setDataInput('')
  }

  if (!isMounted) {
    return (
      <>
        <h1 className="heading-page text-center mb-1">
          Stack Lab
        </h1>
        <p className="text-secondary text-center mb-8 max-w-2xl mx-auto">
          Interactive Bitcoin Script Playground
        </p>
        <div className="text-center text-zinc-500">Loading...</div>
      </>
    )
  }

  return (
    <>
      <h1 className="heading-page text-center mb-1">
        Stack Lab
      </h1>
      <p className="text-secondary text-center mb-8 max-w-2xl mx-auto">
        Interactive Bitcoin Script Playground
      </p>

      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
        modifiers={[]}
        
      >
        <div className="space-y-6">
          {/* Flow Explanation */}
          <div className="bg-zinc-900 dark:bg-zinc-950 rounded-lg border border-zinc-700 p-4">
            <button
              onClick={() => setIsFlowExplanationExpanded(!isFlowExplanationExpanded)}
              className="w-full flex items-center justify-between text-left"
            >
              <div className="flex items-center gap-2">
                <InfoIcon className="w-5 h-5 text-zinc-200" />
                <h3 className="text-sm font-semibold text-zinc-300">How Stack Lab Works</h3>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-zinc-400 transition-transform ${
                  isFlowExplanationExpanded ? 'rotate-180' : ''
                }`}
              />
            </button>
            {isFlowExplanationExpanded && (
              <div className="mt-3 space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-zinc-300 mb-2">How to Use</h4>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    <strong className="text-zinc-300">1. Build Scripts:</strong><br />Drag OP codes from the palette to the Unlocking Script (runs first) and Locking Script (runs second). 
                    You can also push data (numbers, hex strings) using the &quot;+ Push Data&quot; button or load an example template.
                    <br />
                    <strong className="text-zinc-300">2. Execute:</strong><br />Click &quot;Execute&quot; to run both scripts together, or use &quot;Step&quot; to execute one operation at a time. 
                    Watch the stack update in real-time as operations execute.
                    <br />
                    <strong className="text-zinc-300">3. Learn:</strong><br />The execution log shows each step with the stack state before and after each operation. 
                    A script is valid if the final stack contains a non-zero value.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Templates */}
          <ScriptTemplates onLoadTemplate={handleLoadTemplate} />

          {/* Execution Log */}
          {executionSteps.length > 0 && (
            <ExecutionLog 
              steps={executionSteps} 
              currentStep={currentStepIndex}
              executionResult={executionResult}
            />
          )}

          {/* Main workspace */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: OP Code Palette */}
            <div className="lg:col-span-1">
              <div className="sticky top-4">
                <OpCodePalette onAddData={() => handleAddData('unlocking')} />
              </div>
            </div>

            {/* Center: Script Builders */}
            <div className="lg:col-span-1">
              <div className="sticky top-4 space-y-4">
                <ScriptBuilder
                  id="unlocking-script"
                  title="Unlocking Script"
                  script={unlockingScript}
                  onRemove={(index) => handleRemoveFromScript('unlocking', index)}
                  onEdit={(index, newValue) => handleEditScriptItem('unlocking', index, newValue)}
                />
                <ScriptBuilder
                  id="locking-script"
                  title="Locking Script"
                  script={lockingScript}
                  onRemove={(index) => handleRemoveFromScript('locking', index)}
                  onEdit={(index, newValue) => handleEditScriptItem('locking', index, newValue)}
                />
              </div>
            </div>

            {/* Right: Stack Visualization */}
            <div className="lg:col-span-1">
              <div className="sticky top-4 space-y-4">
                <StackVisualization stack={stack} />
                
                {/* Execution Controls */}
                <div className="flex justify-center">
                  <ExecutionControls
                    onExecute={handleExecute}
                    onStep={handleStep}
                    onStepBack={handleStepBack}
                    onReset={handleReset}
                    canStep={(unlockingScript.length > 0 || lockingScript.length > 0) && !isExecuting && (executionSteps.length === 0 || currentStepIndex < (unlockingScript.length + lockingScript.length - 1))}
                    canStepBack={currentStepIndex >= 0 && !isExecuting}
                    canExecute={unlockingScript.length > 0 || lockingScript.length > 0}
                    isExecuting={isExecuting}
                  />
                </div>
              </div>
            </div>
          </div>

          <DragOverlay dropAnimation={null}>
            {activeId && activeId.startsWith('opcode-') ? (
              <div className="px-3 py-2 rounded border bg-zinc-800 border-zinc-600 text-zinc-200 pointer-events-none">
                <div className="font-mono text-sm font-semibold">
                  {activeId.replace('opcode-', '')}
                </div>
              </div>
            ) : null}
          </DragOverlay>
        </div>
      </DndContext>

      {/* Mobile Warning Modal */}
      {showMobileWarning && !mobileWarningDismissed && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <p className="text-sm text-zinc-400 mb-6">
              Stack Lab is not optimized for small screens. The drag-and-drop interface and layout work best on desktop or tablet devices with larger screens.
            </p>
            <p className="text-sm text-zinc-400 mb-6">
              You can still use Stack Lab on mobile, but the experience may be limited. For the best experience, please use a desktop or tablet.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => handleDismissMobileWarning(false)}
                className="w-full px-4 py-2 bg-btc text-zinc-900 font-semibold rounded hover:bg-btc/80 transition-colors"
              >
                Continue Anyway
              </button>
              <button
                onClick={() => handleDismissMobileWarning(true)}
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 text-zinc-200 rounded hover:border-zinc-600 transition-colors text-sm"
              >
                Continue & Don&apos;t Show Again
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Data Input Modal */}
      {showDataModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowDataModal(false)}>
          <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-6 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-zinc-200 mb-4">
              Push Data to {dataModalTarget === 'unlocking' ? 'Unlocking' : 'Locking'} Script
            </h3>
            <p className="text-sm text-zinc-400 mb-4">
              Enter a number or hex string (e.g., 42, 0x1234, &quot;hello&quot;)
            </p>
            <input
              type="text"
              value={dataInput}
              onChange={(e) => setDataInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleDataSubmit()
                } else if (e.key === 'Escape') {
                  setShowDataModal(false)
                }
              }}
              className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded text-zinc-200 mb-4 focus:outline-none focus:border-btc"
              placeholder="Enter data..."
              autoFocus
            />
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDataModal(false)}
                className="px-4 py-2 bg-zinc-800 border border-zinc-700 text-zinc-200 rounded hover:border-zinc-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDataSubmit}
                className="px-4 py-2 bg-btc text-zinc-900 font-semibold rounded hover:bg-btc/80 transition-colors"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
