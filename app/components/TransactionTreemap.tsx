'use client'

import { useMemo, useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { hierarchy, treemap } from 'd3-hierarchy'
import { scaleSequential } from 'd3-scale'
import { interpolateRgb } from 'd3-interpolate'
import { ProcessedTransaction } from '@/app/utils/blockUtils'
import { formatNumber } from '@/app/utils/formatting'
import { truncateHash } from '@/app/utils/blockUtils'

// Modern poppy color palettes - one for each metric
const COLOR_PALETTES = {
  vbytes: {
    light: '#a5f3fc', // Light cyan
    bright: '#06b6d4', // Bright cyan
  },
  value: {
    light: '#fbcfe8', // Light pink/magenta
    bright: '#ec4899', // Bright pink/magenta
  },
  fee: {
    light: '#e9d5ff', // Light purple
    bright: '#a855f7', // Bright purple
  },
}

type SizeMetric = 'vbytes' | 'value' | 'fee'

interface TransactionTreemapProps {
  transactions: ProcessedTransaction[]
  width?: number
  height?: number
}

interface TreemapNode {
  x0: number
  y0: number
  x1: number
  y1: number
  data: ProcessedTransaction
}

export default function TransactionTreemap({
  transactions,
  width: propWidth,
  height = 600,
}: TransactionTreemapProps) {
  const router = useRouter()
  const [hoveredTx, setHoveredTx] = useState<ProcessedTransaction | null>(null)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })
  const [containerWidth, setContainerWidth] = useState(800)
  const [sizeMetric, setSizeMetric] = useState<SizeMetric>('vbytes')
  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  // Calculate responsive width
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth)
      }
    }

    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  const width = propWidth || containerWidth

  // Get value for selected metric
  const getMetricValue = (tx: ProcessedTransaction): number => {
    switch (sizeMetric) {
      case 'vbytes':
        return tx.vsize
      case 'value':
        return tx.value
      case 'fee':
        return tx.fee
      default:
        return tx.vsize
    }
  }

  // Get label for selected metric
  const getMetricLabel = (): string => {
    switch (sizeMetric) {
      case 'vbytes':
        return 'Transaction vBytes'
      case 'value':
        return 'Transaction BTC Amount'
      case 'fee':
        return 'Transaction Fee'
      default:
        return 'Transaction vBytes'
    }
  }

  // Get color label for selected metric
  const getColorLabel = (): string => {
    switch (sizeMetric) {
      case 'vbytes':
        return 'Transaction vBytes'
      case 'value':
        return 'Transaction BTC Amount'
      case 'fee':
        return 'Transaction Fee'
      default:
        return 'Transaction vBytes'
    }
  }

  // Calculate range for selected metric for color scaling
  const metricRange = useMemo(() => {
    if (transactions.length === 0) return [0, 1]
    const values = transactions.map(tx => getMetricValue(tx))
    const min = Math.min(...values)
    const max = Math.max(...values)
    return [min, max]
  }, [transactions, sizeMetric])

  // Monochromatic color interpolator based on selected metric
  const monochromaticInterpolator = (t: number): string => {
    const palette = COLOR_PALETTES[sizeMetric]
    // Interpolate from light to bright color for a modern monochromatic look
    return interpolateRgb(palette.light, palette.bright)(t)
  }

  // Create color scale based on selected metric using appropriate color palette
  const colorScale = useMemo(() => {
    const palette = COLOR_PALETTES[sizeMetric]
    if (metricRange[1] === metricRange[0]) {
      return () => palette.bright // Default bright color if all same
    }
    return scaleSequential(monochromaticInterpolator)
      .domain([metricRange[0], metricRange[1]])
  }, [metricRange, sizeMetric])

  // Generate treemap layout
  const treemapNodes = useMemo(() => {
    if (transactions.length === 0) return []

    // Create hierarchy data structure
    interface HierarchyData {
      value: number
      tx: ProcessedTransaction
    }

    const hierarchyData = transactions.map(tx => ({
      value: getMetricValue(tx), // Use selected metric as the value for treemap sizing
      tx,
    }))


    const root = hierarchy<HierarchyData>({
      children: hierarchyData,
    } as any)
      .sum((d: any) => (d.data?.value || d.value || 0))
      .sort((a: any, b: any) => ((b.value || 0) - (a.value || 0)))

    // Generate treemap layout
    const treemapLayout = treemap<any>()
      .size([width, height])
      .padding(1)
      .round(true)

    treemapLayout(root as any)

    // Extract nodes
    const nodes: TreemapNode[] = []
    root.each((d: any) => {
      if (d.data && d.data.tx) {
        nodes.push({
          x0: d.x0 || 0,
          y0: d.y0 || 0,
          x1: d.x1 || 0,
          y1: d.y1 || 0,
          data: d.data.tx,
        })
      }
    })

    return nodes
  }, [transactions, width, height, sizeMetric])

  // Handle mouse move for tooltip positioning
  const handleMouseMove = (event: React.MouseEvent<SVGSVGElement>) => {
    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect()
      const mouseX = event.clientX - containerRect.left
      const mouseY = event.clientY - containerRect.top
      
      // Tooltip dimensions (approximate)
      const tooltipWidth = 300
      const tooltipHeight = 180
      const offset = 15
      
      // Calculate position with overflow detection
      let x = mouseX + offset
      let y = mouseY + offset
      
      // Check right edge overflow - show tooltip to the left of cursor
      if (x + tooltipWidth > containerRect.width) {
        x = mouseX - tooltipWidth - offset
      }
      
      // Check bottom edge overflow - show tooltip above cursor
      if (y + tooltipHeight > containerRect.height) {
        y = mouseY - tooltipHeight - offset
      }
      
      // Ensure tooltip doesn't go off left edge
      if (x < 0) {
        x = offset
      }
      
      // Ensure tooltip doesn't go off top edge
      if (y < 0) {
        y = offset
      }
      
      setTooltipPosition({ x, y })
    }
  }

  if (transactions.length === 0) {
    return (
      <div className="w-full h-[600px] flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
        <p className="text-secondary">No transactions to display</p>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Size Metric Selector */}
      <div className="mb-4 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <label htmlFor="size-metric" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Size blocks by:
          </label>
          <select
            id="size-metric"
            value={sizeMetric}
            onChange={(e) => setSizeMetric(e.target.value as SizeMetric)}
            className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-btc focus:border-transparent"
          >
            <option value="vbytes">Transaction vBytes</option>
            <option value="value">Transaction BTC Amount</option>
            <option value="fee">Transaction Fee</option>
          </select>
        </div>
      </div>

      <svg
        ref={svgRef}
        width="100%"
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="bg-gray-50 dark:bg-gray-900"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredTx(null)}
        aria-label="Transaction treemap visualization"
      >
        {treemapNodes.map((node, index) => {
          const rectWidth = node.x1 - node.x0
          const rectHeight = node.y1 - node.y0
          const color = colorScale(getMetricValue(node.data))
          const isHovered = hoveredTx?.txid === node.data.txid

          return (
            <g key={node.data.txid}>
              <rect
                x={node.x0}
                y={node.y0}
                width={rectWidth}
                height={rectHeight}
                fill={color}
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth={0.5}
                opacity={isHovered ? 0.9 : 0.8}
                onMouseEnter={() => setHoveredTx(node.data)}
                onMouseLeave={() => setHoveredTx(null)}
                onClick={() => router.push(`/block-visual/tx/${node.data.txid}`)}
                className="cursor-pointer transition-opacity"
                aria-label={`Transaction ${truncateHash(node.data.txid)} - Click to view details`}
              />
              {/* Show txid if rectangle is large enough */}
              {rectWidth > 60 && rectHeight > 20 && (
                <text
                  x={node.x0 + rectWidth / 2}
                  y={node.y0 + rectHeight / 2}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-xs font-mono fill-gray-900 dark:fill-gray-100 pointer-events-none"
                  style={{ fontSize: Math.min(rectWidth / 10, 12) }}
                >
                  {truncateHash(node.data.txid, 4, 4)}
                </text>
              )}
            </g>
          )
        })}
      </svg>

      {/* Tooltip */}
      {hoveredTx && (
        <div
          className="absolute z-10 bg-gray-900 dark:bg-gray-800 text-white text-xs rounded-lg p-3 shadow-lg border border-gray-700 pointer-events-none"
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
            maxWidth: '300px',
          }}
        >
          <div className="font-semibold mb-2 text-btc">Transaction Details</div>
          <div className="space-y-1">
            <div>
              <span className="text-gray-400">TXID:</span>{' '}
              <code className="text-xs break-all">{hoveredTx.txid}</code>
            </div>
            <div>
              <span className="text-gray-400">Size:</span>{' '}
              {formatNumber(hoveredTx.vsize)} vB
            </div>
            <div>
              <span className="text-gray-400">Fee Rate:</span>{' '}
              {formatNumber(hoveredTx.feeRate)} sat/vB
            </div>
            <div>
              <span className="text-gray-400">Fee:</span>{' '}
              {(hoveredTx.fee * 100000000).toFixed(0)} sats
            </div>
            {hoveredTx.value > 0 && (
              <div>
                <span className="text-gray-400">Value:</span>{' '}
                {hoveredTx.value.toFixed(8)} BTC
              </div>
            )}
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="mt-4 flex items-center justify-between text-sm flex-wrap gap-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            {sizeMetric === 'vbytes' && (
              <div className="w-4 h-4 rounded bg-gradient-to-r from-cyan-200 to-cyan-500"></div>
            )}
            {sizeMetric === 'value' && (
              <div className="w-4 h-4 rounded bg-gradient-to-r from-pink-200 to-pink-500"></div>
            )}
            {sizeMetric === 'fee' && (
              <div className="w-4 h-4 rounded bg-gradient-to-r from-purple-200 to-purple-500"></div>
            )}
            <span className="text-secondary">Color = {getColorLabel()}</span>
          </div>
          <div className="text-secondary">
            {sizeMetric === 'vbytes' && (
              <>Low: {formatNumber(metricRange[0])} vB → High: {formatNumber(metricRange[1])} vB</>
            )}
            {sizeMetric === 'value' && (
              <>Low: {metricRange[0].toFixed(8)} BTC → High: {metricRange[1].toFixed(8)} BTC</>
            )}
            {sizeMetric === 'fee' && (
              <>Low: {metricRange[0].toFixed(8)} BTC → High: {metricRange[1].toFixed(8)} BTC</>
            )}
          </div>
        </div>
        <div className="text-secondary">
          Size = {getMetricLabel()}
        </div>
      </div>
    </div>
  )
}
