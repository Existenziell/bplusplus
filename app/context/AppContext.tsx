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
  notificationText: string
  granularity: string
  loading: boolean
  setNumberOfCells: Dispatch<SetStateAction<number>>
  setShowNotification: Dispatch<SetStateAction<boolean>>
  setNotificationText: Dispatch<SetStateAction<string>>
  setGranularity: Dispatch<SetStateAction<string>>
  setLoading: Dispatch<SetStateAction<boolean>>
}

const AppContext = createContext<contextProps>({
  numberOfCells: 0,
  showNotification: false,
  notificationText: '',
  granularity: 'monthly',
  loading: false,
  setNumberOfCells: (): number => 0,
  setShowNotification: (): boolean => false,
  setNotificationText: (): string => '',
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
  const [notificationText, setNotificationText] = useState('')
  const [granularity, setGranularity] = useState('monthly')
  const [loading, setLoading] = useState(false)

  return (
    <AppContext.Provider
      value={{
        numberOfCells,
        showNotification,
        notificationText,
        granularity,
        loading,
        setNumberOfCells,
        setShowNotification,
        setNotificationText,
        setGranularity,
        setLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)
