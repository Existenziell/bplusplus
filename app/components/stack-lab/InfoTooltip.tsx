'use client'

import { InfoIcon } from '@/app/components/Icons'

interface InfoTooltipProps {
  content: React.ReactNode
}

export default function InfoTooltip({ content }: InfoTooltipProps) {
  return (
    <div className="group relative">
      <InfoIcon className="w-4 h-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 cursor-help" />
      <div className="panel-base absolute right-0 top-6 w-64 p-3 shadow-lg text-xs text-gray-700 dark:text-gray-300 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
        {content}
      </div>
    </div>
  )
}
