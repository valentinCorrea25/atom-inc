import './assets/main.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ChatApp from './ChatApp'
import { HostContextProvider } from './context/HostContext'
import { ClientContextProvider } from './context/ClientContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClientContextProvider>
      <HostContextProvider>
        <ChatApp />
      </HostContextProvider>
    </ClientContextProvider>
  </StrictMode>
)
