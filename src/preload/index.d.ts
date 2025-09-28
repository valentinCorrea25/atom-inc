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
      startSendFileToUser: (path: string, to:string) => Promise<void>
      selectFile: () => Promise<MetaDataFile>
    }
    main: {
      onAlert: (callback: (message: string) => void) => void
    }
    config: {
      toggleAutoStart: (enable:boolean) => void;
    }
  }
}
