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
  setNumberOfCells: Dispatch<SetStateAction<number>>
  setShowNotification: Dispatch<SetStateAction<boolean>>
}

const AppContext = createContext<contextProps>({
  numberOfCells: 0,
  showNotification: false,
  setNumberOfCells: (): number => 0,
  setShowNotification: (): boolean => false,
})

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [numberOfCells, setNumberOfCells] = useState(0)
  const [showNotification, setShowNotification] = useState(false)

  return (
    <AppContext.Provider
      value={{
        numberOfCells,
        showNotification,
        setNumberOfCells,
        setShowNotification,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)
