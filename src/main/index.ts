import { app, shell, BrowserWindow, ipcMain, nativeImage } from 'electron'
import { Menu, Tray } from 'electron/main'
import path, { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
//@ts-expect-error
import icon from '../../resources/icon.png'
import { getServerIpAddress, hostServer, stopServer } from './lib/websocket'
import { startQFTPprocess, startSendFileToUserQFTP } from './lib/QFTP/qftp'
import { selectFile } from './lib/utils'
import { toggleAutoStart } from './lib/configs/configs'
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true'

let mainWindow: BrowserWindow
let tray: Tray

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 730,
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

  // mainWindow.on('close', (event) => {
  //   event.preventDefault()
  //   mainWindow.hide()
  // })

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

  ipcMain.handle('config:toggleAutoStart', (_, enable: boolean) => toggleAutoStart(enable))

  //qftp
  ipcMain.handle('client:startDowloadFileFromUser', () => startQFTPprocess())
  ipcMain.handle('client:startSendFileToUser', (_, path: string, to: string) =>
    startSendFileToUserQFTP(path, to)
  )
  ipcMain.handle('client:selectFile', selectFile)

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  const iconPath = path.resolve(__dirname, '../../resources/icon.png');
  const logo = nativeImage.createFromPath(iconPath).resize({ width: 20, height: 20, quality: 'best' });

  tray = new Tray(logo)
  tray.setToolTip('Atom Inc')

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Open App',
      click: () => {
        const wins = BrowserWindow.getAllWindows()
        if (wins.length === 0) {
          createWindow()
        } else {
          wins[0].focus()
        }
      }
    },
    { role: 'quit', click: () => {app.quit()} }
  ])

  tray.setContextMenu(contextMenu)

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
})

function handleStartServer(port: number) {
  return hostServer(port)
}

function handleStopServer() {
  return stopServer()
}

export function sendAlertToClient(message: string) {
  mainWindow.webContents.send('alert', { message })
}
