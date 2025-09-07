import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown
    websocket: {
      hostServer: () => Promise<string>
      stopServer: () => Promise<void>
    }
    client: {
      connectToServer: () => () => Promise<string>
      disconnectFromSever: () => Promise<void>
      getIp: () => Promise<string>
      sendMessage: (message) => () => void
    }
  }
}
