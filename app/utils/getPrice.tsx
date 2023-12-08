export async function getPrice() {
  const options = {
    headers: { 'X-CoinAPI-Key': 'BC53A1E2-7E42-4CB2-871E-BBA59F7DDE5A' },
  }

  const res = await fetch(
    'https://rest.coinapi.io/v1/exchangerate/BTC/USD',
    options
  )

  if (!res.ok) {
    console.error('Failed to fetch data')
    return
  }
  const price = await res.json()
  return price.rate
}
