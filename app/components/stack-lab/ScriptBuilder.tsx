'use client'

import { useState } from 'react'
import { useDroppable } from '@dnd-kit/core'
import { StackItem } from '@/app/utils/stackLabInterpreter'
import { XIcon, InfoIcon } from '@/app/components/Icons'

interface ScriptBuilderProps {
  id: string
  title: string
  script: Array<string | StackItem>
  onRemove: (index: number) => void
  onEdit?: (index: number, newValue: string | StackItem) => void
}

function ScriptItem({ 
  item, 
  index, 
  onRemove,
  onEdit
}: { 
  item: string | StackItem
  index: number
  onRemove: (index: number) => void
  onEdit?: (index: number, newValue: string | StackItem) => void
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState('')

  const handleEdit = () => {
    if (typeof item === 'string' || typeof item === 'number') {
      // Set to original value when starting to edit
      setEditValue(String(item))
      setIsEditing(true)
    }
  }

  const handleSave = () => {
    if (onEdit) {
      // Try to parse as number, otherwise use as string
      const trimmed = editValue.trim()
      if (trimmed === '') {
        // Empty string - don't save, just cancel
        handleCancel()
        return
      }
      const numValue = Number(trimmed)
      const newValue = !isNaN(numValue) && trimmed !== '' ? numValue : trimmed
      onEdit(index, newValue)
    }
    setIsEditing(false)
    setEditValue('')
  }

  const handleCancel = () => {
    // Reset edit value to original item value and exit edit mode
    setEditValue(typeof item === 'string' || typeof item === 'number' ? String(item) : '')
    setIsEditing(false)
  }
  const formatItem = (item: string | StackItem): string => {
    if (typeof item === 'string') {
      if (item.startsWith('0x') && item.length > 20) {
        return `${item.slice(0, 10)}...`
      }
      return item
    }
    if (typeof item === 'number') {
      return item.toString()
    }
    if (typeof item === 'boolean') {
      return item ? 'true' : 'false'
    }
    if (item instanceof Uint8Array) {
      return `0x${Array.from(item.slice(0, 8)).map(b => b.toString(16).padStart(2, '0')).join('')}...`
    }
    return String(item)
  }

  if (isEditing) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 bg-zinc-800 border border-btc rounded">
        <input
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              handleSave()
            } else if (e.key === 'Escape') {
              e.preventDefault()
              handleCancel()
            }
          }}
          onBlur={(e) => {
            // Only save on blur if not clicking cancel button
            const relatedTarget = e.relatedTarget as HTMLElement
            if (!relatedTarget || !relatedTarget.closest('button[data-cancel]')) {
              handleSave()
            } else {
              handleCancel()
            }
          }}
          className="flex-1 bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-sm font-mono text-zinc-200 focus:outline-none focus:border-btc"
          autoFocus
        />
        <button
          onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
            handleSave()
          }}
          onMouseDown={(e) => e.preventDefault()}
          className="px-2 py-1 bg-btc text-zinc-900 text-xs font-semibold rounded hover:bg-btc/80 transition-colors"
        >
          Save
        </button>
        <button
          data-cancel
          onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
            handleCancel()
          }}
          onMouseDown={(e) => e.preventDefault()}
          className="px-2 py-1 bg-zinc-700 text-zinc-200 text-xs rounded hover:bg-zinc-600 transition-colors"
        >
          Cancel
        </button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-zinc-800 border border-zinc-700 rounded hover:border-zinc-600 transition-colors group">
      <div 
        className="flex-1 font-mono text-sm text-zinc-200 cursor-text"
        onClick={handleEdit}
        title="Click to edit"
      >
        {formatItem(item)}
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation()
          e.preventDefault()
          onRemove(index)
        }}
        className="p-1 hover:bg-zinc-700 rounded transition-colors flex-shrink-0 opacity-0 group-hover:opacity-100"
        title="Remove"
      >
        <XIcon className="w-4 h-4 text-zinc-400" />
      </button>
    </div>
  )
}

export default function ScriptBuilder({
  id,
  title,
  script,
  onRemove,
  onEdit,
}: ScriptBuilderProps) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  })

  const getInfoText = () => {
    if (id === 'unlocking-script') {
      return 'Unlocking Script (scriptSig): Runs first. Provides the data and operations (signatures, keys, etc.) needed to satisfy the locking script\'s conditions. This script is included in the transaction input when spending Bitcoin. It runs first, pushing data onto the stack.'
    }
    return 'Locking Script (scriptPubKey): Runs second. Defines the conditions/requirements that must be met to unlock and spend the Bitcoin. This script is stored in the transaction output and specifies what data or operations are required. It runs after the unlocking script, verifying that the data satisfies the conditions.'
  }

  return (
    <div className="bg-zinc-900 dark:bg-zinc-950 rounded-lg border border-zinc-700 p-4 flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-zinc-300">{title}</h3>
        <div className="group relative">
          <InfoIcon className="w-4 h-4 text-zinc-500 hover:text-zinc-300 cursor-help" />
          <div className="absolute right-0 top-6 w-64 p-3 bg-zinc-800 border border-zinc-700 rounded shadow-lg text-xs text-zinc-300 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
            {getInfoText()}
          </div>
        </div>
      </div>
      
      <div
        ref={setNodeRef}
        className={`
          overflow-y-auto h-[250px] p-3 rounded border-2 border-dashed
          ${isOver
            ? 'border-btc bg-btc/10'
            : 'border-zinc-700 bg-zinc-800/30'
          }
          transition-colors
        `}
      >
        {script.length === 0 ? (
          <div className="flex items-center justify-center h-[200px] text-zinc-500 text-sm text-center">
            <div>
              <div className="mb-2">Drop OP codes here</div>
              <div className="text-xs">or click &quot;+ Push Data&quot; to add data</div>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {script.map((item, index) => (
              <ScriptItem
                key={index}
                item={item}
                index={index}
                onRemove={onRemove}
                onEdit={onEdit}
              />
            ))}
          </div>
        )}
      </div>
      
      <div className="mt-3 pt-3 border-t border-zinc-700 text-xs text-zinc-500">
        {script.length} item{script.length !== 1 ? 's' : ''}
      </div>
    </div>
  )
}
