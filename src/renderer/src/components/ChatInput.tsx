import { useContext } from 'react'
import { Input } from './ui/common'
import { Button } from './ui/CustomComponents'
import { PaperPlaneIcon as Send, FileIcon as Paperclip } from '@radix-ui/react-icons'
import { ClientContext } from '@renderer/context/ClientContext'

const ChatInput = ({
  newMessage,
  setNewMessage,
  handleKeyPress,
  sendFileToServer,
  handleSendMessage
}) => {
  const { isConnectedToServer }: any = useContext(ClientContext)

  return (
    <div className="p-4 border-t border-[var(--border-color)] bg-[var(--bg-color)]">
      <div className="flex gap-2">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          disabled={!isConnectedToServer}
          onKeyPress={handleKeyPress}
          placeholder="Write you message..."
          className="flex-1 text-white border-[var(--border-color)] bg-[var(--bg-d-color)]"
          maxLength={500}
        />
        {/* <input ref={fileInputRef} type="file" onChange={sendFileToServer} className="hidden" /> */}
        <Button
          onClick={async () => await sendFileToServer()}
          variant="outline"
          disabled={!isConnectedToServer}
          style={{ borderColor: 'rgb(102, 102, 102)', backgroundColor: 'rgb(102, 102, 102)' }}
          className="hover:bg-gray-200 px-4 rounded-md bg-white cursor-pointer hover:opacity-70"
        >
          <Paperclip className="w-4 h-4" />
        </Button>
        <Button
          onClick={handleSendMessage}
          disabled={!newMessage.trim() || !isConnectedToServer}
          style={{
            backgroundColor: !newMessage.trim() ? 'rgb(102, 102, 102)' : 'white',
            color: !newMessage.trim() ? 'rgb(153, 153, 153)' : 'black'
          }}
          className="hover:bg-gray-200 px-4 rounded-md cursor-pointer hover:opacity-70"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
      <div
        className="flex justify-end items-center mt-2 text-xs"
        style={{ color: 'rgb(153, 153, 153)' }}
      >
        <span>{newMessage.length}/500</span>
      </div>
    </div>
  )
}

export default ChatInput
