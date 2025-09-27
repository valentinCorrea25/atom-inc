type MessageType = 'message' | 'file' | 'system' | 'transfer'

export type Message = {
  type: MessageType
  id: string
  userId: string
  userName: string
  userColor: string
  content: string
  timestamp: Date
}
