import { NextRequest, NextResponse } from 'next/server'

// Whitelist of allowed read-only RPC commands
const ALLOWED_COMMANDS = new Set([
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

// PublicNode Bitcoin RPC endpoint
const RPC_URL = 'https://bitcoin-rpc.publicnode.com'

interface RpcRequest {
  method: string
  params?: (string | number | boolean)[]
}

interface RpcResponse {
  result?: unknown
  error?: {
    code: number
    message: string
  }
  id: string
}

export async function POST(request: NextRequest) {
  try {
    const body: RpcRequest = await request.json()
    const { method, params = [] } = body

    // Validate method is in whitelist
    if (!ALLOWED_COMMANDS.has(method)) {
      return NextResponse.json(
        {
          error: {
            code: -32601,
            message: `Method "${method}" is not allowed. Only read-only commands are supported.`,
          },
        },
        { status: 400 }
      )
    }

    // Make RPC call to PublicNode
    const rpcPayload = {
      jsonrpc: '1.0',
      id: 'bplusplus',
      method,
      params,
    }

    const response = await fetch(RPC_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rpcPayload),
      // Cache certain responses
      next: {
        revalidate: getCacheTime(method),
      },
    })

    if (!response.ok) {
      throw new Error(`RPC request failed with status ${response.status}`)
    }

    const data: RpcResponse = await response.json()

    if (data.error) {
      return NextResponse.json(
        { error: data.error },
        { status: 400 }
      )
    }

    return NextResponse.json({ result: data.result })
  } catch (error) {
    console.error('Bitcoin RPC error:', error)
    return NextResponse.json(
      {
        error: {
          code: -32603,
          message: error instanceof Error ? error.message : 'Internal error',
        },
      },
      { status: 500 }
    )
  }
}

// Get cache time in seconds based on command
function getCacheTime(method: string): number {
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

// Also support GET for health check
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    allowedCommands: Array.from(ALLOWED_COMMANDS).sort(),
  })
}
