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
  showNotification: boolean
  granularity: string
  setNumberOfCells: Dispatch<SetStateAction<number>>
  setShowNotification: Dispatch<SetStateAction<boolean>>
  setGranularity: Dispatch<SetStateAction<string>>
}

const AppContext = createContext<contextProps>({
  numberOfCells: 0,
  showNotification: false,
  granularity: 'monthly',
  setNumberOfCells: (): number => 0,
  setShowNotification: (): boolean => false,
  setGranularity: (): string => 'monthly'
})

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [numberOfCells, setNumberOfCells] = useState(0)
  const [showNotification, setShowNotification] = useState(false)
  const [granularity, setGranularity] = useState('monthly')

  return (
    <AppContext.Provider
      value={{
        numberOfCells,
        showNotification,
        granularity,
        setNumberOfCells,
        setShowNotification,
        setGranularity,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)
