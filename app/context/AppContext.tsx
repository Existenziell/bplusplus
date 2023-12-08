'use client'

import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react'

interface contextProps {
  numberOfCells: number
  setNumberOfCells: Dispatch<SetStateAction<number>>
}

const AppContext = createContext<contextProps>({
  numberOfCells: 0,
  setNumberOfCells: (): number => 0,
})

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [numberOfCells, setNumberOfCells] = useState(0)

  return (
    <AppContext.Provider
      value={{
        numberOfCells,
        setNumberOfCells,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)
