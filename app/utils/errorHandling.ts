/**
 * Error handling utilities
 *
 * Note: console.error and console.warn statements are automatically removed
 * in production builds via next.config.js (removeConsole: true in production).
 *
 * These console statements are useful for development and debugging, and
 * are safe to keep as they won't appear in production builds.
 */

/**
 * Logs an error with optional context
 * In production, this will be stripped by Next.js compiler
 */
export function logError(error: unknown, context?: string): void {
  if (process.env.NODE_ENV === 'development') {
    if (context) {
      console.error(`[${context}]`, error)
    } else {
      console.error(error)
    }
  }
}

/**
 * Logs a warning with optional context
 * In production, this will be stripped by Next.js compiler
 */
export function logWarning(message: string, context?: string): void {
  if (process.env.NODE_ENV === 'development') {
    if (context) {
      console.warn(`[${context}]`, message)
    } else {
      console.warn(message)
    }
  }
}
