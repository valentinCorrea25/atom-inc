const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('websocket', {
  hostServer: (port:number) => ipcRenderer.invoke('websocket:startServer', port),
  stopServer: () => ipcRenderer.invoke('websocket:stopServer'),
})

contextBridge.exposeInMainWorld('client', {
  getIp: () => ipcRenderer.invoke('client:getIp'),
  selectFile:() => ipcRenderer.invoke('client:selectFile'),
  startDowloadFileFromUser:() => ipcRenderer.invoke('client:startDowloadFileFromUser'),
  startSendFileToUser:(path: string, to:string) => ipcRenderer.invoke('client:startSendFileToUser', path, to)
})


contextBridge.exposeInMainWorld("main", {
  onAlert: (callback) => ipcRenderer.on("alert", (_, data) => callback(data))
})
