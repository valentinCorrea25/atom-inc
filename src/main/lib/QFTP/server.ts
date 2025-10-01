import net, { Socket } from 'node:net'
import fs from 'node:fs'
import { sendAlertToClient } from '../..'

const DEFAULT_PORT = 9854 // ! this should be configurable

let fileMetaName: string
let fileMetaSize: number
let isWaitingData: boolean = false

let receivedBytes: number

let SAVE_FOLDER

let startTime = Date.now()
let writeStream: fs.WriteStream | null
let server: net.Server | null

export default function startServerForQFTP(saveFolder: string) {
  SAVE_FOLDER = saveFolder

  server = net.createServer((socket: Socket) => {
    socket.on('data', (data: Buffer) => {
      if (!isWaitingData) {
        setMetaData(data, socket)
      } else {
        readStreamRecived(data)
      }
    })
  })

  server.listen(DEFAULT_PORT, () => {
    console.log('Ready to connect QFTP. PORT: ' + DEFAULT_PORT)
  })

  return DEFAULT_PORT
}

function readStreamRecived(data: Buffer) {
  if (!writeStream) {
    receivedBytes = 0
    writeStream = fs.createWriteStream(`${SAVE_FOLDER}/${fileMetaName}`)
  }

  writeStream.write(data)
  receivedBytes += data.length

  const { speed, eta } = getProgress()
  console.log(`Velocidad: ${(speed / 1024).toFixed(2)} KB/s, ETA: ${eta.toFixed(1)}s`)

  if (receivedBytes >= fileMetaSize) {
    sendAlertToClient(`File: ${fileMetaName} recived succefully.\n\n Saved on ${SAVE_FOLDER}`)
    writeStream.end()
    server?.close()
    emptyMetaData()
  }
}

function setMetaData(data: Buffer, socket: Socket) {
  const request: any = JSON.parse(data.toString('utf8'))

  if (request.action == 'send') {
    fileMetaName = request.name
    fileMetaSize = request.size
    isWaitingData = true

    socket.write(
      JSON.stringify({
        action: 'recive',
        name: request.name,
        size: request.size
      })
    )
  }
}

function emptyMetaData() {
  console.log('disconnected server')
  writeStream = null
  server = null
  fileMetaName = ''
  fileMetaSize = 0
  isWaitingData = false
  receivedBytes = 0
  startTime = Date.now()
}

function getProgress() {
  const elapsed = (Date.now() - startTime) / 1000
  const speed = receivedBytes / elapsed
  const remaining = fileMetaSize - receivedBytes
  const eta = remaining / speed
  return { speed, eta }
}
