import { MetaDataFile } from "../types"

const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('websocket', {
  hostServer: (port:number) => ipcRenderer.invoke('websocket:startServer', port),
  stopServer: () => ipcRenderer.invoke('websocket:stopServer'),
})

contextBridge.exposeInMainWorld('client', {
  getIp: () => ipcRenderer.invoke('client:getIp'),
  selectFile:() => ipcRenderer.invoke('client:selectFile'),
  startDowloadFileFromUser:() => ipcRenderer.invoke('client:startDowloadFileFromUser'),
  startSendFileToUser:(metaDataFile: MetaDataFile, to:string) => ipcRenderer.invoke('client:startSendFileToUser', metaDataFile, to)
})
