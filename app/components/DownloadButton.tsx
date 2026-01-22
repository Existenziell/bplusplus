'use client'

import { useDocNavigation } from '@/app/hooks/useDocNavigation'

export default function DownloadButton() {
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
      className="inline-flex items-center gap-1 px-2 py-1 text-xs text-zinc-500 dark:text-zinc-500 hover:text-btc dark:hover:text-btc transition-colors"
      title="Download markdown file"
    >
      <svg
        className="w-3 h-3"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
        />
      </svg>
      <span>Download .md</span>
    </button>
  )
}
