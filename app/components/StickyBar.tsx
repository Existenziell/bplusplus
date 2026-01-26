'use client'

import { usePathname } from 'next/navigation'
import Breadcrumbs from '@/app/components/Breadcrumbs'
import ThemeToggle from '@/app/components/ThemeToggle'
import { SearchIcon } from '@/app/components/Icons'
import { useStickyScroll } from '@/app/contexts/StickyScrollContext'
import { useSearchModal } from '@/app/contexts/SearchModalContext'

export default function StickyBar() {
  const pathname = usePathname()
  const { isSticky, scrollDirection } = useStickyScroll()
  const { openSearch } = useSearchModal()
  const showBreadcrumbs = Boolean(pathname && pathname !== '/')
  
  // Show search in sticky when sticky is active and not scrolling up
  // Hide it when scrolling up (search returns to header)
  // This makes the icons appear immediately when sticky becomes active
  const showSearchInSticky = isSticky && scrollDirection !== 'up'

  if (!showBreadcrumbs) {
    return null
  }

  return (
    <>
      <div className={`sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 shadow-sm transition-colors duration-200 ${
        isSticky 
          ? 'bg-gray-100 dark:bg-gray-800' 
          : 'bg-gray-50 dark:bg-gray-900'
      }`}>
        <div className="container-content py-2">
          <div className="flex items-center justify-between">
            <Breadcrumbs isSticky={isSticky} />
            <div className="flex items-center gap-1">
              <div 
                className={`transition-all duration-200 will-change-transform ${
                  showSearchInSticky 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 translate-x-2 pointer-events-none'
                }`}
              >
                <button
                  type="button"
                  onClick={openSearch}
                  className="p-2 rounded-md text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-colors"
                  aria-label="Search (⌘K)"
                  title="Search (⌘K)"
                >
                  <SearchIcon className="w-5 h-5" />
                </button>
              </div>
              <div 
                className={`hidden md:block transition-all duration-200 will-change-transform ${
                  showSearchInSticky 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 translate-x-2 pointer-events-none'
                }`}
              >
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
