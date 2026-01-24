'use client'

import { useDocNavigation } from '@/app/hooks/useDocNavigation'
import { DownloadMarkdownIcon } from '@/app/components/Icons'

export default function DownloadMarkdownButton() {
  const { pathname, isDownloadable } = useDocNavigation()

  // Don't show button if current page doesn't have downloadable content
  if (!isDownloadable) {
    return null
  }

  const handleDownload = () => {
    const downloadUrl = `/api/download-md?path=${encodeURIComponent(pathname)}`
    window.location.href = downloadUrl
  }

  return (
    <button
      onClick={handleDownload}
      className="inline-flex items-center gap-1 px-2 py-1 text-xs text-gray-500 dark:text-gray-500 hover:text-btc dark:hover:text-btc transition-colors"
      title="Download markdown file"
      aria-label="Download markdown file"
    >
      <DownloadMarkdownIcon aria-hidden />
      <span>Download .md</span>
    </button>
  )
}
