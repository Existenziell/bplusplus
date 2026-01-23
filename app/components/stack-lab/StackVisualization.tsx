'use client'

import { StackItem } from '@/app/utils/stackLabInterpreter'
import { formatStackItem, getItemType, itemCount } from '@/app/utils/stackLabFormatters'
import InfoTooltip from '@/app/components/stack-lab/InfoTooltip'
import StackLabCard from '@/app/components/stack-lab/StackLabCard'

interface StackVisualizationProps {
  stack: StackItem[]
}

export default function StackVisualization({ stack }: StackVisualizationProps) {
  return (
    <StackLabCard flex>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-zinc-300">Stack</h3>
        <InfoTooltip content="The stack is a Last-In-First-Out (LIFO) data structure. Items are pushed onto the top and popped from the top. The stack shows the current state during script execution." />
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
                        {formatStackItem(item, { hexShowTail: true })}
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
        {itemCount(stack.length)}
      </div>
    </StackLabCard>
  )
}
