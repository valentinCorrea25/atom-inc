import { app } from 'electron'
import path from 'path'

export function toggleAutoStart(enable) {
  const appFolder = path.dirname(process.execPath)
  const appName = path.basename(process.execPath)
  const stubLauncher = path.resolve(appFolder, '..', appName)

  app.setLoginItemSettings({
    openAtLogin: enable,
    path: stubLauncher,
    args: ['--hidden'],
    enabled: enable
  })
}
