import { networkInterfaces } from 'os'
import { WebSocketServer, WebSocket } from 'ws'
import { v4 as uuidv4 } from 'uuid'
import { Message } from '../../types'

const DEFAULT_PORT = 9853
let wss: WebSocketServer | null = null
let connectedClients: any[] = []

export function hostServer(port: number): boolean {
  const portUsed = port || DEFAULT_PORT
  try {
    if (wss) {
      console.log('Server already running, closing previous instance...')
      stopServer()
    }

    wss = new WebSocketServer({ port: portUsed })
    const ipAdd = getServerIpAddress()

    if (!ipAdd) {
      console.error('Could not determine server IP address')
      return false
    }

    console.log(`Server Hosted at: ${ipAdd}:${portUsed}`)

    wss.on('error', handleServerError)
    wss.on('connection', function connection(ws: WebSocket, request) {
      const ip = request.socket.remoteAddress || request.headers['x-forwarded-for']
      handleConnectClient(ws, ip)

      ws.on('close', () => handleDisconnectClient(ws))
      ws.on('error', handleClientError)
      ws.on('message', handleClientMessage)
    })

    return true
  } catch (error) {
    console.error('Failed to start server:', error)
    return false
  }
}

export function stopServer(): void {
  if (!wss) {
    console.log('⚠️  No server running')
    return
  }

  wss.close(() => {
    console.log('Server Closed')
    wss = null
  })
}

//! Utils
export function getServerIpAddress(): string | null {
  const nets = networkInterfaces()

  for (const name of Object.keys(nets)) {
    const interfaces = nets[name]
    if (!interfaces) continue

    for (const net of interfaces) {
      const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
      if (net.family === familyV4Value && !net.internal) {
        return net.address
      }
    }
  }

  return null
}

//! Handler functions
function handleServerError(_error: Error): void {
  // TODO: Implement server error handling
}

function handleClientError(_error: Error): void {
  // TODO: Implement client error handling
}

function handleClientMessage(msg: any): void {
  const rawMessage = msg instanceof Buffer ? msg.toString('utf8') : msg
  const message: Message = JSON.parse(rawMessage)

  if (wss) {
    switch (message.type) {
      case 'message':
      case 'system':
      case 'file':
        sendMessageToAllUsers(message, wss)
        break
      case 'transfer':
        sendMessageToUserByIpAddress(message)
        break
    }
  }
}

function sendMessageToAllUsers(message: Message, wss: WebSocketServer) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message))
    }
  })
}

function sendMessageToUserByIpAddress(message: Message) {
  const client = connectedClients.find((check) => {
    return check.ip == message.to
  })

  client.send(JSON.stringify(message))
}

function handleConnectClient(ws, ip) {
  const parseid = ip.substring(7)
  ws.ip = parseid
  connectedClients.push(ws)
  console.log('Client Connect: ' + parseid)
  logClientsConnected()

  const connectedMessage = {
    id: uuidv4(),
    userId: 'system',
    userName: 'System',
    userColor: '#6b7280',
    content: `${parseid} has connected to the network`,
    timestamp: new Date(),
    type: 'system'
  }
  handleClientMessage(JSON.stringify(connectedMessage))
}

function handleDisconnectClient(ws) {
  connectedClients = connectedClients.filter((check) => {
    return check.ip != ws.ip
  })
  console.log('Client Disconnect: ' + ws.ip + '. ' + connectedClients.length + ' Online')

  const connectedMessage = {
    id: uuidv4(),
    userId: 'system',
    userName: 'System',
    userColor: '#6b7280',
    content: `${ws.ip} has disconnected from the newtwork to the network`,
    timestamp: new Date(),
    type: 'system'
  }
  handleClientMessage(JSON.stringify(connectedMessage))
}

function logClientsConnected() {
  console.log('Users Online: ' + connectedClients.length)
}
