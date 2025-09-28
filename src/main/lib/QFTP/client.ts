import net from 'node:net'
import fs from 'node:fs'
import path from 'node:path'

let client: net.Socket

let isWaitingToSend = false
let metaName: string
let metaSize: number
let metaPath: string

export default async function startClientForQFTP(path: string, to: string) {
  const completeHost = to.split(':')
  const host = completeHost[0]
  const port = completeHost[1]

  if (!host || !port) return


  try {
    client = net.createConnection({ port: parseInt(port), host: host }, () => {
      console.log('sending meta')
      sendFileMetadata(path)
    })
    console.log(client);
    

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

async function sendFileMetadata(pathFile: string) {
  try {
    const stats = await fs.promises.stat(pathFile)
    const fileName = path.basename(pathFile)

    metaName = fileName
    metaSize = stats.size
    metaPath = pathFile
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
    const readStream = fs.createReadStream(metaPath)
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
