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
  displayNumber: number
  displayColor: string
  displayLightness: number
  setNumberOfCells: Dispatch<SetStateAction<number>>
  setDisplayNumber: Dispatch<SetStateAction<number>>
  setDisplayColor: Dispatch<SetStateAction<string>>
  setDisplayLightness: Dispatch<SetStateAction<number>>
}

const AppContext = createContext<contextProps>({
  numberOfCells: 0,
  displayNumber: 0,
  displayColor: '',
  displayLightness: 0,
  setNumberOfCells: (): number => 0,
  setDisplayColor: (): string => '',
  setDisplayNumber: (): number => 0,
  setDisplayLightness: (): number => 0,
})

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [displayNumber, setDisplayNumber] = useState(0)
  const [displayColor, setDisplayColor] = useState('hsl(232, 76%, 73%)')
  const [displayLightness, setDisplayLightness] = useState(50)
  const [numberOfCells, setNumberOfCells] = useState(0)

  return (
    <AppContext.Provider
      value={{
        numberOfCells,
        setNumberOfCells,
        displayNumber,
        setDisplayNumber,
        displayColor,
        setDisplayColor,
        displayLightness,
        setDisplayLightness,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)
