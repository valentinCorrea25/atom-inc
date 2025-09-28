import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
//@ts-expect-error
import icon from '../../resources/icon.png'
import { getServerIpAddress, hostServer, stopServer } from './lib/websocket'
import { startQFTPprocess, startSendFileToUserQFTP } from './lib/QFTP/qftp'
import { selectFile } from './lib/utils'
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true'


let mainWindow: BrowserWindow;
function createWindow(): void {
  mainWindow = new BrowserWindow({
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

  //qftp
  ipcMain.handle('client:startDowloadFileFromUser', () => startQFTPprocess())
  ipcMain.handle('client:startSendFileToUser', (_, path: string, to:string) => startSendFileToUserQFTP(path, to))
  ipcMain.handle('client:selectFile', selectFile)

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

function handleStartServer(port: number) {
  return hostServer(port)
}

function handleStopServer() {
  return stopServer()
}

export function sendAlertToClient(message:string){
  mainWindow.webContents.send("alert", { message })
}

// ipcMain.handle('select-file', async (): Promise<MetaDataFile | null> => {
//   const result = await dialog.showOpenDialog({ properties: ['openFile'] })
//   if (result.canceled || result.filePaths.length === 0) return null

//   const filePath = result.filePaths[0]
//   const stats = fs.statSync(filePath)

//   const meta: metaDataFile = {
//     name: path.basename(filePath),
//     path: filePath,
//     size: stats.size
//   }

//   return meta
// })
