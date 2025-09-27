import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
//@ts-expect-error
import icon from '../../resources/icon.png'
import { getServerIpAddress, hostServer, stopServer } from './lib/websocket'
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true'


function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    minWidth: 400,
    minHeight: 650,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      webSecurity: false,
      additionalArguments: ['--disable-web-security']
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')
  ipcMain.handle('websocket:startServer', (_, port) => handleStartServer(port))
  ipcMain.handle('websocket:stopServer', handleStopServer)
  ipcMain.handle('client:getIp', getServerIpAddress)

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

function handleStartServer(port:number) {
  return hostServer(port)
}

function handleStopServer() {
  return stopServer()
}
