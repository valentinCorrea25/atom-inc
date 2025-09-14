import { networkInterfaces } from 'os'
import { WebSocketServer, WebSocket } from 'ws'
import { v4 as uuidv4 } from 'uuid'

const DEFAULT_PORT = 9853
let wss: WebSocketServer | null = null
const connectedUsersIps: string[] = []

export function hostServer(port: number): boolean {
  const portUsed = port || DEFAULT_PORT
  try {
    if (wss) {
      console.log('⚠️  Server already running, closing previous instance...')
      stopServer()
    }

    wss = new WebSocketServer({ port: portUsed })
    const ipAdd = getServerIpAddress()

    if (!ipAdd) {
      console.error('❌ Could not determine server IP address')
      return false
    }

    console.log(`🛜 Server Hosted at: ${ipAdd}:${portUsed}`)

    wss.on('error', handleServerError)
    wss.on('connection', function connection(ws: WebSocket, request) {
      const ip = request.socket.remoteAddress || request.headers['x-forwarded-for']
      handleClientConnected(ip)

      ws.on('close', () => handleClientDisconnect(ip))
      ws.on('error', handleClientError)
      ws.on('message', handleClientMessage)
    })

    return true
  } catch (error) {
    console.error('❌ Failed to start server:', error)
    return false
  }
}

export function stopServer(): void {
  if (!wss) {
    console.log('⚠️  No server running')
    return
  }

  wss.close(() => {
    console.log('❌ Server Closed')
    wss = null
  })
}

// Handler functions
function handleServerError(_error: Error): void {
  // TODO: Implement server error handling
}

function handleClientError(_error: Error): void {
  // TODO: Implement client error handling
}

function handleClientDisconnect(ip: string): void {
  console.log('Client disconnected ' + ip)
  removeIpFromConnectedList(ip)
  console.log(connectedUsersIps)
}

function handleClientConnected(ip: string) {
  console.log('🔗 New client connected: ' + ip)
  const parseip = ip.substring(7)
  connectedUsersIps.push(ip)
  console.log(connectedUsersIps)

  const connectedMessage = {
    id: uuidv4(),
    userId: 'system',
    userName: 'Sistema',
    userColor: '#6b7280',
    content: `${parseip} se ha conectado a la red`,
    timestamp: new Date(),
    type: 'system'
  }
  handleClientMessage(JSON.stringify(connectedMessage))
}

function handleClientMessage(msg: any): void {
  const message = msg instanceof Buffer ? msg.toString('utf8') : msg

  if (wss) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message)
      }
    })
  }
}

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

const removeIpFromConnectedList = (ip: string) => {
  for (let i = connectedUsersIps.length - 1; i >= 0; i--) {
    if (connectedUsersIps[i] === ip) {
      connectedUsersIps.splice(i, 1)
    }
  }
}
