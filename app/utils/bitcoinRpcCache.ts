/**
 * Shared Bitcoin RPC helpers: whitelist, validation, and cache times.
 * Used by app/api/bitcoin-rpc/route.ts.
 */

// Whitelist of allowed read-only RPC commands
export const ALLOWED_COMMANDS = new Set([
  'getblockchaininfo',
  'getblockcount',
  'getbestblockhash',
  'getblock',
  'getblockhash',
  'getrawtransaction',
  'getmempoolinfo',
  'getnetworkinfo',
  'getdifficulty',
  'getchaintips',
  'getblockheader',
  'getmininginfo',
  'getnettotals',
  'getpeerinfo',
  'estimatesmartfee',
  'getmempoolentry',
  'getrawmempool',
  'gettxoutsetinfo',
  'uptime',
])

// Commands that require parameters
export const REQUIRED_PARAMS: Record<string, { count: number; description: string }> = {
  getblock: { count: 1, description: 'Usage: getblock <blockhash> [verbosity]' },
  getblockhash: { count: 1, description: 'Usage: getblockhash <height>' },
  getblockheader: { count: 1, description: 'Usage: getblockheader <blockhash> [verbose]' },
  getrawtransaction: { count: 1, description: 'Usage: getrawtransaction <txid> [verbose]' },
  getmempoolentry: { count: 1, description: 'Usage: getmempoolentry <txid>' },
  estimatesmartfee: { count: 1, description: 'Usage: estimatesmartfee <conf_target>' },
}

export type ValidateRpcOk = { ok: true }
export type ValidateRpcError = { error: { code: number; message: string } }

/**
 * Validate RPC request body: method whitelist and required params.
 * Returns { ok: true } or { error: { code, message } }.
 */
export function validateRpcRequest(body: {
  method: string
  params?: (string | number | boolean)[]
}): ValidateRpcOk | ValidateRpcError {
  const { method, params = [] } = body

  if (!ALLOWED_COMMANDS.has(method)) {
    return {
      error: {
        code: -32601,
        message: `Method "${method}" is not allowed. Only read-only commands are supported.`,
      },
    }
  }

  const requiredParam = REQUIRED_PARAMS[method]
  if (requiredParam && params.length < requiredParam.count) {
    return {
      error: {
        code: -1,
        message: requiredParam.description,
      },
    }
  }

  return { ok: true }
}

/**
 * Get cache time in seconds based on RPC command.
 */
export function getCacheTime(method: string): number {
  switch (method) {
    // These change frequently
    case 'getmempoolinfo':
    case 'getrawmempool':
    case 'getmempoolentry':
      return 10
    // These change every ~10 minutes (new block)
    case 'getblockchaininfo':
    case 'getblockcount':
    case 'getbestblockhash':
    case 'getdifficulty':
    case 'getmininginfo':
      return 30
    // Network info changes less frequently
    case 'getnetworkinfo':
    case 'getnettotals':
    case 'getpeerinfo':
      return 60
    // Block data is immutable once confirmed
    case 'getblock':
    case 'getblockhash':
    case 'getblockheader':
    case 'getrawtransaction':
      return 3600 // 1 hour
    // UTXO set info is expensive and changes slowly
    case 'gettxoutsetinfo':
      return 300
    default:
      return 30
  }
}
