/**
 * Centralized error handling utilities.
 * Provides consistent error handling and user-friendly error messages.
 */

export class AppError extends Error {
  constructor(
    message: string,
    public readonly code?: string,
    public readonly userMessage?: string
  ) {
    super(message)
    this.name = 'AppError'
  }
}

/**
 * Handle errors consistently across the application.
 * In development, logs full error details. In production, shows user-friendly messages.
 */
export function handleError(error: unknown, context?: string): void {
  if (process.env.NODE_ENV === 'development') {
    if (context) {
      console.error(`[${context}]`, error)
    } else {
      console.error(error)
    }
  }

  // In production, Next.js removes console statements, so we rely on
  // proper error boundaries and user-facing notifications
  // This function can be extended to send errors to error tracking services
}

/**
 * Get a user-friendly error message from an error.
 */
export function getUserFriendlyErrorMessage(error: unknown): string {
  if (error instanceof AppError && error.userMessage) {
    return error.userMessage
  }
  if (error instanceof Error) {
    return error.message
  }
  return 'An unexpected error occurred'
}
