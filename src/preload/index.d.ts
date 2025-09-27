import { ElectronAPI } from '@electron-toolkit/preload'
import { MetaDataFile } from 'src/types'

declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown
    websocket: {
      hostServer: (port: number) => Promise<string>
      stopServer: () => Promise<void>
    }
    client: {
      connectToServer: () => () => Promise<string>
      disconnectFromSever: () => Promise<void>
      getIp: () => Promise<string>
      sendMessage: (message) => () => void
      startDowloadFileFromUser: () => Promise<string>
      selectFile: () => Promise<MetaDataFile>
    }
  }
}
