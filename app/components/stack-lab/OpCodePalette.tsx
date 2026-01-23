'use client'

import { useDraggable } from '@dnd-kit/core'
import { OP_CODES, OP_CODE_CATEGORIES, type OpCode } from '@/app/utils/stackLabInterpreter'
import { useState } from 'react'
import { InfoIcon } from '@/app/components/Icons'

interface OpCodePaletteProps {
  onAddData?: () => void
}

function DraggableOpCode({ opCode }: { opCode: OpCode }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `opcode-${opCode.name}`,
    data: {
      type: 'opcode',
      opCode: opCode.name,
    },
  })

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={`
        px-2 py-1.5 rounded border cursor-grab active:cursor-grabbing
        ${opCode.enabled
          ? 'bg-zinc-800 border-zinc-600 hover:border-btc hover:bg-zinc-700 text-zinc-200'
          : 'bg-zinc-900 border-zinc-800 text-zinc-600 cursor-not-allowed opacity-50'
        }
        ${isDragging ? 'opacity-0 pointer-events-none' : ''}
        transition-opacity
      `}
      title={`${opCode.name} - ${opCode.description}`}
    >
      <div className="font-mono text-xs font-semibold">{opCode.name}</div>
    </div>
  )
}

export default function OpCodePalette({ onAddData }: OpCodePaletteProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredOpCodes = OP_CODES.filter(opCode => {
    const matchesSearch = opCode.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         opCode.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || opCode.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const opCodesByCategory = OP_CODE_CATEGORIES.reduce((acc, category) => {
    acc[category] = filteredOpCodes.filter(op => op.category === category)
    return acc
  }, {} as Record<string, OpCode[]>)

  return (
    <div className="bg-zinc-900 dark:bg-zinc-950 rounded-lg border border-zinc-700 p-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-zinc-300">OP Codes</h3>
        <div className="group relative">
          <InfoIcon className="w-4 h-4 text-zinc-500 hover:text-zinc-300 cursor-help" />
          <div className="absolute right-0 top-6 w-64 p-3 bg-zinc-800 border border-zinc-700 rounded shadow-lg text-xs text-zinc-300 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
            Drag OP codes from here to the script builders. OP codes are the instructions that Bitcoin Script uses to manipulate the stack and execute logic.
          </div>
        </div>
      </div>
      
      {/* Search */}
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search OP codes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-btc"
        />
      </div>

      {/* Category filter */}
      <div className="mb-3 flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`
            px-2 py-1 text-xs rounded border
            ${!selectedCategory
              ? 'bg-btc/20 border-btc text-btc'
              : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-zinc-600'
            }
          `}
        >
          All
        </button>
        {OP_CODE_CATEGORIES.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`
              px-2 py-1 text-xs rounded border
              ${selectedCategory === category
                ? 'bg-btc/20 border-btc text-btc'
                : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-zinc-600'
              }
            `}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Add Data button */}
      {onAddData && (
        <button
          onClick={onAddData}
          className="mb-3 w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded text-sm text-zinc-200 hover:border-btc hover:bg-zinc-700 transition-colors"
        >
          + Push Data
        </button>
      )}

      {/* OP Codes grid */}
      <div className="flex-1 overflow-y-auto">
        {selectedCategory ? (
          <div>
            <h4 className="text-xs font-semibold text-zinc-400 mb-2 uppercase">
              {selectedCategory}
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {opCodesByCategory[selectedCategory]?.map(opCode => (
                <DraggableOpCode key={opCode.name} opCode={opCode} />
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {OP_CODE_CATEGORIES.map(category => {
              const codes = opCodesByCategory[category]
              if (codes.length === 0) return null
              
              return (
                <div key={category}>
                  <h4 className="text-xs font-semibold text-zinc-400 mb-2 uppercase">
                    {category}
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {codes.map(opCode => (
                      <DraggableOpCode key={opCode.name} opCode={opCode} />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {filteredOpCodes.length === 0 && (
          <div className="text-center text-zinc-500 text-sm py-8">
            No OP codes found
          </div>
        )}
      </div>
    </div>
  )
}
