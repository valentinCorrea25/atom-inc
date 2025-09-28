'use client'
import type React from 'react'
import { useState, useRef, useEffect, useContext } from 'react'
import Aside from './components/Aside/Aside'
import MessageArea from './components/MessageArea/MessageArea'
import MessageAreaHeader from './components/MessageAreaHeader'
import ChatInput from './components/ChatInput'
import { ClientContext } from './context/ClientContext'

export default function ChatApp() {
  const [newMessage, setNewMessage] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { sendMessageToServer, messages, sendFileToServer }: any = useContext(ClientContext)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      await sendMessageToServer(newMessage)
      setNewMessage('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0]
  //   if (file) {
  //       // await sendFileToServer(file);
  //       setNewMessage('');
  //   }
  // }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      //! por el momento
      // await sendFileToServer(files[0]);
    } 
  }

  return (
    <main className="h-screen text-white flex bg-[var(--bg-d-color)]">
      <Aside
        isSidebarCollapsed={isSidebarCollapsed}
        setIsSidebarCollapsed={setIsSidebarCollapsed}
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
          sendFileToServer={sendFileToServer}
          handleSendMessage={handleSendMessage}
        />
      </div>
    </main>
  )
}
