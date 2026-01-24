'use client'

import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react'

interface GlossaryEntry {
  term: string
  definition: string
}

type GlossaryData = Record<string, GlossaryEntry>

interface GlossaryContextType {
  glossaryData: GlossaryData
  isLoading: boolean
}

// Read glossary data from window.__GLOSSARY_DATA__ (set at build time in layout)
function getGlossaryData(): GlossaryData {
  if (typeof window === 'undefined') return {}
  return (window as unknown as { __GLOSSARY_DATA__?: GlossaryData }).__GLOSSARY_DATA__ ?? {}
}

const GlossaryContext = createContext<GlossaryContextType>({
  glossaryData: {},
  isLoading: true,
})

export function GlossaryProvider({ children }: { children: ReactNode }) {
  const [glossaryData, setGlossaryData] = useState<GlossaryData>({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Only read glossary data on client after mount to avoid hydration mismatch
    const data = getGlossaryData()
    setGlossaryData(data)
    setIsLoading(false)
  }, [])

  return (
    <GlossaryContext.Provider value={{ glossaryData, isLoading }}>
      {children}
    </GlossaryContext.Provider>
  )
}

export function useGlossary() {
  return useContext(GlossaryContext)
}
