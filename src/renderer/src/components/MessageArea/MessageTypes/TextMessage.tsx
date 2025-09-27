import UserAvatar from "@renderer/components/ui/UserAvatar"
import { MessageHeader } from "../Message"

const TextMessage = ({ content, userName, userColor, timestamp }) => (
    <>
      <UserAvatar userName={userName} userColor={userColor} />
      <div className="flex-1">
        <MessageHeader userName={userName} userColor={userColor} timestamp={timestamp} />
        <p className="text-sm text-gray-100 break-words">{content}</p>
      </div>
    </>
  )

  export default TextMessage