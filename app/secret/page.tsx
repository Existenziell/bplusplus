'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import confetti from 'canvas-confetti'

// Secret trigger words (case-insensitive)
export const SECRET_TRIGGERS = [
  'pizza',
  'nakamoto',
  'magic internet money',
  'secret',
  'hodl',
  'konami',
  'cheat',
  'bailout',
  'easter',
  'easteregg',
  'rickroll',
]

// System error messages for Easter egg
export const SYSTEM_ERROR_MESSAGES = [
  '..............................',
  'Kernel Panic...',
  'Quantum Entanglement Detected!',
  'System Overload...',
  '..............................',
]

const mysteriousMessages = [
  'In the depths of the blockchain, secrets await those who seek them.',
  'The genesis block holds more than just transactions. It holds a message.',
  'Trust the math. Verify everything. Question authority.',
  'Bitcoin is not just code. It is a revolution in trust.',
  'The orange coin reveals its mysteries to the curious.',
  'What Satoshi created was not just money. It was freedom.',
  'The keys to understanding lie in the cryptography.',
  'Decentralization is not a feature. It is the foundation.',
]

export default function SecretPage() {
  const [hasSpoken, setHasSpoken] = useState(false)
  const [randomMessage, setRandomMessage] = useState('')
  const confettiTriggered = useRef(false)
  const speechTriggered = useRef(false)

  useEffect(() => {
    // Trigger confetti on mount
    if (!confettiTriggered.current) {
      confettiTriggered.current = true
      
      // Multiple confetti bursts
      const duration = 3000
      const end = Date.now() + duration

      const interval = setInterval(() => {
        if (Date.now() > end) {
          clearInterval(interval)
          return
        }

        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#f2a900', '#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1'],
        })
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#f2a900', '#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1'],
        })
      }, 100)

      // Final burst
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f2a900', '#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1'],
        })
      }, duration)
    }
  }, [])

  useEffect(() => {
    // Text-to-speech with mysterious voice
    if (speechTriggered.current) return
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
    
    speechTriggered.current = true
    
    const speak = () => {
      // Double-check guard
      if (speechTriggered.current === false) return
      
      const utterance = new SpeechSynthesisUtterance(
        'You have discovered the hidden path. The mysteries of Bitcoin run deeper than you thought. What you seek is not in the code, but in the philosophy.'
      )
      
      // Try to find a mysterious voice
      const voices = speechSynthesis.getVoices()
      const mysteriousVoice = voices.find(
        voice => voice.name.toLowerCase().includes('zira') ||
                 voice.name.toLowerCase().includes('samantha') ||
                 voice.name.toLowerCase().includes('alex')
      ) || voices.find(voice => voice.lang.startsWith('en'))
      
      if (mysteriousVoice) {
        utterance.voice = mysteriousVoice
        utterance.rate = 0.85 // Slightly slower
        utterance.pitch = 0.9 // Slightly lower
      }
      
      utterance.volume = 0.8
      
      // Mark as spoken
      setHasSpoken(true)
      
      // Delay speech slightly
      setTimeout(() => {
        speechSynthesis.speak(utterance)
      }, 500)
    }

    // Wait for voices to load
    const voices = speechSynthesis.getVoices()
    if (voices.length === 0) {
      const handleVoicesChanged = () => {
        speak()
        // Remove listener after first call
        speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged)
      }
      speechSynthesis.addEventListener('voiceschanged', handleVoicesChanged)
      
      return () => {
        speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged)
      }
    } else {
      speak()
    }
  }, [])

  // Set random message on client side only to avoid hydration mismatch
  useEffect(() => {
    setRandomMessage(
      mysteriousMessages[
        Math.floor(Math.random() * mysteriousMessages.length)
      ]
    )
  }, [])

  return (
    <div className="flex-1 page-bg flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background effect */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-btc/20 via-transparent to-btc/20 animate-pulse" />
      </div>

      <div className="max-w-2xl mx-auto text-center relative z-10 space-y-8">
        {/* Glitch effect title */}
        <h1 className="heading-page text-6xl md:text-8xl font-bold relative">
          <span className="absolute inset-0 text-btc/30 blur-sm animate-pulse">
            SECRET
          </span>
        </h1>

        {/* Mysterious text with typewriter effect */}
        <div className="space-y-6">
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 font-mono leading-relaxed">
            {randomMessage || 'Loading...'}
          </p>

          <div className="border-t border-b border-btc/30 py-6 space-y-4">
            <p className="text-lg text-gray-600 dark:text-gray-400 font-mono">
              You have discovered a hidden path.
            </p>
            <p className="text-base text-gray-500 dark:text-gray-500 font-mono">
              The mysteries of Bitcoin run deeper than you thought.
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-600 font-mono italic">
              What you seek is not in the code, but in the philosophy.
            </p>
          </div>

          <div className="space-y-2 text-gray-600 dark:text-gray-400 font-mono text-sm">
            <p className="text-btc font-semibold">Don't trust, verify.</p>
          </div>
        </div>

        {/* Navigation links */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
          <Link
            href="/terminal"
            className="btn-primary"
          >
            Back to Terminal
          </Link>
          <Link
            href="/"
            className="btn-secondary"
          >
            Return Home
          </Link>
        </div>

        {/* Hidden message for the curious */}
        <div className="mt-12 pt-8 border-t border-gray-300 dark:border-gray-700">
          <p className="text-xs text-gray-400 dark:text-gray-600 font-mono">
            Block Height: 0 | Hash: 000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-600 font-mono mt-2">
            &quot;The Times 03/Jan/2009 Chancellor on brink of second bailout for banks&quot;
          </p>
        </div>
      </div>
    </div>
  )
}
