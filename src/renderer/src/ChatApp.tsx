'use client'
import type React from 'react'
import { useState, useRef, useEffect, useContext } from 'react'
import Aside from './components/Aside/Aside'
import MessageArea from './components/MessageArea'
import MessageAreaHeader from './components/MessageAreaHeader'
import ChatInput from './components/ChatInput'
import { Message, User } from './env'
import { ClientContext } from './context/ClientContext'



export default function ChatApp() {
  const [currentUser, setCurrentUser] = useState<User>({
    id: 'user1',
    name: 'Mi Usuario',
    ip: '192.168.1.100',
    color: '#000000',
    isOnline: true
  })

  const [users, setUsers] = useState<User[]>([
    { id: 'user1', name: 'Mi Usuario', ip: '192.168.1.100', color: '#000000', isOnline: true },
    { id: 'user2', name: 'Juan PC', ip: '192.168.1.101', color: '#22c55e', isOnline: true },
    { id: 'user3', name: 'Maria Laptop', ip: '192.168.1.102', color: '#ec4899', isOnline: false },
    { id: 'user4', name: 'Carlos Desktop', ip: '192.168.1.103', color: '#eab308', isOnline: true }
  ])

  const [newMessage, setNewMessage] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { sendMessageToServer, setMessages, messages }: any = useContext(ClientContext)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      await sendMessageToServer(newMessage)
      // setMessages([...messages, message])
      setNewMessage('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const message: Message = {
        id: Date.now().toString(),
        userId: currentUser.id,
        userName: currentUser.name,
        userColor: currentUser.color,
        content: `Archivo compartido: ${file.name}`,
        timestamp: new Date(),
        type: 'file',
        fileName: file.name,
        fileSize: file.size
      }
      setMessages([...messages, message])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      const file = files[0]
      const message: Message = {
        id: Date.now().toString(),
        userId: currentUser.id,
        userName: currentUser.name,
        userColor: currentUser.color,
        content: `Archivo compartido: ${file.name}`,
        timestamp: new Date(),
        type: 'file',
        fileName: file.name,
        fileSize: file.size
      }
      setMessages([...messages, message])
    }
  }

  const updateUserColor = (color: string) => {
    setCurrentUser({ ...currentUser, color })
    setUsers(users.map((user) => (user.id === currentUser.id ? { ...user, color } : user)))
  }

  return (
    <main className="h-screen text-white flex bg-[var(--bg-d-color)]">
      <Aside
        users={users}
        isSidebarCollapsed={isSidebarCollapsed}
        setIsSidebarCollapsed={setIsSidebarCollapsed}
        currentUser={currentUser}
        updateUserColor={updateUserColor}
      />

      {!isSidebarCollapsed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={() => setIsSidebarCollapsed(true)}
        />
      )}

      <div className="flex-1 flex flex-col">
        <MessageAreaHeader
          setIsSidebarCollapsed={setIsSidebarCollapsed}
          isSidebarCollapsed={isSidebarCollapsed}
        />

        <MessageArea
          isDragging={isDragging}
          handleDragOver={handleDragOver}
          handleDragLeave={handleDragLeave}
          handleDrop={handleDrop}
          messages={messages}
          messagesEndRef={messagesEndRef}
        />

        <ChatInput
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          handleKeyPress={handleKeyPress}
          handleFileSelect={handleFileSelect}
          fileInputRef={fileInputRef}
          handleSendMessage={handleSendMessage}
        />
      </div>
    </main>
  )
}
