/**
 * Terminal command parsing, help, and autocomplete for Bitcoin CLI.
 */

export const COMMANDS: Record<string, string> = {
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

export function parseCommand(cmd: string): { method: string; params: (string | number | boolean)[] } {
  const parts = cmd.trim().split(/\s+/)
  const method = parts[0].toLowerCase()
  const params = parts.slice(1).map(p => {
    const num = Number(p)
    if (!isNaN(num)) return num
    if (p.toLowerCase() === 'true') return true
    if (p.toLowerCase() === 'false') return false
    return p
  })
  return { method, params }
}

export function findMatchingCommands(inputText: string, commands: Record<string, string>): string[] {
  const trimmed = inputText.trim().toLowerCase()
  if (!trimmed) return Object.keys(commands)
  const commandPrefix = trimmed.split(/\s+/)[0]
  return Object.keys(commands).filter(cmd => cmd.toLowerCase().startsWith(commandPrefix))
}

export function commandRequiresParams(method: string, commands: Record<string, string>): boolean {
  const desc = commands[method]
  return desc ? desc.includes('Usage:') : false
}

export function getParameterFormat(paramName: string): { format: string; description: string } {
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

export interface ParameterDetail {
  name: string
  isOptional: boolean
  format: string
  description: string
}

export function getParameterDetails(usage: string): ParameterDetail[] {
  const parameters: ParameterDetail[] = []
  const requiredRegex = /<(\w+)>/g
  let requiredMatch: RegExpExecArray | null
  while ((requiredMatch = requiredRegex.exec(usage)) !== null) {
    const paramName = requiredMatch[1]
    const { format, description } = getParameterFormat(paramName)
    parameters.push({ name: paramName, isOptional: false, format, description })
  }
  const optionalRegex = /\[(\w+)\]/g
  let optionalMatch: RegExpExecArray | null
  while ((optionalMatch = optionalRegex.exec(usage)) !== null) {
    const paramName = optionalMatch[1]
    const { format, description } = getParameterFormat(paramName)
    parameters.push({ name: paramName, isOptional: true, format, description })
  }
  return parameters
}

export function getUsageInfo(method: string, commands: Record<string, string>): string | null {
  const desc = commands[method]
  if (!desc) return null
  const usageMatch = desc.match(/Usage:\s*(.+)/)
  if (!usageMatch) return null
  let usage = usageMatch[1]
  if (usage.toLowerCase().startsWith(method.toLowerCase())) {
    usage = usage.substring(method.length).trim()
  }
  return usage
}

const GENESIS_BLOCK = '000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f'
const FIRST_BTC_TX = 'f4184fc596403b9d638783cf57adfe4c75c605f6356fbc91338530e9831e9e16'

export function generateExample(
  _method: string,
  usage: string,
  opts?: { exampleBlockHash?: string; exampleTxId?: string }
): string {
  let example = usage
  if (example.includes('<blockhash>')) {
    example = example.replace('<blockhash>', opts?.exampleBlockHash || GENESIS_BLOCK)
  }
  if (example.includes('<height>')) {
    example = example.replace('<height>', '800000')
  }
  if (example.includes('<txid>')) {
    example = example.replace('<txid>', opts?.exampleTxId || FIRST_BTC_TX)
  }
  if (example.includes('<conf_target>')) {
    example = example.replace('<conf_target>', '6')
  }
  example = example.replace(/\s*\[verbose\]/g, '')
  example = example.replace(/\s*\[verbosity\]/g, '')
  return example
}
