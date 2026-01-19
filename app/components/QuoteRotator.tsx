'use client'

import { useEffect, useState } from 'react'

const quotes = [
  // Original quotes
  "Fiat means 'Only the elite can print money'. Crypto means 'Everyone can print money'. Bitcoin means 'No one can print money'",
  "Bitcoin is a titanic base layer of absolute truth, robust enough to carry the entire world economy on its shoulders.",
  "Bitcoin is nothing but mathematics and decentralized communication. It requires no army to defend, no borders to enforce, no politicians to maintain.",
  "Bitcoin is a trust machine. It replaces trust in institutions with mathematical verification.",
  "Bitcoin is a protocol that allows for free and instant transfers of value across the entire planet. Trustless, Permissionless.",
  "Nothing in this world is more powerful than an idea. Bitcoin is that idea. It is unstoppable.",
  "Never ending wars are the consensus mechanism for the FIAT system.",
  "Bitcoin is deflationary money with absolute scarcity. Scarcity will produce beautiful unseen conditions of human interaction, abundance and deflation.",
  "Bitcoin fixes this.",
  // Satoshi Nakamoto
  "The root problem with conventional currency is all the trust that's required to make it work. — Satoshi Nakamoto",
  "I've been working on a new electronic cash system that's fully peer-to-peer, with no trusted third party. — Satoshi Nakamoto",
  "If you don't believe it or don't get it, I don't have the time to try to convince you, sorry. — Satoshi Nakamoto",
  "It might make sense just to get some in case it catches on. — Satoshi Nakamoto",
  "Lost coins only make everyone else's coins worth slightly more. Think of it as a donation to everyone. — Satoshi Nakamoto",
  // Hal Finney
  "Bitcoin seems to be a very promising idea. I like the idea of basing security on the assumption that the CPU power of honest participants outweighs that of the attacker. — Hal Finney",
  "The computer can be used as a tool to liberate and protect people, rather than to control them. — Hal Finney",
]

export default function QuoteRotator() {
  const [quote, setQuote] = useState<string>('')

  useEffect(() => {
    const getRandomQuote = () => quotes[Math.floor(Math.random() * quotes.length)]
    setQuote(getRandomQuote())
    const interval = setInterval(() => {
      setQuote(getRandomQuote())
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8 text-center max-w-4xl mx-auto italic min-h-[4rem] md:min-h-[4rem]">
      {quote && <>&quot;{quote}&quot;</>}
    </p>
  )
}
