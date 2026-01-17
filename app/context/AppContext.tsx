'use client'

import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react'

interface contextProps {
  showNotification: boolean
  notificationText: string
  setShowNotification: Dispatch<SetStateAction<boolean>>
  setNotificationText: Dispatch<SetStateAction<string>>
}

const AppContext = createContext<contextProps>({
  showNotification: false,
  notificationText: '',
  setShowNotification: (): boolean => false,
  setNotificationText: (): string => '',
})

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [showNotification, setShowNotification] = useState(false)
  const [notificationText, setNotificationText] = useState('')

  return (
    <AppContext.Provider
      value={{
        showNotification,
        notificationText,
        setShowNotification,
        setNotificationText,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)
