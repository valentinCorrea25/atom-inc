/// <reference types="vite/client" />

interface User {
  id: string
  name: string
  ip: string
  color: string
  isOnline: boolean
}

interface Message {
  id: string
  userId: string
  userName: string
  userColor: string
  content: string
  timestamp: Date
  type: 'message' | 'file' | 'system'
  fileName?: string
  fileSize?: number
}

interface Window {
  websocket: {
    hostServer: () => Promise<string>
    stopServer: () => Promise<void>
  }
  client: {
    connectToServer: () => () => Promise<string>
    disconnectFromSever: () => Promise<void>
    getIp: () => Promise<string>
    sendMessage: (message) => () => void
  }
}

export interface HostContextType {
  startHostServer: () => Promise<void>
  stopHostServer: () => Promise<void>
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
}


export interface ClientContextType {
  connectToServer: (ip: string) => void
  disconnectFromServer: () => Promise<void>
  sendMessageToServer: (message: string) => void
  clientIp: string // puedes usar Promise<string> si lo deseas, pero usualmente conviene ya resolverlo
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
}