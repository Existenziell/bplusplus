import { NextResponse } from 'next/server'

// Cache the price for 5 minutes (300 seconds)
export const revalidate = 300

export async function GET() {
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd',
      {
        next: { revalidate: 300 }, // Cache for 5 minutes
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch price')
    }

    const data = await response.json()
    const price = data.bitcoin?.usd ?? null

    return NextResponse.json({ price, timestamp: Date.now() })
  } catch (error) {
    console.error('Failed to fetch BTC price:', error)
    return NextResponse.json({ price: null, error: 'Failed to fetch price' }, { status: 500 })
  }
}
