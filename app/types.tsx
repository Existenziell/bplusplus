export type CellType = {
  number: number
  hsl: {
    value: string
    lightness: number
  }
}

export type copyToClipboardProps = {
  data: string
  notificationText: string
  setShowNotification: (value: boolean) => void
  setNotificationText: (value: string) => void
}
