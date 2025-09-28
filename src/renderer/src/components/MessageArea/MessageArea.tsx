import { useContext } from 'react'
import { ClientContext } from '@renderer/context/ClientContext'
import Message from './Message'
import LoadingState from './MessageAreaLoading'
import DisconnectedState from './MessageAreaDisconnected'
import DragOverlay from './MessageAreaDragOverlay'

const MessageArea = ({
  isDragging,
  handleDragOver,
  handleDragLeave,
  handleDrop,
  messages,
  messagesEndRef
}) => {
  //@ts-expect-error
  const { isConnectedToServer, loading, startDowloadFileFromUser:handleStartDownload, clientIp } = useContext(ClientContext)

  // Determinar qué contenido mostrar
  const renderContent = () => {
    if (loading) {
      return <LoadingState />
    }

    if (!isConnectedToServer) {
      return <DisconnectedState />
    }

    return (
      <>
        {messages.map((message) => (
          <Message 
            key={message.id} 
            message={message} 
            handleStartDownload={handleStartDownload}
            fromCurrenUser={clientIp == message.userIp}
          />
        ))}
        <div ref={messagesEndRef} />
      </>
    )
  }

  return (
    <div
      className={`flex-1 overflow-y-auto p-4 space-y-4 ${
        isDragging ? 'border-2 border-dashed border-white' : ''
      }`}
      style={{ backgroundColor: isDragging ? 'rgb(51, 51, 51)' : 'transparent' }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {isDragging && <DragOverlay />}
      {renderContent()}
    </div>
  )
}

export default MessageArea
