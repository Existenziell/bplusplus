/** Remove ```mermaid ... ``` blocks from markdown (e.g. for plain-text download). */
const MERMAID_BLOCK_RE = /```mermaid\n[\s\S]*?```/g
export function stripMermaidBlocks(markdown: string): string {
  return markdown.replace(MERMAID_BLOCK_RE, '\n\n')
}
