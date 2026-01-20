import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

// Map of paths to their MD file locations
const pathToMdFile: Record<string, string> = {
  // Fundamentals
  '/docs/fundamentals/overview': 'app/docs/fundamentals/overview/overview.md',
  '/docs/fundamentals/problems': 'app/docs/fundamentals/problems/problems.md',
  '/docs/fundamentals/trilemma': 'app/docs/fundamentals/trilemma/trilemma.md',
  '/docs/fundamentals/decentralization': 'app/docs/fundamentals/decentralization/decentralization.md',
  '/docs/fundamentals/trust-model': 'app/docs/fundamentals/trust-model/trust-model.md',
  '/docs/fundamentals/monetary-properties': 'app/docs/fundamentals/monetary-properties/monetary-properties.md',
  '/docs/fundamentals/consensus': 'app/docs/fundamentals/consensus/consensus.md',
  '/docs/fundamentals/cryptography': 'app/docs/fundamentals/cryptography/cryptography.md',

  // History
  '/docs/history/overview': 'app/docs/history/overview/overview.md',
  '/docs/history/halvings': 'app/docs/history/halvings.md',
  '/docs/history/milestones': 'app/docs/history/milestones.md',
  '/docs/history/forks': 'app/docs/history/forks.md',
  '/docs/history/supply': 'app/docs/history/supply.md',
  '/docs/history/bips': 'app/docs/history/bips.md',

  // Bitcoin
  '/docs/bitcoin/script': 'app/docs/bitcoin/script/execution.md',
  '/docs/bitcoin/op-codes': 'app/docs/bitcoin/op-codes/codes.md',
  '/docs/bitcoin/rpc': 'app/docs/bitcoin/rpc/guide.md',
  '/docs/bitcoin/blocks': 'app/docs/bitcoin/blocks/propagation.md',
  '/docs/bitcoin/subsidy': 'app/docs/bitcoin/subsidy/equation.md',

  // Mining
  '/docs/mining/overview': 'app/docs/mining/overview.md',
  '/docs/mining/proof-of-work': 'app/docs/mining/proof-of-work.md',
  '/docs/mining/difficulty': 'app/docs/mining/difficulty.md',
  '/docs/mining/economics': 'app/docs/mining/economics.md',
  '/docs/mining/mempool': 'app/docs/mining/mempool/mempool.md',
  '/docs/mining/block-construction': 'app/docs/mining/block-construction/block-construction.md',
  '/docs/mining/pools': 'app/docs/mining/pools/pools.md',
  '/docs/mining/hardware': 'app/docs/mining/hardware/hardware.md',
  '/docs/mining/attacks': 'app/docs/mining/attacks/attacks.md',

  // Wallets
  '/docs/wallets/overview': 'app/docs/wallets/overview/overview.md',
  '/docs/wallets/coin-selection': 'app/docs/wallets/coin-selection/algorithms.md',
  '/docs/wallets/multisig': 'app/docs/wallets/multisig/concepts.md',
  '/docs/wallets/transactions': 'app/docs/wallets/transactions/creation.md',

  // Lightning
  '/docs/lightning/basics': 'app/docs/lightning/basics/getting-started.md',
  '/docs/lightning/routing': 'app/docs/lightning/routing/fees.md',
  '/docs/lightning/channels': 'app/docs/lightning/channels/concepts.md',
  '/docs/lightning/onion': 'app/docs/lightning/onion/routing.md',

  // Development
  '/docs/development/getting-started': 'app/docs/development/getting-started/getting-started.md',
  '/docs/development/monitoring': 'app/docs/development/monitoring/blockchain.md',
  '/docs/development/mining': 'app/docs/development/mining/pool-mining.md',
  '/docs/development/tools': 'app/docs/development/tools/price-tracking.md',

  // Controversies
  '/docs/controversies/op-return': 'app/docs/controversies/op-return/debate.md',
  '/docs/controversies/blocksize-wars': 'app/docs/controversies/blocksize-wars/blocksize-wars.md',
  '/docs/controversies/energy-consumption': 'app/docs/controversies/energy-consumption/energy-consumption.md',
  '/docs/controversies/mt-gox': 'app/docs/controversies/mt-gox/mt-gox.md',
  '/docs/controversies/craig-wright': 'app/docs/controversies/craig-wright/craig-wright.md',

  // Glossary
  '/docs/glossary': 'app/docs/glossary/terms.md',
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const path = searchParams.get('path')

  if (!path) {
    return NextResponse.json({ error: 'Path parameter is required' }, { status: 400 })
  }

  const mdFilePath = pathToMdFile[path]

  if (!mdFilePath) {
    return NextResponse.json({ error: 'MD file not found for this path' }, { status: 404 })
  }

  const fullPath = join(process.cwd(), mdFilePath)

  if (!existsSync(fullPath)) {
    return NextResponse.json({ error: 'File not found' }, { status: 404 })
  }

  try {
    const content = await readFile(fullPath, 'utf-8')

    // Extract filename from the path
    const filename = mdFilePath.split('/').pop() || 'document.md'

    return new NextResponse(content, {
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    })
  } catch {
    return NextResponse.json({ error: 'Failed to read file' }, { status: 500 })
  }
}
