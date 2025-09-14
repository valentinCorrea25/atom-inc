import { createContext, useContext, ReactNode, useState, useEffect, useCallback } from 'react'
import { ClientContext } from './ClientContext'
import { getFromLocalStorage } from '@renderer/lib/utils'

interface HostContextType {
  startHostServer: () => Promise<void>
  stopHostServer: () => Promise<void>
  loading: boolean
  setLoading: (value: boolean) => void
  isServerUp: boolean
  hostPort: number
  setHostPort: any
}
interface HostContextProviderProps {
  children: ReactNode
}

const HostContext = createContext<HostContextType | null>(null)
const HostContextProvider = ({ children }: HostContextProviderProps) => {
  const clientContext = useContext(ClientContext)
  if (!clientContext) throw new Error('ClientContext must be used within a ClientProvider')

  const [isServerUp, setIsServerUp] = useState(false)
  const [hostPort, setHostPort] = useState(9853)
  const {
    setLoading,
    loading,
    connectToServer,
    clientIp,
    disconnectFromServer,
    isConnectedToServer
  }: any = clientContext

  useEffect(() => {
    if (!isConnectedToServer) {
      stopHostServer()
    }
  }, [isConnectedToServer])

  const startHostServer = async () => {
    if (!clientIp) return
    setLoading(true)
    try {
      const hasConnected = await window.websocket.hostServer(hostPort)
      if (hasConnected) setIsServerUp(true)
      connectToServer(`${clientIp}:${hostPort}`)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const stopHostServer = async () => {
    setLoading(true)
    try {
      await window.websocket.stopServer()
      disconnectFromServer()
    } finally {
      setLoading(false)
      setIsServerUp(false)
    }
  }

  useEffect(() => {
    if (!clientIp) return
    
    const connectOnStartup = getFromLocalStorage('settings-connectOnStartup') === 'true'
    if (!connectOnStartup) return

    const startAsServer = getFromLocalStorage('settings-startAsServer') === 'true'
    const autoConnectToIP = startAsServer ? false : (getFromLocalStorage('settings-autoConnectToIP') !== 'false')
    
    alert(connectOnStartup + ' connectOnStartup')
    alert(startAsServer + ' startAsServer')
    alert(autoConnectToIP + ' autoConnectToIP')

    if (startAsServer) {
      startHostServer()
    } else if (autoConnectToIP) {
      const autoconnect_ipAddress = getFromLocalStorage('settings-autoConnectIP')
      const autoconnect_port = getFromLocalStorage('settings-autoConnectPort')
      
      if (autoconnect_ipAddress && autoconnect_port) {
        connectToServer(`${autoconnect_ipAddress}:${autoconnect_port}`)
      }
    }
  }, [clientIp])

  return (
    <HostContext.Provider
      value={{
        startHostServer,
        stopHostServer,
        loading,
        setLoading,
        isServerUp,
        hostPort,
        setHostPort
      }}
    >
      {children}
    </HostContext.Provider>
  )
}

export { HostContext, HostContextProvider }
