const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('websocket', {
  hostServer: (port:number) => ipcRenderer.invoke('websocket:startServer', port),
  stopServer: () => ipcRenderer.invoke('websocket:stopServer'),
})

contextBridge.exposeInMainWorld('client', {
  // connectToServer: () => ipcRenderer.invoke('client:connectToServer'),
  // disconnectFromSever: () => ipcRenderer.invoke('client:disconnectFromSever'),
  getIp: () => ipcRenderer.invoke('client:getIp'),
  // sendMessage: (message) => ipcRenderer.send('message', message),
})
