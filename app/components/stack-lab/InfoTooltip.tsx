'use client'

import { InfoIcon } from '@/app/components/Icons'

interface InfoTooltipProps {
  content: React.ReactNode
}

export default function InfoTooltip({ content }: InfoTooltipProps) {
  return (
    <div className="group relative">
      <InfoIcon className="w-4 h-4 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 cursor-help" />
      <div className="absolute right-0 top-6 w-64 p-3 bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded shadow-lg text-xs text-zinc-700 dark:text-zinc-300 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
        {content}
      </div>
    </div>
  )
}
