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
  loading: boolean
  setNumberOfCells: Dispatch<SetStateAction<number>>
  setShowNotification: Dispatch<SetStateAction<boolean>>
  setGranularity: Dispatch<SetStateAction<string>>
  setLoading: Dispatch<SetStateAction<boolean>>
}

const AppContext = createContext<contextProps>({
  numberOfCells: 0,
  showNotification: false,
  granularity: 'monthly',
  loading: false,
  setNumberOfCells: (): number => 0,
  setShowNotification: (): boolean => false,
  setGranularity: (): string => 'monthly',
  setLoading: (): boolean => false,
})

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [numberOfCells, setNumberOfCells] = useState(0)
  const [showNotification, setShowNotification] = useState(false)
  const [granularity, setGranularity] = useState('monthly')
  const [loading, setLoading] = useState<boolean>(false)

  return (
    <AppContext.Provider
      value={{
        numberOfCells,
        showNotification,
        granularity,
        loading,
        setNumberOfCells,
        setShowNotification,
        setGranularity,
        setLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)
