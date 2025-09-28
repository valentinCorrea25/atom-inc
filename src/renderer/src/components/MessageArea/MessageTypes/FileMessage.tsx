import UserAvatar from '@renderer/components/ui/UserAvatar'
import { MessageHeader } from '../Message'
import { Button, Card } from '@renderer/components/ui/common'
import { DownloadIcon, FileIcon as Paperclip } from '@radix-ui/react-icons'
import { formatFileSize } from '@renderer/lib/utils'
import { Message } from 'src/types'

type FileMessageProps = {
  message: Message
  handleStartDownload?: (MetaDataFile) => void
}

const FileMessage = ({ message, handleStartDownload }: FileMessageProps) => {
  const { userName, userColor, timestamp, fileSize, fileName, filePath, userIp } = message
  if (!fileName || !fileSize || !filePath) return

  return (
    <>
      <UserAvatar userName={userName} userColor={userColor} />
      <div className="flex-1">
        <MessageHeader userName={userName} userColor={userColor} timestamp={timestamp} />
        <Card className="p-3 max-w-sm border-[var(--border-color)] bg-[var(--bg-color)]">
          <div className="flex items-center gap-3">
            <Paperclip className="w-5 h-5" style={{ color: 'rgb(153, 153, 153)' }} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{fileName}</p>
              {fileSize && (
                <p className="text-xs" style={{ color: 'rgb(153, 153, 153)' }}>
                  {formatFileSize(Number(fileSize))}
                </p>
              )}
            </div>
            <Button
              variant="outline"
              className="hover:bg-opacity-20 bg-transparent"
              onClick={() =>
                handleStartDownload?.({
                  name: fileName,
                  path: filePath,
                  size: Number(fileSize),
                  from:  userIp
                })
              }
            >
              <DownloadIcon className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      </div>
    </>
  )
}

export default FileMessage
