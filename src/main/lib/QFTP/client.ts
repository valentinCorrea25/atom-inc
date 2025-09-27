import net from 'node:net'
import fs from 'node:fs'
import path from 'node:path'

const FILE_PATH = '/home/vale/Work/DoorDoorESP.nes'
const DEFAULT_PORT = 9854;
let client: net.Socket

let isWaitingToSend = false
let metaName: string
let metaSize: number

export default async function clientMode(fileData: any, filePath: string, port:number, host:string) {
  try {
    client = net.createConnection({ port: port, host: host }, () => {
      console.log('sending meta')
      sendFileMetadata()
    })

    client.on('data', (data) => {
      if (isWaitingToSend && isVerifiedFile(data)) {
        sendFile()
      } else {
        sendError()
      }
    })

    client.on('end', () => {
      console.log('client disconnected')
    })

    client.on('error', (err) => {
      console.log('client error:', err.message)
    })
  } catch (error) {
    console.log('Client could not connect', error)
  }
}

async function sendFileMetadata() {
  try {
    const stats = await fs.promises.stat(FILE_PATH)
    const fileName = path.basename(FILE_PATH)

    metaName = fileName
    metaSize = stats.size
    isWaitingToSend = true

    const metadata = {
      name: fileName,
      size: stats.size,
      action: 'send'
    }

    client.write(JSON.stringify(metadata) + '\n')
  } catch (err) {
    console.log('Error:', err)
  }
}

async function sendFile() {
  try {
    const readStream = fs.createReadStream(FILE_PATH)
    readStream.pipe(client)

    readStream.on('end', () => {
      console.log('File sent')
      client.end()
    })
  } catch (err) {
    console.log('Error:', err)
  }
}

function isVerifiedFile(data: Buffer) {
  const metadata = JSON.parse(data.toString('utf-8'))

  if (metadata.name != metaName) {
    return false
  }
  if (metadata.size != metaSize) {
    return false
  }

  return true
}

async function sendError() {
  try {
    const metadata = {
      name: '',
      size: 0,
      action: 'error'
    }

    client.write(JSON.stringify(metadata) + '\n')
  } catch (err) {
    console.log('Error:', err)
  }
}
