import { formatTime } from '../../lib/utils'
import SystemMessage from './MessageTypes/SystemMessage'
import TextMessage from './MessageTypes/TextMessage'
import FileMessage from './MessageTypes/FileMessage'
import { Message as MessageType } from 'src/types'

const Message = ({ message, handleStartDownload } : {message:MessageType, handleStartDownload?:any}) => {
  const messageComponents = {
    system: () => <SystemMessage content={message.content} />,
    text: () => (
      <TextMessage
        content={message.content}
        userName={message.userName}
        userColor={message.userColor}
        timestamp={message.timestamp}
      />
    ),
    file: () => (
      <FileMessage
        message={message}
        handleStartDownload={handleStartDownload}
      />
    )
  }

  const MessageComponent = messageComponents[message.type] || messageComponents.text

  return (
    <div key={message.id} className="flex gap-3">
      <MessageComponent />
    </div>
  )
}

export const MessageHeader = ({ userName, userColor, timestamp }) => (
  <div className="flex items-center gap-2 mb-1">
    <span className="font-medium text-sm" style={{ color: userColor }}>
      {userName}
    </span>
    <span className="text-xs" style={{ color: 'rgb(153, 153, 153)' }}>
      {formatTime(new Date(timestamp))}
    </span>
  </div>
)

export default Message
