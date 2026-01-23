import type { SVGProps } from 'react'

interface IconProps extends SVGProps<SVGSVGElement> {
  className?: string
}

/**
 * Merge default className with passed className, ensuring both are applied.
 * Tailwind classes will properly override when needed (e.g., w-6 overrides w-4).
 */
function mergeClassName(defaultClass: string, passedClass?: string): string {
  if (!passedClass) return defaultClass
  // If passed class includes size classes, use it as-is (it will override)
  // Otherwise, merge both
  return `${defaultClass} ${passedClass}`.trim()
}

/**
 * Reusable icon components to eliminate duplicate SVG code across the codebase.
 * All icons use consistent styling and can be customized via className prop.
 * Default size classes are preserved when additional classes are passed.
 */

export function ArrowRight({ className, ...props }: IconProps) {
  return (
    <svg
      className={mergeClassName('w-4 h-4', className)}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  )
}

export function ArrowLeft({ className, ...props }: IconProps) {
  return (
    <svg
      className={mergeClassName('w-4 h-4', className)}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  )
}

export function ChevronDown({ className, ...props }: IconProps) {
  return (
    <svg
      className={mergeClassName('w-4 h-4', className)}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  )
}

/** Four horizontal lines (list / menu). Use for “expand navigation” when sidebar is collapsed. */
export function PanelExpandIcon({ className, ...props }: IconProps) {
  return (
    <svg
      className={mergeClassName('w-4 h-4', className)}
      viewBox="3 6 18 12"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 6H21M3 10H21M3 14H21M3 18H21" />
    </svg>
  )
}

/** Four short lines on the left + left-pointing arrow (collapse / indent left). Use for “collapse sidebar”. */
export function PanelCollapseIcon({ className, ...props }: IconProps) {
  return (
    <svg
      className={mergeClassName('w-4 h-4', className)}
      viewBox="3 5 18 14"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Four short horizontal lines on the left */}
      <path d="M4 6h5M4 10h5M4 14h5M4 18h5" />
      {/* Left-pointing arrow on the right: shaft + arrowhead pointing at the lines */}
      <path d="M12 12h8" />
      <path d="M15 9l-3 3 3 3" />
    </svg>
  )
}

export function DownloadMarkdownIcon({ className, ...props }: IconProps) {
  return (
    <svg
      className={mergeClassName('w-4 h-4', className)}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
      />
    </svg>
  )
}

export function DownloadPDFIcon({ className, ...props }: IconProps) {
  return (
    <svg
      className={mergeClassName('w-5 h-5', className)}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  )
}

export function HomeIcon({ className, ...props }: IconProps) {
  return (
    <svg
      className={mergeClassName('w-4 h-4', className)}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
      />
    </svg>
  )
}

export function UpArrow({ className, ...props }: IconProps) {
  return (
    <svg
      className={mergeClassName('w-4 h-4', className)}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
    </svg>
  )
}

export function TerminalIcon({ className, ...props }: IconProps) {
  return (
    <svg
      className={mergeClassName('w-5 h-5', className)}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  )
}

export function StackLabIcon({ className, ...props }: IconProps) {
  return (
    <svg
      className={mergeClassName('w-4 h-4', className)}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 32 32"
      {...props}
    >
      <path
        d="M31.276,18.553L30,16h0.382c0.743,0,1.227-0.782,0.894-1.447l-7-14
	C24.107,0.214,23.761,0,23.382,0H8.618C8.239,0,7.893,0.214,7.724,0.553l-7,14C0.391,15.218,0.875,16,1.618,16H2l-1.276,2.553
	C0.391,19.218,0.875,20,1.618,20H2l-1.276,2.553C0.391,23.218,0.875,24,1.618,24H2l-1.276,2.553C0.391,27.218,0.875,28,1.618,28H2
	l-1.276,2.553C0.391,31.218,0.875,32,1.618,32h28.764c0.743,0,1.227-0.782,0.894-1.447L30,28h0.382c0.743,0,1.227-0.782,0.894-1.447
	L30,24h0.382c0.743,0,1.227-0.782,0.894-1.447L30,20h0.382C31.125,20,31.609,19.218,31.276,18.553z M3.236,30l1.5-3h22.528l1.5,3
	H3.236z M3.236,26l1.5-3h22.528l1.5,3H3.236z M3.236,22l1.5-3h22.528l1.5,3H3.236z M3.236,18l1.5-3h22.528l1.5,3H3.236z M3.236,14
	l6-12h13.528l6,12H3.236z M19.868,6H12l0.5-1h6.868L19.868,6z M20.868,8H11l0.5-1h8.868L20.868,8z M21.368,9l0.5,1H10l0.5-1H21.368z"
        fill="currentColor"
      />
    </svg>
  )
}

export function ExternalLinkIcon({ className, ...props }: IconProps) {
  return (
    <svg
      className={mergeClassName('w-3 h-3', className)}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
      />
    </svg>
  )
}

export function CopyIcon({ className, ...props }: IconProps) {
  return (
    <svg
      className={mergeClassName('w-4 h-4', className)}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
      />
    </svg>
  )
}

export function XIcon({ className, ...props }: IconProps) {
  return (
    <svg
      className={mergeClassName('w-4 h-4', className)}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  )
}

export function InfoIcon({ className, ...props }: IconProps) {
  return (
    <svg
      className={mergeClassName('w-4 h-4', className)}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  )
}