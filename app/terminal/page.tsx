'use client'

import { useState, useRef, useEffect, KeyboardEvent, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'

// Available commands with descriptions
const COMMANDS: Record<string, string> = {
  getblockchaininfo: 'Returns info about the current state of the blockchain',
  getblockcount: 'Returns the height of the most-work fully-validated chain',
  getbestblockhash: 'Returns the hash of the best (tip) block',
  getblock: 'Returns block data. Usage: getblock <blockhash> [verbosity]',
  getblockhash: 'Returns hash of block at given height. Usage: getblockhash <height>',
  getblockheader: 'Returns block header. Usage: getblockheader <blockhash> [verbose]',
  getrawtransaction: 'Returns raw transaction. Usage: getrawtransaction <txid> [verbose]',
  getmempoolinfo: 'Returns details on the active state of the mempool',
  getrawmempool: 'Returns all transaction ids in the mempool',
  getmempoolentry: 'Returns mempool data for given tx. Usage: getmempoolentry <txid>',
  getnetworkinfo: 'Returns info about the P2P networking',
  getpeerinfo: 'Returns data about each connected network peer',
  getnettotals: 'Returns info about network traffic',
  getdifficulty: 'Returns the proof-of-work difficulty',
  getchaintips: 'Returns info about all known chain tips',
  getmininginfo: 'Returns mining-related information',
  estimatesmartfee: 'Estimates fee rate. Usage: estimatesmartfee <conf_target>',
  uptime: 'Returns the total uptime of the server',
  help: 'Shows available commands',
  clear: 'Clears the terminal',
}

interface OutputLine {
  type: 'command' | 'result' | 'error' | 'info' | 'logo' | 'log'
  content: string
  timestamp: Date
}

// Startup logs sequence
const STARTUP_LOGS = [
  'Bitcoin Core version v28.0 (release build)',
  'Using the \'arm_shani(1way,2way)\' SHA256 implementation',
  'Default data directory /home/bitcoin/.bitcoin',
  'Using data directory /home/bitcoin/.bitcoin',
  'Config file: /home/bitcoin/.bitcoin/bitcoin.conf',
  'Using at most 125 automatic connections (1048576 file descriptors available)',
  'scheduler thread start',
  'Binding RPC on address 127.0.0.1 port 8332',
  'Starting HTTP server with 4 worker threads',
  'Using /16 prefix for IP bucketing',
  'init message: Loading P2P addresses…',
  'Loaded 65132 addresses from peers.dat  42ms',
  'init message: Loading banlist…',
  'SetNetworkActive: true',
  'Cache configuration:',
  '* Using 2.0 MiB for block index database',
  '* Using 8.0 MiB for chain state database',
  '* Using 440.0 MiB for in-memory UTXO set',
  'Script verification uses 10 additional threads',
  'init message: Loading block index…',
  'Assuming ancestors of block 00000000000000000002a7c4c1e48d76c5a37902165a270156b7a8d72728a054 have valid signatures.',
  'Opening LevelDB in /home/bitcoin/.bitcoin/blocks/index',
  'Opened LevelDB successfully',
  'init message: Verifying blocks…',
  'Loaded best chain: hashBestChain=00000000000000000001a5f1b5c6c5e7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3 height=933104 date=2026-01-20T15:43:09Z progress=1.000000',
  'Block index and chainstate loaded',
  '',
  'Bitcoin CLI Terminal ready - Connected to Public Node (mainnet)',
  'Type \'help\' for available commands.',
]

export default function TerminalPage() {
  const router = useRouter()
  const [input, setInput] = useState('')
  const [output, setOutput] = useState<OutputLine[]>([])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)

  // Welcome message on mount with animated startup
  useEffect(() => {
    const bitcoinLogo = `
     ⣿⡇⠀⢸⣿⡇⠀⠀⠀⠀
  ⠿⣿⣿⣿⡿⠿⠿⣿⣿⣿⣶⣄⠀
  ⠀⠀⢸⣿⣿⡇⠀⠀⠀⠈⣿⣿⣿⠀
  ⠀⠀⢸⣿⣿⡇⠀⠀⢀⣠⣿⣿⠟⠀
  ⠀⠀⢸⣿⣿⡿⠿⠿⠿⣿⣿⣥⣄⠀
  ⠀⠀⢸⣿⣿⡇⠀⠀⠀⠀⢻⣿⣿⣧
  ⠀⠀⢸⣿⣿⡇⠀⠀⠀⠀⣼⣿⣿⣿
  ⣶⣿⣿⣿⣷⣶⣶⣾⣿⣿⠿⠛⠁
  ⠀⠀⠀⣿⡇⠀⢸⣿⡇
    `

    // Start with logo
    setOutput([
      {
        type: 'logo',
        content: bitcoinLogo,
        timestamp: new Date(),
      },
    ])

    // Animate startup logs
    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex < STARTUP_LOGS.length) {
        const log = STARTUP_LOGS[currentIndex]
        setOutput(prev => [
          ...prev,
          {
            type: 'log',
            content: log,
            timestamp: new Date(),
          },
        ])
        currentIndex++
      } else {
        clearInterval(interval)
      }
    }, 50)

    return () => clearInterval(interval)
  }, [])

  // Auto-scroll to bottom
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [output])

  // Focus input on click anywhere in terminal (but not when selecting text)
  const handleOutputClick = () => {
    // Only focus if no text is selected (allows copy/paste)
    const selection = window.getSelection()
    if (!selection || selection.toString().length === 0) {
      inputRef.current?.focus()
    }
  }

  // Parse command and arguments
  const parseCommand = (cmd: string): { method: string; params: (string | number | boolean)[] } => {
    const parts = cmd.trim().split(/\s+/)
    const method = parts[0].toLowerCase()
    const params = parts.slice(1).map(p => {
      // Try to parse as number
      const num = Number(p)
      if (!isNaN(num)) return num
      // Check for boolean
      if (p.toLowerCase() === 'true') return true
      if (p.toLowerCase() === 'false') return false
      // Return as string
      return p
    })
    return { method, params }
  }

  // Execute command
  const executeCommand = async (cmd: string) => {
    const trimmedCmd = cmd.trim()
    if (!trimmedCmd) return

    // Add command to output
    setOutput(prev => [
      ...prev,
      { type: 'command', content: `$ bitcoin-cli ${trimmedCmd}`, timestamp: new Date() },
    ])

    // Add to history
    setCommandHistory(prev => [...prev, trimmedCmd])
    setHistoryIndex(-1)

    const { method, params } = parseCommand(trimmedCmd)

    // Handle local commands
    if (method === 'clear') {
      setOutput([])
      return
    }

    if (method === 'help') {
      const helpText = Object.entries(COMMANDS)
        .map(([cmd, desc]) => `  ${cmd.padEnd(20)} ${desc}`)
        .join('\n')
      setOutput(prev => [
        ...prev,
        { type: 'info', content: `Available commands:\n${helpText}`, timestamp: new Date() },
      ])
      return
    }

    // Check if command is supported
    if (!COMMANDS[method]) {
      setOutput(prev => [
        ...prev,
        {
          type: 'error',
          content: `error: unknown command "${method}". Type 'help' for available commands.`,
          timestamp: new Date(),
        },
      ])
      return
    }

    // Make API call
    setIsLoading(true)
    try {
      const response = await fetch('/api/bitcoin-rpc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ method, params }),
      })

      const data = await response.json()

      if (data.error) {
        setOutput(prev => [
          ...prev,
          {
            type: 'error',
            content: `error code: ${data.error.code}\nerror message:\n${data.error.message}`,
            timestamp: new Date(),
          },
        ])
      } else {
        const resultStr = typeof data.result === 'object'
          ? JSON.stringify(data.result, null, 2)
          : String(data.result)
        setOutput(prev => [
          ...prev,
          { type: 'result', content: resultStr, timestamp: new Date() },
        ])
      }
    } catch (error) {
      setOutput(prev => [
        ...prev,
        {
          type: 'error',
          content: `Network error: ${error instanceof Error ? error.message : 'Failed to connect'}`,
          timestamp: new Date(),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!isLoading && input.trim()) {
      executeCommand(input)
      setInput('')
    }
  }

  // Handle key events
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || '')
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || '')
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setInput('')
      }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault()
      setOutput([])
    }
  }

  return (
    <main className="min-h-screen page-bg">
      <Header />

      {/* Content Container */}
      <div className="container mx-auto px-4 md:px-8 py-4 md:py-8">
        {/* Terminal Window */}
        <div className="rounded-lg overflow-hidden border border-zinc-700 shadow-xl flex flex-col h-[450px] md:h-[700px]">
          {/* Terminal Header */}
          <div className="bg-zinc-800 border-b border-zinc-700 px-3 md:px-4 py-2 flex items-center gap-2 flex-shrink-0">
            <div className="flex gap-1.5">
              <button
                onClick={() => router.back()}
                className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors"
                title="Close terminal"
              />
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500/80" />
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="text-zinc-400 text-xs md:text-sm font-mono ml-2">bitcoin-cli — mainnet</span>
          </div>

          {/* Terminal Output */}
          <div
            ref={outputRef}
            onClick={handleOutputClick}
            className="bg-zinc-950 p-2 md:p-4 overflow-y-auto font-mono text-xs md:text-sm cursor-text flex-1"
          >
            {output.map((line, i) => (
            <div key={i} className={line.type === 'log' ? 'mb-0.5' : 'mb-1 md:mb-2'}>
              {line.type === 'logo' && (
                <pre className="text-btc whitespace-pre text-[10px] md:text-sm">{line.content}</pre>
              )}
              {line.type === 'log' && (
                <div className="text-zinc-500 text-[10px] md:text-xs">{line.content}</div>
              )}
              {line.type === 'command' && (
                <div className="text-btc">{line.content}</div>
              )}
              {line.type === 'result' && (
                <pre className="text-emerald-400 whitespace-pre-wrap break-all">{line.content}</pre>
              )}
              {line.type === 'error' && (
                <pre className="text-red-400 whitespace-pre-wrap">{line.content}</pre>
              )}
              {line.type === 'info' && (
                <pre className="text-zinc-400 whitespace-pre-wrap">{line.content}</pre>
              )}
            </div>
            ))}

            {isLoading && (
              <div className="text-zinc-500 animate-pulse">Loading...</div>
            )}
          </div>

          {/* Input Line */}
          <form onSubmit={handleSubmit} className="bg-zinc-900 border-t border-zinc-800 p-2 md:p-4 flex items-center gap-1 md:gap-2 flex-shrink-0">
            <span className="text-btc font-mono text-xs md:text-sm">$</span>
            <span className="text-zinc-500 font-mono text-xs md:text-sm hidden sm:inline">bitcoin-cli</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              className="flex-1 bg-transparent text-zinc-100 font-mono text-xs md:text-sm outline-none placeholder-zinc-600 min-w-0"
              placeholder={isLoading ? 'executing...' : 'enter command...'}
              autoFocus
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="none"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-2 md:px-3 py-1 bg-btc text-zinc-900 font-mono text-xs md:text-sm rounded hover:bg-btc/80 disabled:opacity-50"
            >
              Run
            </button>
          </form>
        </div>

        {/* Back link */}
        <button
          onClick={() => router.back()}
          className="mt-4 inline-flex items-center gap-2 text-zinc-500 hover:text-btc transition-colors text-sm"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          back
        </button>
      </div>

      <Footer />
    </main>
  )
}
