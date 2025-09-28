import UserAvatar from '@renderer/components/ui/UserAvatar'
import { MessageHeader } from '../Message'
import { Message } from 'src/types'

const TextMessage = ({ message }: { message: Message }) => {
  const {userColor, userName, timestamp, content, userIp} = message

  return (
    <>
      <UserAvatar userName={userName} userColor={userColor} />
      <div className="flex-1">
        <MessageHeader userName={userName} userColor={userColor} timestamp={timestamp} userIp={userIp} />
        <p className="text-sm text-gray-100 break-words">{content}</p>
      </div>
    </>
  )
}

export default TextMessage
