'use client'

import { useEffect, useState, useRef, memo } from 'react'

const quotes = [
  "Bitcoin fixes this.",
  "Bitcoin cannot be hacked. It can only be adopted.",
  "Bitcoin is a titanic base layer of absolute truth, robust enough to carry the entire world economy on its shoulders.",
  "Bitcoin is nothing but mathematics and decentralized communication. It requires no army to defend, no borders to enforce, no politicians to maintain.",
  "Bitcoin is a trust machine. It replaces trust in institutions with mathematical verification.",
  "Bitcoin is a protocol that allows for free and instant transfers of value across the entire planet. Trustless, Permissionless.",
  "Nothing in this world is more powerful than an idea. Bitcoin is that idea. It is unstoppable.",
  "Never ending wars are the consensus mechanism for the FIAT system.",
  "Bitcoin is deflationary money with absolute scarcity. Scarcity will produce beautiful unseen conditions of human interaction, abundance and deflation.",
  "Fiat means 'Only the elite can print money'. Crypto means 'Everyone can print money'. Bitcoin means 'No one can print money'",
  "The root problem with conventional currency is all the trust that's required to make it work. — Satoshi Nakamoto",
  "I've been working on a new electronic cash system that's fully peer-to-peer, with no trusted third party. — Satoshi Nakamoto",
  "If you don't believe it or don't get it, I don't have the time to try to convince you, sorry. — Satoshi Nakamoto",
  "It might make sense just to get some in case it catches on. — Satoshi Nakamoto",
  "Lost coins only make everyone else's coins worth slightly more. Think of it as a donation to everyone. — Satoshi Nakamoto",
  "Bitcoin seems to be a very promising idea. I like the idea of basing security on the assumption that the CPU power of honest participants outweighs that of the attacker. — Hal Finney",
  "The computer can be used as a tool to liberate and protect people, rather than to control them. — Hal Finney",
  "There are 3 eras of currency: Commodity based, politically based, and now, math based. — Chris Dixon",
  "Bitcoin will do to banks what email did to the postal industry. — Rick Falkvinge, Founder of the Swedish pirate party",
  "Bitcoin represents something unprecedented: Element Zero, consisting only of energy. — Nick Szabo",
  "Bitcoin is the currency of resistance. — Max Keiser",
  "The internet of money is here. Let's build it together. — Andreas Antonopoulos",
  "Bitcoin is a tool for freeing humanity from oligarchs and tyrants, dressed up as a get-rich-quick scheme. — Naval Ravikant",
  "Crypto offers freedom to the unbanked and hope to the underprivileged. — Elizabeth Stark",
  "Bitcoin is the most important invention since the internet. — Charlie Shrem",
  "Bitcoin is hope, human interaction & communication. And the inevitable future of money.",
  "Bitcoin: Beauty through simplicity.",
]

// Shuffle the array using the Fisher-Yates algorithm
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

function QuoteRotator() {
  const [quote, setQuote] = useState<string>('')
  const [isVisible, setIsVisible] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const remainingQuotes = useRef<string[]>([])

  const getNextQuote = () => {
    if (remainingQuotes.current.length === 0) {
      remainingQuotes.current = shuffleArray(quotes)
    }
    return remainingQuotes.current.pop()!
  }

  useEffect(() => {
    // Only run on client to avoid hydration mismatch
    setIsMounted(true)
    setQuote(getNextQuote())
    setIsVisible(true)
    
    const interval = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setQuote(getNextQuote())
        setIsVisible(true)
      }, 500)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  // Don't render quote until mounted to avoid hydration mismatch
  if (!isMounted) {
    return (
      <blockquote
        className="text-xl text-secondary text-center max-w-4xl mx-auto italic min-h-[4rem] md:min-h-[4rem]"
        aria-live="polite"
        aria-atomic="true"
      >
        &nbsp;
      </blockquote>
    )
  }

  return (
    <blockquote
      className={`text-xl text-secondary text-center max-w-4xl mx-auto italic min-h-[4rem] md:min-h-[4rem] transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-live="polite"
      aria-atomic="true"
    >
      {quote && <>&quot;{quote}&quot;</>}
    </blockquote>
  )
}

export default memo(QuoteRotator)
