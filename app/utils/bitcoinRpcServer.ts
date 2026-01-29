/**
 * Server-side Bitcoin RPC caller. Calls PublicNode directly.
 * Use in API routes and server code only.
 */

const RPC_URL = 'https://bitcoin-rpc.publicnode.com'

interface RpcResponse {
  result?: unknown
  error?: { code: number; message: string }
  id: string
}

/**
 * Call PublicNode Bitcoin RPC. Returns result or throws on error.
 */
export async function bitcoinRpcServer(
  method: string,
  params: (string | number | boolean)[] = []
): Promise<unknown> {
  const response = await fetch(RPC_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '1.0',
      id: 'bitcoindev',
      method,
      params,
    }),
  })

  if (!response.ok) {
    throw new Error(`RPC request failed: ${response.status}`)
  }

  const data: RpcResponse = await response.json()
  if (data.error) {
    throw new Error(data.error.message ?? 'RPC error')
  }
  return data.result
}
