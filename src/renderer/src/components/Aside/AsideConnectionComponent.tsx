import { useContext, useState } from 'react'
import { Button, Input, Switcher, UrlHighlight } from '../ui/common'
import { ClientContext } from '@renderer/context/ClientContext'
import { HostContext } from '@renderer/context/HostContext'
import { ClientContextType, HostContextType } from '@renderer/env'

const AsideConnectionComponent = () => {
  const [itsHost, setItsHost] = useState(false)
  //@ts-expect-error
  const { clientIp, connectToServer }: ClientContextType = useContext(ClientContext)
  //@ts-expect-error
  const { startHostServer, stopHostServer, loading, isServerUp }: HostContextType =
    useContext(HostContext)

  const handleConnectToServer = async (ip: string, port?: string | number) => {
    const portNumber = Number(port) || 9863
    const serverIp = `${ip}:${portNumber}`
    connectToServer(serverIp)
  }

  return (
    <>
      <div className="p-4 pb-0 flex gap-3 justify-center items-center border-[--bcolor]">
        <h1>Be Host</h1>
        <Switcher checked={itsHost} onCheckedChange={setItsHost} disabled={isServerUp} />
      </div>
      {itsHost ? (
        <HostOptions
          handleHost={startHostServer}
          ip={clientIp}
          loading={loading}
          isServerUp={isServerUp}
          stopHostServer={stopHostServer}
        />
      ) : (
        <ClientOptions handleConnectToServer={handleConnectToServer} />
      )}
    </>
  )
}

export default AsideConnectionComponent

const HostOptions = ({ loading, ip, handleHost, isServerUp, stopHostServer }) => {
  return (
    <div className="p-4 border-b border-[--bcolor]">
      {!loading && isServerUp ? (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-center gap-3">
            <span>Being Host</span>
            <div className="w-4 h-4 bg-green-600 animate-pulse rounded-full" />
          </div>
          {/* <h1 className="text-center font-mono text-sm">{ip}</h1> */}
          <UrlHighlight className="text-center" url={ip} />
          <Button onClick={stopHostServer} variant="outline" className="w-full">
            Stop Server
          </Button>
        </div>
      ) : (
        <Button onClick={handleHost} variant="primary" className="w-full">
          Start Server
        </Button>
      )}
    </div>
  )
}

const ClientOptions = ({ handleConnectToServer }) => {
  const [ip, setIp] = useState('')
  const [port, setPort] = useState('')

  return (
    <div className="p-4 border-b border-[--bcolor]">
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
      <Button
        variant="primary"
        onClick={() => {
          if (port) {
            handleConnectToServer(ip, Number(port))
          } else {
            handleConnectToServer(ip)
          }
        }}
        className="w-full"
      >
        Connect
      </Button>
    </div>
  )
}
