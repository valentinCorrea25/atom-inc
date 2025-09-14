import { FileIcon as Paperclip, DownloadIcon as Download } from '@radix-ui/react-icons'
import { formatFileSize, formatTime, getContrastTextColor } from '../lib/utils'
import { Button, Card } from './ui/CustomComponents'
import { useContext } from 'react'
import { ClientContext } from '@renderer/context/ClientContext'
import Loader from './ui/loader'

const MessageArea = ({
  isDragging,
  handleDragOver,
  handleDragLeave,
  handleDrop,
  messages,
  messagesEndRef
}) => {
  const { isConnectedToServer, loading }: any = useContext(ClientContext)

  return (
    <div
      className={`flex-1 overflow-y-auto p-4 space-y-4 ${isDragging ? 'border-2 border-dashed border-white' : ''}`}
      style={{ backgroundColor: isDragging ? 'rgb(51, 51, 51)' : 'transparent' }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {isDragging && (
        <div
          className="absolute inset-0 flex items-center justify-center z-10"
          style={{ backgroundColor: 'rgba(26, 26, 26, 0.8)' }}
        >
          <div className="text-center">
            <Paperclip className="w-12 h-12 mx-auto mb-2" style={{ color: 'rgb(153, 153, 153)' }} />
            <p className="text-lg">Suelta el archivo aquí</p>
          </div>
        </div>
      )}

      {loading && (
        <div className="h-full flex items-center justify-center">
          <div className="text-center">
            <Loader />
            <p className="text-lg font-bold text-[#10b981]">Connecting to Server...</p>
          </div>
        </div>
      )}

      {!isConnectedToServer && !loading ? (
        <div className="h-full flex items-center justify-center">
          <div className="text-center">
            <WifiSVG />
            <p className="text-lg font-bold text-[#10b981]">
              Connect to a server to start communication
            </p>
          </div>
        </div>
      ) : (
        <>
          {messages.map((message) => (
            <div key={message.id} className="flex gap-3">
              {message.type !== 'system' && (
                <div
                  className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-medium"
                  style={{
                    backgroundColor: message.userColor,
                    color: getContrastTextColor(message.userColor)
                  }}
                >
                  {message.userName.charAt(0).toUpperCase()}
                </div>
              )}

              <div className={`flex-1 ${message.type === 'system' ? 'text-center' : ''}`}>
                {message.type !== 'system' && (
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm" style={{ color: message.userColor }}>
                      {message.userName}
                    </span>
                    <span className="text-xs" style={{ color: 'rgb(153, 153, 153)' }}>
                      {formatTime(new Date(message?.timestamp))}
                    </span>
                  </div>
                )}

                {message.type === 'system' ? (
                  <p className="text-sm italic" style={{ color: 'rgb(153, 153, 153)' }}>
                    {message.content}
                  </p>
                ) : message.type === 'file' ? (
                  <Card
                    className="p-3 max-w-sm border-[var(--border-color)] bg-[var(--bg-color)]"
                  >
                    <div className="flex items-center gap-3">
                      <Paperclip className="w-5 h-5" style={{ color: 'rgb(153, 153, 153)' }} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{message.fileName}</p>
                        <p className="text-xs" style={{ color: 'rgb(153, 153, 153)' }}>
                          {message.fileSize && formatFileSize(message.fileSize)}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        className="hover:bg-opacity-20 bg-transparent"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                ) : (
                  <p className="text-sm text-gray-100 break-words">{message.content}</p>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </>
      )}
    </div>
  )
}

export default MessageArea

const WifiSVG = () => {
  return (
    <svg
      className="w-16 h-16 mx-auto mb-4 text-[#10b981]"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z"
      />
    </svg>
  )
}
