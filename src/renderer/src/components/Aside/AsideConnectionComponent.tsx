import { useContext, useState } from 'react'
import { Button, Input, Switcher, UrlHighlight } from '../ui/common'
import { ClientContext } from '@renderer/context/ClientContext'
import { HostContext } from '@renderer/context/HostContext'
import { ClientContextType, HostContextType } from '@renderer/env'

const AsideConnectionComponent = () => {
  const [itsHost, setItsHost] = useState(false)

  return (
    <>
      <div className="p-4 pb-0 flex gap-3 justify-center items-center border-[--bcolor]">
        <h1>Be Host</h1>
        <Switcher checked={itsHost} onCheckedChange={setItsHost} />
      </div>
      {itsHost ? <HostOptions /> : <ClientOptions />}
    </>
  )
}

export default AsideConnectionComponent

const HostOptions = () => {
  //@ts-expect-error
  const {
    startHostServer,
    stopHostServer,
    loading,
    isServerUp,
    hostPort,
    setHostPort
  }: HostContextType = useContext(HostContext)

  //@ts-expect-error
  const { clientIp }: ClientContextType = useContext(ClientContext)

  return (
    <div className="p-4 border-b border-[var(--border-color)]">
      {!loading && isServerUp ? (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-center gap-3">
            <span>Being Host</span>
            <div className="w-4 h-4 bg-green-600 animate-pulse rounded-full" />
          </div>
          <UrlHighlight className="text-center" url={clientIp + ':' + hostPort} />
          <Button onClick={stopHostServer} variant="outline" className="w-full">
            Stop Server
          </Button>
        </div>
      ) : (
        <>
          <div className="w-full flex justify-center items-center my-4 gap-2">
            <h2>Host port: </h2>
            <Input
              placeholder="9853"
              className="!w-20"
              max={9999}
              defaultValue={hostPort}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 4)
                setHostPort(value)
              }}
            />
          </div>
          <Button onClick={startHostServer} variant="primary" className="w-full">
            Start Server
          </Button>
        </>
      )}
    </div>
  )
}

const ClientOptions = () => {
  const [ip, setIp] = useState('')
  const [port, setPort] = useState('')

  //@ts-expect-error
  const { connectToServer, isConnectedToServer, disconnectFromServer }: ClientContextType =
    useContext(ClientContext)

  const handleConnectToServer = () => {
    const portNumber = Number(port) || 9853
    const serverIp = `${ip}:${portNumber}`
    connectToServer(serverIp)
  }

  const handleDisconnectFromServer = () => {
    disconnectFromServer()
  }

  const handleKeyDownEnter = (e) => {
    if (e.key === 'Enter') {
      isConnectedToServer ? handleDisconnectFromServer() : handleConnectToServer()
    }
  }

  return (
    <div className="p-4 border-b border-[var(--border-color)]" onKeyDown={handleKeyDownEnter}>
      <div className="mb-4">
        <label className="text-sm mb-2 block" style={{ color: 'rgb(153, 153, 153)' }}>
          Connect To
        </label>
        <div className="flex items-center gap-2">
          <Input placeholder="192.169.1.x" value={ip} onChange={(e) => setIp(e.target.value)} />
          <span className="text-gray-500">:</span>
          <Input
            placeholder="9853"
            className="!w-20"
            value={port}
            onChange={(e) => setPort(e.target.value)}
          />
        </div>
      </div>
      {isConnectedToServer ? (
        <Button variant="outline" onClick={handleDisconnectFromServer} className="w-full">
          Disconnect
        </Button>
      ) : (
        <Button variant="primary" onClick={handleConnectToServer} className="w-full">
          Connect
        </Button>
      )}
    </div>
  )
}
