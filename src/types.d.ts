type MessageType = 'message' | 'file' | 'system' | 'transfer'

export type Message = {
  type: MessageType
  id: string
  userIp: string
  userName: string
  userColor: string
  content: string
  timestamp: Date

  // files
  to?: string
  filePath?: string
  fileName?: string
  fileSize?: string
}

export type MetaDataFile = {
  name: string
  path: string
  size: number
  from?: string
}
