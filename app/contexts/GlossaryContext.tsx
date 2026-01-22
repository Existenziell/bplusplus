'use client'

import React, { createContext, useContext, ReactNode } from 'react'

interface GlossaryEntry {
  term: string
  definition: string
}

type GlossaryData = Record<string, GlossaryEntry>

interface GlossaryContextType {
  glossaryData: GlossaryData
  isLoading: boolean
}

// Read glossary data from inlined script tag (set at build time)
function getGlossaryData(): GlossaryData {
  if (typeof window === 'undefined') return {}

  // Check if data is already inlined in window
  const windowGlossary = (window as any).__GLOSSARY_DATA__
  if (windowGlossary) {
    return windowGlossary
  }

  // Fallback: try to read from script tag
  const scriptTag = document.getElementById('glossary-data')
  if (scriptTag && scriptTag.textContent) {
    try {
      return JSON.parse(scriptTag.textContent)
    } catch {
      return {}
    }
  }

  return {}
}

const glossaryData = getGlossaryData()

const GlossaryContext = createContext<GlossaryContextType>({
  glossaryData,
  isLoading: false,
})

export function GlossaryProvider({ children }: { children: ReactNode }) {
  // Glossary data is inlined in HTML, no loading needed
  return (
    <GlossaryContext.Provider value={{ glossaryData, isLoading: false }}>
      {children}
    </GlossaryContext.Provider>
  )
}

export function useGlossary() {
  return useContext(GlossaryContext)
}
