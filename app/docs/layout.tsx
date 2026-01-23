import type { ReactNode } from 'react'
import DocsLayoutWrapper from '@/app/components/DocsLayoutWrapper'

export default function DocsLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <DocsLayoutWrapper showBreadcrumbs showPageNavigation>
      {children}
    </DocsLayoutWrapper>
  )
}
