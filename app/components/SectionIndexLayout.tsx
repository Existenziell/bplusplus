import type { ReactNode } from 'react'

interface SectionIndexLayoutProps {
  title: string
  description: string
  children: ReactNode
}

export default function SectionIndexLayout({
  title,
  description,
  children,
}: SectionIndexLayoutProps) {
  return (
    <div>
      <h1 className="text-5xl font-bold mb-4">{title}</h1>
      <p className="text-xl text-zinc-400 mb-12">{description}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">{children}</div>
    </div>
  )
}
