/**
 * Formatting utilities for numbers, prices, bytes, and other display values.
 * These utilities provide consistent formatting across the application.
 */

/**
 * Formats a number with thousand separators (e.g., 1,234,567)
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num)
}

/**
 * Formats a price in USD currency format (e.g., $50,000)
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

/**
 * Formats Bitcoin difficulty with appropriate units (T for trillions)
 */
export function formatDifficulty(diff: number): string {
  if (diff >= 1e12) {
    return `${(diff / 1e12).toFixed(2)}T`
  }
  return formatNumber(Math.round(diff))
}

/**
 * Formats bytes with appropriate units (B, KB, MB)
 */
export function formatBytes(bytes: number): string {
  if (bytes >= 1e6) {
    return `${(bytes / 1e6).toFixed(1)} MB`
  }
  if (bytes >= 1e3) {
    return `${(bytes / 1e3).toFixed(0)} KB`
  }
  return `${bytes} B`
}
