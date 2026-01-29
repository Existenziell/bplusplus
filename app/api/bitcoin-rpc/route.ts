import { NextRequest, NextResponse } from 'next/server'
import { getCacheTime, validateRpcRequest, ALLOWED_COMMANDS } from '@/app/utils/bitcoinRpcCache'

// Commands not supported by PublicNode (we simulate them)
const SIMULATED_COMMANDS: Record<string, () => unknown> = {
  uptime: () => {
    // Simulate uptime (random value between 1-30 days in seconds)
    const days = Math.floor(Math.random() * 30) + 1
    return days * 24 * 60 * 60
  },
}

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
    let body: RpcRequest
    try {
      const raw = await request.text()
      if (!raw?.trim()) {
        return NextResponse.json(
          { error: { code: -32700, message: 'Empty request body' } },
          { status: 400 }
        )
      }
      body = JSON.parse(raw) as RpcRequest
    } catch (parseError) {
      const message =
        parseError instanceof SyntaxError
          ? 'Invalid JSON in request body'
          : 'Invalid or empty request body'
      return NextResponse.json(
        { error: { code: -32700, message } },
        { status: 400 }
      )
    }

    const { method, params = [] } = body

    const validation = validateRpcRequest({ method, params })
    if (!('ok' in validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 })
    }

    // Handle simulated commands (not supported by PublicNode)
    if (SIMULATED_COMMANDS[method]) {
      return NextResponse.json({ result: SIMULATED_COMMANDS[method]() })
    }

    // Make RPC call to PublicNode
    const rpcPayload = {
      jsonrpc: '1.0',
      id: 'bitcoindev',
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
      // Try to parse error response from the RPC server
      let errorMessage = `RPC request failed with status ${response.status}`
      try {
        const errorData = await response.json()
        if (errorData.error?.message) {
          errorMessage = errorData.error.message
        }
      } catch {
        // If we can't parse JSON, check for common status codes
        if (response.status === 500) {
          errorMessage = `Method "${method}" failed. The public node may not support this method or the parameters are invalid.`
        } else if (response.status === 503) {
          errorMessage = `Service unavailable. The public node may be overloaded or the method "${method}" is not supported.`
        }
      }
      return NextResponse.json(
        {
          error: {
            code: -32603,
            message: errorMessage,
          },
        },
        { status: response.status }
      )
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

// Also support GET for health check
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    allowedCommands: Array.from(ALLOWED_COMMANDS).sort(),
  })
}
