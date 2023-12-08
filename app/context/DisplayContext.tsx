'use client'

import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react'

interface contextProps {
  displayNumber: number
  displayColor: string
  displayLightness: number
  setDisplayNumber: Dispatch<SetStateAction<number>>
  setDisplayColor: Dispatch<SetStateAction<string>>
  setDisplayLightness: Dispatch<SetStateAction<number>>
}

const DisplayContext = createContext<contextProps>({
  displayNumber: 0,
  displayColor: '',
  displayLightness: 0,
  setDisplayColor: (): string => '',
  setDisplayNumber: (): number => 0,
  setDisplayLightness: (): number => 0,
})

export const DisplayContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [displayNumber, setDisplayNumber] = useState(0)
  const [displayColor, setDisplayColor] = useState('hsl(232, 76%, 73%)')
  const [displayLightness, setDisplayLightness] = useState(50)

  return (
    <DisplayContext.Provider
      value={{
        displayNumber,
        setDisplayNumber,
        displayColor,
        setDisplayColor,
        displayLightness,
        setDisplayLightness,
      }}
    >
      {children}
    </DisplayContext.Provider>
  )
}

export const useDisplayContext = () => useContext(DisplayContext)
