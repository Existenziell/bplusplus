'use client'

import InfoTooltip from '@/app/components/stack-lab/InfoTooltip'
import StackLabCard from '@/app/components/stack-lab/StackLabCard'

interface ScriptTemplate {
  name: string
  description: string
  unlockingScript: Array<string | number>
  lockingScript: Array<string | number>
}

const TEMPLATES: ScriptTemplate[] = [
  {
    name: 'P2PKH',
    description: 'Pay-to-Pubkey-Hash',
    unlockingScript: ['sig_example_123', 'pubkey'],
    lockingScript: ['OP_DUP', 'OP_HASH160', '0x7075626b6579', 'OP_EQUALVERIFY', 'OP_CHECKSIG'],
  },
  {
    name: 'Simple Addition',
    description: '5 + 3 = 8',
    unlockingScript: [5, 3],
    lockingScript: ['OP_ADD', 8, 'OP_EQUAL'],
  },
  {
    name: 'Stack Operations',
    description: 'DUP, SWAP, DROP',
    unlockingScript: [10, 20],
    lockingScript: ['OP_DUP', 'OP_SWAP', 'OP_DROP'],
  },
  {
    name: 'Conditional',
    description: 'IF/ELSE example',
    unlockingScript: [1],
    lockingScript: ['OP_IF', 100, 'OP_ELSE', 200, 'OP_ENDIF'],
  },
  {
    name: 'Comparison',
    description: 'Check if equal',
    unlockingScript: [5, 5],
    lockingScript: ['OP_EQUAL'],
  },
  {
    name: 'Hash Operation',
    description: 'SHA256 hash',
    unlockingScript: ['hello_world'],
    lockingScript: ['OP_SHA256'],
  },
  {
    name: 'Arithmetic',
    description: 'Add and subtract',
    unlockingScript: [10, 5],
    lockingScript: ['OP_ADD', 3, 'OP_SUB'],
  },
  {
    name: 'Verify',
    description: 'Verify condition',
    unlockingScript: [1],
    lockingScript: ['OP_VERIFY', 1],
  },
  {
    name: 'Min/Max',
    description: 'Find minimum',
    unlockingScript: [10, 5],
    lockingScript: ['OP_MIN'],
  },
  {
    name: 'Nested Conditional',
    description: 'Complex IF/ELSE',
    unlockingScript: [1, 2],
    lockingScript: ['OP_IF', 'OP_DUP', 'OP_ELSE', 'OP_DROP', 'OP_ENDIF'],
  },
  {
    name: 'Stack Duplication',
    description: '2DUP example',
    unlockingScript: [10, 20],
    lockingScript: ['OP_2DUP', 'OP_ADD'],
  },
  {
    name: 'Rotation',
    description: 'Rotate stack items',
    unlockingScript: [1, 2, 3],
    lockingScript: ['OP_ROT'],
  },
]

interface ScriptTemplatesProps {
  onLoadTemplate: (template: ScriptTemplate) => void
}

export default function ScriptTemplates({ onLoadTemplate }: ScriptTemplatesProps) {
  return (
    <StackLabCard>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-zinc-300">Script Templates</h3>
        <InfoTooltip content="Click on a template to load a pre-built script example. Templates demonstrate common Bitcoin Script patterns and can be modified after loading." />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {TEMPLATES.map((template, index) => (
          <button
            key={index}
            onClick={() => onLoadTemplate(template)}
            className="text-left p-2 bg-zinc-800 border border-zinc-700 rounded hover:border-btc hover:bg-zinc-700 transition-colors"
          >
            <div className="font-semibold text-zinc-200 text-xs mb-0.5">
              {template.name}
            </div>
            <div className="text-xs text-zinc-400 line-clamp-2">
              {template.description}
            </div>
          </button>
        ))}
      </div>
    </StackLabCard>
  )
}
