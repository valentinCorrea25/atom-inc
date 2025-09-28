import net from 'node:net'
import fs from 'node:fs'
import path from 'node:path'
import { MetaDataFile } from '../../../types'

let client: net.Socket

let isWaitingToSend = false
let metaName: string
let metaSize: number
let metaPath: string

export default async function startClientForQFTP(metaDataFile: MetaDataFile, to: string) {
  const completeHost = to.split(':')
  const host = completeHost[0]
  const port = completeHost[1]

  if (!host || !port) return

  console.log(host, port);
  

  try {
    client = net.createConnection({ port: parseInt(port), host: host }, () => {
      console.log('sending meta')
      sendFileMetadata(metaDataFile)
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

async function sendFileMetadata(metaDataFile: MetaDataFile) {
  try {
    const stats = await fs.promises.stat(metaDataFile.path)
    const fileName = path.basename(metaDataFile.path)

    metaName = fileName
    metaSize = stats.size
    metaPath = metaDataFile.path
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
