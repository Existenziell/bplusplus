'use client'

import React, { createContext, useContext, useState } from "react"

const AppContext = createContext({})

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [displayNumber, setDisplayNumber] = useState()
  const [displayColor, setDisplayColor] = useState()

  return (
      <AppContext.Provider value={{ displayNumber, setDisplayNumber, displayColor, setDisplayColor }}>
        {children}
      </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)
