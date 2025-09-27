const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('websocket', {
  hostServer: (port:number) => ipcRenderer.invoke('websocket:startServer', port),
  stopServer: () => ipcRenderer.invoke('websocket:stopServer'),
})

contextBridge.exposeInMainWorld('client', {
  getIp: () => ipcRenderer.invoke('client:getIp'),
  selectFile:() => ipcRenderer.invoke('client:selectFile'),
  startDowloadFileFromUser:(ip:string) => ipcRenderer.invoke('client:startDowloadFileFromUser', ip)
})
