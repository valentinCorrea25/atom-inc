import { Message } from '@renderer/env'
import { getFromLocalStorage } from '@renderer/lib/utils'
import { createContext, useState, ReactNode, useRef, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

interface ClientContextType {
  connectToServer: (ip: string) => void
  disconnectFromServer: () => Promise<void>
  sendMessageToServer: (message: string) => void
  clientIp: string
  setLoading: (value: boolean) => void
  loading: boolean
  isConnectedToServer: boolean
  messages: Message[]
  setMessages: any
  setClientName
  setClientColor
}

const ClientContext = createContext<ClientContextType | null>(null)

interface ClientContextProviderProps {
  children: ReactNode
}

let hasMounted = false

const ClientContextProvider = ({ children }: ClientContextProviderProps) => {
  const [loading, setLoading] = useState(false)
  const [clientIp, setClientIp] = useState<string>('')
  const connectionWebSocketRef = useRef<WebSocket>(undefined)
  const [clientName, setClientName] = useState('Device')
  const [clientColor, setClientColor] = useState('#fff')
  const [isConnectedToServer, setIsConnectedToServer] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    const fetchIp = async () => {
      const ip = await window.client.getIp()
      setClientIp(ip)
      setClientColor(getFromLocalStorage('color') || '#fff')
      setClientName(getFromLocalStorage('name') || 'Device')

      const autoConnectIP = getFromLocalStorage('settings-autoConnectIP')
      if (autoConnectIP) {
        console.log('autoconnect ip');
        connectToServer(autoConnectIP)
      }
    }
    if (!hasMounted) {
      hasMounted = true
      fetchIp()
    }
  }, [])

  const connectToServer = (serverIp: string) => {
    setMessages([])
    setLoading(true)
    try {
      connectionWebSocketRef.current = new WebSocket('ws://' + serverIp, 'json')
      const ws = connectionWebSocketRef.current

      ws.onopen = function () {
        setIsConnectedToServer(true)
      }

      ws.onmessage = function (evt) {
        let msg = JSON.parse(evt.data)
        setMessages((prev) => [...prev, msg])
        console.log(msg)
      }

      ws.onclose = function (evt) {
        console.log(evt)
        setIsConnectedToServer(false)
        const serverIpwithoutPort = serverIp.slice(0, -5)
        if (serverIpwithoutPort != clientIp) alert('Disconnected from server')
      }

      ws.onerror = function (evt) {
        console.log(evt)

        setIsConnectedToServer(false)
        alert('Unable to Connect')
      }
    } catch (error) {
      alert(error)
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const disconnectFromServer = async () => {
    setLoading(true)

    try {
      if (connectionWebSocketRef.current) {
        connectionWebSocketRef.current.close()
        setIsConnectedToServer(false)
      }
    } catch (error) {
      alert(error)
    } finally {
      setLoading(false)
    }
  }

  const sendMessageToServer = (message: string) => {
    setLoading(true)
    try {
      if (!connectionWebSocketRef.current && connectionWebSocketRef.current != undefined) {
        alert('Message cant be send, is not connected to any server')
      }
      const msg = {
        type: 'message',
        id: uuidv4(),
        timestamp: new Date(),
        userIp: clientIp,
        userName: clientName,
        userColor: clientColor,
        content: message
      }
      //@ts-expect-error
      connectionWebSocketRef.current.send(JSON.stringify(msg))
    } catch (error) {
      alert(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ClientContext.Provider
      value={{
        connectToServer,
        disconnectFromServer,
        sendMessageToServer,
        clientIp,
        loading,
        setLoading,
        isConnectedToServer,
        setClientColor,
        setClientName,
        messages,
        setMessages
      }}
    >
      {children}
    </ClientContext.Provider>
  )
}

export { ClientContext, ClientContextProvider }
