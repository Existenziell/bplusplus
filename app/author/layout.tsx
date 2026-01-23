import type { Metadata } from 'next'
import { generatePageMetadata } from '@/app/utils/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'About B++',
  description:
    'Giving back to the Bitcoin community 💛',
  path: '/author',
})

export default function AuthorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
