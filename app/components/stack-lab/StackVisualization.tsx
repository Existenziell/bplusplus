'use client'

import { StackItem } from '@/app/utils/stackLabInterpreter'
import { InfoIcon } from '@/app/components/Icons'

interface StackVisualizationProps {
  stack: StackItem[]
}

export default function StackVisualization({ stack }: StackVisualizationProps) {
  const formatItem = (item: StackItem): string => {
    if (typeof item === 'number') {
      return item.toString()
    }
    if (typeof item === 'boolean') {
      return item ? 'true' : 'false'
    }
    if (typeof item === 'string') {
      // Truncate long hex strings
      if (item.startsWith('0x') && item.length > 20) {
        return `${item.slice(0, 10)}...${item.slice(-8)}`
      }
      return item
    }
    if (item instanceof Uint8Array) {
      return `0x${Array.from(item.slice(0, 8)).map(b => b.toString(16).padStart(2, '0')).join('')}${item.length > 8 ? '...' : ''}`
    }
    return String(item)
  }

  const getItemType = (item: StackItem): string => {
    if (typeof item === 'number') return 'number'
    if (typeof item === 'boolean') return 'boolean'
    if (typeof item === 'string') {
      if (item.startsWith('0x')) return 'hex'
      return 'string'
    }
    if (item instanceof Uint8Array) return 'bytes'
    return 'unknown'
  }

  return (
    <div className="bg-zinc-900 dark:bg-zinc-950 rounded-lg border border-zinc-700 p-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-zinc-300">Stack</h3>
        <div className="group relative">
          <InfoIcon className="w-4 h-4 text-zinc-500 hover:text-zinc-300 cursor-help" />
          <div className="absolute right-0 top-6 w-64 p-3 bg-zinc-800 border border-zinc-700 rounded shadow-lg text-xs text-zinc-300 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
            The stack is a Last-In-First-Out (LIFO) data structure. Items are pushed onto the top and popped from the top. The stack shows the current state during script execution.
          </div>
        </div>
      </div>
      
      {stack.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-zinc-500 text-sm">
          <div className="text-center">
            <div className="mb-2">Stack is empty</div>
            <div className="text-xs">Execute a script to see stack changes</div>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto">
          <div className="space-y-1">
            {/* Top indicator */}
            <div className="text-xs text-zinc-500 mb-2 px-2">Top ↓</div>
            
            {/* Stack items (reversed to show top first) */}
            {[...stack].reverse().map((item, index) => {
              const actualIndex = stack.length - 1 - index
              const isTop = actualIndex === stack.length - 1
              const itemType = getItemType(item)
              
              return (
                <div
                  key={actualIndex}
                  className={`
                    px-3 py-2 rounded border
                    ${isTop 
                      ? 'bg-btc/20 border-btc/50 text-btc' 
                      : 'bg-zinc-800/50 border-zinc-700 text-zinc-300'
                    }
                    transition-colors
                  `}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="font-mono text-sm truncate">
                        {formatItem(item)}
                      </div>
                      <div className="text-xs text-zinc-500 mt-0.5">
                        {itemType}
                      </div>
                    </div>
                    {isTop && (
                      <div className="ml-2 text-xs text-btc font-semibold">
                        TOP
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
            
            {/* Bottom indicator */}
            <div className="text-xs text-zinc-500 mt-2 px-2">Bottom ↑</div>
          </div>
        </div>
      )}
      
      {/* Stack info */}
      <div className="mt-3 pt-3 border-t border-zinc-700 text-xs text-zinc-500">
        {stack.length} item{stack.length !== 1 ? 's' : ''}
      </div>
    </div>
  )
}
