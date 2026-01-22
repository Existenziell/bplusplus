'use client'

import { useState, useRef, useEffect, KeyboardEvent, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import LiveStats from '../components/LiveStats'
import { HomeIcon, CopyIcon } from '../components/Icons'
import Link from 'next/link'
import copyToClipboard from '@/app/utils/copyToClipboard'

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
  type: 'command' | 'result' | 'error' | 'info' | 'logo' | 'log' | 'usage'
  content: string
  timestamp: Date
  copyableCommand?: string // For example usage lines that can be copied
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
  const [exampleBlockHash, setExampleBlockHash] = useState<string>('')
  const [exampleTxId, setExampleTxId] = useState<string>('')
  const inputRef = useRef<HTMLInputElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)
  const lastTabPressRef = useRef<number>(0)

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

  // Fetch example values for error messages
  useEffect(() => {
    const fetchExamples = async () => {
      try {
        // Fetch best block hash for examples
        const blockHashResponse = await fetch('/api/bitcoin-rpc', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ method: 'getbestblockhash', params: [] }),
        })
        const blockHashData = await blockHashResponse.json()
        if (blockHashData.result) {
          setExampleBlockHash(blockHashData.result)
        }

        // Try to get a transaction ID from mempool for examples
        const mempoolResponse = await fetch('/api/bitcoin-rpc', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ method: 'getrawmempool', params: [] }),
        })
        const mempoolData = await mempoolResponse.json()
        if (mempoolData.result && Array.isArray(mempoolData.result) && mempoolData.result.length > 0) {
          setExampleTxId(mempoolData.result[0])
        }
      } catch (error) {
        // Silently fail - examples will just be empty
        console.error('Failed to fetch examples:', error)
      }
    }

    // Fetch examples after a short delay to not interfere with startup
    const timeout = setTimeout(fetchExamples, 2000)
    return () => clearTimeout(timeout)
  }, [])

  // Auto-scroll to bottom
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [output])

  // Keep input focused after command execution completes
  useEffect(() => {
    // Refocus when loading state changes from true to false (command finished)
    if (!isLoading && inputRef.current && document.activeElement !== inputRef.current) {
      // Use requestAnimationFrame to ensure focus happens after React's render
      requestAnimationFrame(() => {
        inputRef.current?.focus()
      })
    }
  }, [isLoading])

  // Focus input on click anywhere in terminal (but not when selecting text)
  const handleOutputClick = () => {
    // Only focus if no text is selected (allows copy/paste)
    const selection = window.getSelection()
    if (!selection || selection.toString().length === 0) {
      inputRef.current?.focus()
    }
  }

  // Find matching commands based on current input
  const findMatchingCommands = (inputText: string): string[] => {
    const trimmed = inputText.trim().toLowerCase()
    if (!trimmed) return Object.keys(COMMANDS)

    // Extract the first word (command name) from input
    const commandPrefix = trimmed.split(/\s+/)[0]

    return Object.keys(COMMANDS).filter(cmd =>
      cmd.toLowerCase().startsWith(commandPrefix)
    )
  }

  // Handle autocomplete
  const handleAutocomplete = (showAll: boolean = false) => {
    const trimmed = input.trim()
    const matches = findMatchingCommands(trimmed)

    if (matches.length === 0) {
      // No matches - show error
      setOutput(prev => [
        ...prev,
        {
          type: 'error',
          content: `No commands found matching "${trimmed}"`,
          timestamp: new Date(),
        },
      ])
      return
    }

    if (matches.length === 1) {
      // Single match - autocomplete
      const match = matches[0]
      const inputParts = trimmed.split(/\s+/)
      if (inputParts.length === 1) {
        // Only command name, no args - complete it
        setInput(match)
      } else {
        // Has args - complete just the command name
        const args = inputParts.slice(1).join(' ')
        setInput(`${match} ${args}`)
      }
    } else {
      // Multiple matches
      if (showAll) {
        // Double tab - show all matches
        const matchList = matches.map(cmd => `  ${cmd.padEnd(20)} ${COMMANDS[cmd]}`).join('\n')
        setOutput(prev => [
          ...prev,
          {
            type: 'info',
            content: `Possible completions:\n${matchList}`,
            timestamp: new Date(),
          },
        ])
      } else {
        // Single tab with multiple matches - find common prefix
        const commonPrefix = matches.reduce((prefix, cmd) => {
          let i = 0
          while (i < prefix.length && i < cmd.length && prefix[i].toLowerCase() === cmd[i].toLowerCase()) {
            i++
          }
          return prefix.substring(0, i)
        })

        if (commonPrefix.length > trimmed.split(/\s+/)[0].length) {
          // Complete to common prefix
          const inputParts = trimmed.split(/\s+/)
          const args = inputParts.slice(1).join(' ')
          setInput(args ? `${commonPrefix} ${args}` : commonPrefix)
        } else {
          // No common prefix - show matches on next tab
          const matchList = matches.map(cmd => `  ${cmd.padEnd(20)} ${COMMANDS[cmd]}`).join('\n')
          setOutput(prev => [
            ...prev,
            {
              type: 'info',
              content: `Possible completions:\n${matchList}`,
              timestamp: new Date(),
            },
          ])
        }
      }
    }
  }

  // Check if a command requires parameters
  const commandRequiresParams = (method: string): boolean => {
    const desc = COMMANDS[method]
    return desc ? desc.includes('Usage:') : false
  }

  // Parameter format mapping
  const getParameterFormat = (paramName: string): { format: string; description: string } => {
    const normalized = paramName.toLowerCase()

    if (normalized === 'blockhash') {
      return { format: 'hex string (64 characters)', description: 'The block hash' }
    }
    if (normalized === 'height') {
      return { format: 'number (integer)', description: 'The block height' }
    }
    if (normalized === 'txid') {
      return { format: 'hex string (64 characters)', description: 'The transaction ID' }
    }
    if (normalized === 'conf_target') {
      return { format: 'number (integer)', description: 'Confirmation target in blocks' }
    }
    if (normalized === 'verbose') {
      return { format: 'boolean (true/false) or number', description: 'Optional: Return verbose output' }
    }
    if (normalized === 'verbosity') {
      return { format: 'number (0, 1, or 2)', description: 'Optional: verbosity level' }
    }

    return { format: 'string', description: 'Parameter value' }
  }

  // Extract and format parameter information from usage string
  const getParameterDetails = (usage: string): Array<{ name: string; isOptional: boolean; format: string; description: string }> => {
    const parameters: Array<{ name: string; isOptional: boolean; format: string; description: string }> = []

    // Match required parameters: <param>
    const requiredRegex = /<(\w+)>/g
    let requiredMatch: RegExpExecArray | null
    while ((requiredMatch = requiredRegex.exec(usage)) !== null) {
      const paramName = requiredMatch[1]
      const { format, description } = getParameterFormat(paramName)
      parameters.push({
        name: paramName,
        isOptional: false,
        format,
        description,
      })
    }

    // Match optional parameters: [param]
    const optionalRegex = /\[(\w+)\]/g
    let optionalMatch: RegExpExecArray | null
    while ((optionalMatch = optionalRegex.exec(usage)) !== null) {
      const paramName = optionalMatch[1]
      const { format, description } = getParameterFormat(paramName)
      parameters.push({
        name: paramName,
        isOptional: true,
        format,
        description,
      })
    }

    return parameters
  }

  // Extract usage information from command description
  const getUsageInfo = (method: string): string | null => {
    const desc = COMMANDS[method]
    if (!desc) return null

    const usageMatch = desc.match(/Usage:\s*(.+)/)
    if (!usageMatch) return null

    // Remove the command name from the usage string if it's there
    let usage = usageMatch[1]
    // If usage starts with the method name, remove it
    if (usage.toLowerCase().startsWith(method.toLowerCase())) {
      usage = usage.substring(method.length).trim()
    }
    return usage
  }

  // Generate example command with actual values
  const generateExample = (method: string, usage: string): string => {
    let example = usage

    // Replace placeholders with actual examples
    if (example.includes('<blockhash>')) {
      const blockHash = exampleBlockHash || '000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f' // Genesis block as fallback
      example = example.replace('<blockhash>', blockHash)
    }

    if (example.includes('<height>')) {
      example = example.replace('<height>', '800000')
    }

    if (example.includes('<txid>')) {
      const txId = exampleTxId || 'f4184fc596403b9d638783cf57adfe4c75c605f6356fbc91338530e9831e9e16' // First Bitcoin transaction as fallback
      example = example.replace('<txid>', txId)
    }

    if (example.includes('<conf_target>')) {
      example = example.replace('<conf_target>', '6')
    }

    // Remove optional parameters if they're not in the example
    example = example.replace(/\s*\[verbose\]/g, '')
    example = example.replace(/\s*\[verbosity\]/g, '')

    return example
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
      // Check if a command name parameter was provided
      if (params.length > 0) {
        // Get the command name (support both -commandname and commandname formats)
        let commandName = String(params[0])
        if (commandName.startsWith('-')) {
          commandName = commandName.substring(1)
        }
        commandName = commandName.toLowerCase()

        // Validate command exists
        if (!COMMANDS[commandName]) {
          setOutput(prev => [
            ...prev,
            {
              type: 'error',
              content: `error: unknown command "${commandName}". Type 'help' for available commands.`,
              timestamp: new Date(),
            },
          ])
          return
        }

        // Get command description (remove usage part for cleaner display)
        const fullDesc = COMMANDS[commandName]
        const descMatch = fullDesc.match(/^(.+?)(?:\.\s*Usage:)/)
        const description = descMatch ? descMatch[1] : fullDesc.replace(/\.\s*Usage:.*$/, '')

        // Build detailed help output
        const helpLines: string[] = []
        helpLines.push(`Command: ${commandName}`)
        helpLines.push(`Description: ${description}`)
        helpLines.push('')

        // Get usage information
        const usage = getUsageInfo(commandName)
        if (usage) {
          helpLines.push(`Usage: ${commandName} ${usage}`)
          helpLines.push('')

          // Get parameter details
          const paramDetails = getParameterDetails(usage)
          if (paramDetails.length > 0) {
            helpLines.push('Parameters:')
            paramDetails.forEach(param => {
              const paramDisplay = param.isOptional ? `[${param.name}]` : `<${param.name}>`
              helpLines.push(`  ${paramDisplay.padEnd(20)} ${param.format} - ${param.description}`)
            })
            helpLines.push('')
          }

          // Get example usage
          const example = generateExample(commandName, usage)
          if (example) {
            const fullCommand = `${commandName} ${example}`
            setOutput(prev => [
              ...prev,
              { type: 'info', content: helpLines.join('\n'), timestamp: new Date() },
              {
                type: 'usage',
                content: `Example usage: ${fullCommand}`,
                timestamp: new Date(),
                copyableCommand: fullCommand,
              },
            ])
          } else {
            setOutput(prev => [
              ...prev,
              { type: 'info', content: helpLines.join('\n'), timestamp: new Date() },
            ])
          }
        } else {
          // No usage info, just show description
          setOutput(prev => [
            ...prev,
            { type: 'info', content: helpLines.join('\n'), timestamp: new Date() },
          ])
        }
      } else {
        // No parameter - show all commands
        const helpText = Object.entries(COMMANDS)
          .map(([cmd, desc]) => `  ${cmd.padEnd(20)} ${desc}`)
          .join('\n')
        setOutput(prev => [
          ...prev,
          {
            type: 'info',
            content: `Available commands:\n${helpText}\n\nUse 'help <command>' for detailed information about a specific command.`,
            timestamp: new Date()
          },
        ])
      }
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

    // Check if command requires parameters and validate
    if (commandRequiresParams(method) && params.length === 0) {
      const usage = getUsageInfo(method)
      const example = usage ? generateExample(method, usage) : null

      // Output error code and message in red
      setOutput(prev => [
        ...prev,
        {
          type: 'error',
          content: `error code: -1\nerror message:`,
          timestamp: new Date(),
        },
      ])

      // Output usage in green
      setOutput(prev => [
        ...prev,
        {
          type: 'usage',
          content: `Usage: ${method} ${usage || '<parameters>'}`,
          timestamp: new Date(),
        },
      ])

      // Output example in green if available
      if (example) {
        const fullCommand = `${method} ${example}`
        setOutput(prev => [
          ...prev,
          {
            type: 'usage',
            content: `Example usage: ${fullCommand}`,
            timestamp: new Date(),
            copyableCommand: fullCommand,
          },
        ])
      }

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
      // Refocus input after submission
      setTimeout(() => {
        inputRef.current?.focus()
      }, 0)
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
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const now = Date.now()
      const timeSinceLastTab = now - lastTabPressRef.current
      const isDoubleTab = timeSinceLastTab < 300 // 300ms window for double tab

      lastTabPressRef.current = now

      if (isDoubleTab) {
        // Double tab - show all matches
        handleAutocomplete(true)
      } else {
        // Single tab - try to autocomplete
        handleAutocomplete(false)
      }
    } else if (e.key === 'Enter') {
      // Ensure input stays focused after Enter (form submission)
      // The handleSubmit will handle the actual submission
      setTimeout(() => {
        inputRef.current?.focus()
      }, 0)
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault()
      setOutput([])
    }
  }

  return (
    <main className="min-h-screen page-bg flex flex-col">
      <Header />
      {/* Content Container */}
      <div className="container-content py-4 md:py-8 flex-grow">
        <h1 className="heading-page text-center">
          Bitcoin CLI Terminal
        </h1>
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
              {line.type === 'usage' && (
                <div className="flex items-center gap-2 group">
                  <pre className="text-emerald-400 whitespace-pre-wrap flex-1">{line.content}</pre>
                  {line.copyableCommand && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        copyToClipboard(line.copyableCommand!, 'Command')
                      }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-zinc-800 rounded"
                      title="Copy command"
                    >
                      <CopyIcon className="w-3.5 h-3.5 text-emerald-400" />
                    </button>
                  )}
                </div>
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

        {/* Back Link */}
        <div className="mt-12 text-center flex flex-row items-center justify-center gap-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-btc hover:underline transition-colors"
            >
              <HomeIcon />
              <span>Back Home</span>
            </Link>
          </div>
      </div>
     <LiveStats />
      <Footer />
    </main>
  )
}
