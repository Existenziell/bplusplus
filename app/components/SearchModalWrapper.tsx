'use client'

import { useSearchModal } from '@/app/contexts/SearchModalContext'
import SearchModal from '@/app/components/SearchModal'

/**
 * Wrapper component that renders the SearchModal using the shared context.
 * This ensures only one modal instance exists.
 */
export default function SearchModalWrapper() {
  const { isOpen, closeSearch } = useSearchModal()
  return <SearchModal isOpen={isOpen} onClose={closeSearch} />
}
