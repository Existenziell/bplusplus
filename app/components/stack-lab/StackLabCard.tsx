'use client'

interface StackLabCardProps {
  children: React.ReactNode
  className?: string
  /** If true, adds flex flex-col and h-full for scrollable content areas. */
  flex?: boolean
}

export default function StackLabCard({ children, className = '', flex = false }: StackLabCardProps) {
  return (
    <div
      className={`bg-gray-100 dark:bg-gray-900 rounded-lg border border-gray-300 dark:border-gray-700 p-4 ${flex ? 'h-full flex flex-col' : ''} ${className}`.trim()}
    >
      {children}
    </div>
  )
}
