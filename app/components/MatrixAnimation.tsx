'use client'

import { useEffect, useRef } from 'react'

interface MatrixAnimationProps {
  duration?: number // Duration in milliseconds
  onComplete?: () => void
}

export default function MatrixAnimation({ duration = 4000, onComplete }: MatrixAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(null)
  const startTimeRef = useRef<number>(Date.now())

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size to match viewport (full page)
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Matrix characters
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'
    const charArray = chars.split('')

    // Column configuration
    const fontSize = 14
    const columns = Math.floor(canvas.width / fontSize)
    const drops: number[] = []

    // Initialize drops
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100
    }

    // Detect theme from document
    const getThemeColor = () => {
      // Check if dark mode class is on html or body
      const isDark = document.documentElement.classList.contains('dark') ||
                     document.body.classList.contains('dark') ||
                     window.matchMedia('(prefers-color-scheme: dark)').matches
      return isDark ? '#f2a900' : '#4ade80' // Bitcoin orange for dark, green-400 for light
    }

    // Animation function
    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current
      
      if (elapsed >= duration) {
        if (onComplete) {
          onComplete()
        }
        return
      }

      // Clear with slight fade for trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Set text properties - match terminal theme
      ctx.fillStyle = getThemeColor()
      ctx.font = `${fontSize}px monospace`

      // Draw characters
      for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)]
        const x = i * fontSize
        const y = drops[i] * fontSize

        // Draw character
        ctx.fillText(text, x, y)

        // Reset drop if it reaches bottom or randomly
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }

        // Move drop down
        drops[i]++
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [duration, onComplete])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}
