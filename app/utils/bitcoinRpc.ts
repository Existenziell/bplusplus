/**
 * Call the /api/bitcoin-rpc endpoint. Returns the parsed JSON (e.g. { result?, error? }).
 */
export async function bitcoinRpc(
  method: string,
  params: unknown[] = []
): Promise<{ result?: unknown; error?: { code?: number; message?: string } }> {
  const res = await fetch('/api/bitcoin-rpc', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ method, params }),
  })
  return res.json()
}
