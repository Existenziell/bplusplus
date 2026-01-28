/**
 * Build identifier used to version static JSON fetches.
 *
 * This lets us set long-lived Cache-Control headers for `/data/*` while ensuring
 * clients fetch fresh content after each deploy (new cache key per build).
 */
export const BUILD_ID = process.env.NEXT_PUBLIC_BUILD_ID ?? ''

export function withBuildId(url: string): string {
  if (!BUILD_ID) return url
  const joiner = url.includes('?') ? '&' : '?'
  return `${url}${joiner}v=${encodeURIComponent(BUILD_ID)}`
}

