import { useState, useContext } from 'react'
import { ClientContext } from '@renderer/context/ClientContext'
import { getFromLocalStorage, setToLocalStorage } from '@renderer/lib/utils'

interface UserConfig {
  // Initial configurations
  openOnStartup: boolean
  connectOnStartup: boolean
  autoConnectToIP: boolean
  autoConnectIP: string
  autoConnectPort: string
  startAsServer: boolean

  // Personalization
  deviceName: string
  deviceColor: string
}

export const useConfigUser = () => {
  const [config, setConfig] = useState<UserConfig>({
    openOnStartup: false,
    connectOnStartup: false,
    autoConnectToIP: false,
    autoConnectIP: '',
    autoConnectPort: '9853',
    startAsServer: false,
    deviceName: 'Device',
    deviceColor: '#ffffff'
  })

  const clientContext = useContext(ClientContext)

  //! Refactorizar todo a aun archivo configurable y no asi de tosco

  // const example = {
  //   localstorageRoute: 'setting-asdasd',
  //   value: ''
  // }

  const loadConfig = () => {
    const openOnStartup = getFromLocalStorage('settings-openOnStartup') === 'true'
    const connectOnStartup = getFromLocalStorage('settings-connectOnStartup') === 'true'
    const startAsServer = getFromLocalStorage('settings-startAsServer') === 'true'

    const autoConnectToIP = startAsServer
      ? false
      : getFromLocalStorage('settings-autoConnectToIP') !== 'false'

    const loadedConfig: UserConfig = {
      openOnStartup,
      connectOnStartup,
      autoConnectToIP,
      autoConnectIP: getFromLocalStorage('settings-autoConnectIP') || '',
      autoConnectPort: getFromLocalStorage('settings-autoConnectPort') || '9853',
      startAsServer,
      deviceName: getFromLocalStorage('name') || 'Device',
      deviceColor: getFromLocalStorage('color') || '#ffffff'
    }

    setConfig(loadedConfig)
    return loadedConfig
  }

  const saveConfig = (newConfig: UserConfig) => {
    let configToSave = { ...newConfig }

    if (configToSave.startAsServer) {
      configToSave.autoConnectToIP = false
    } else if (configToSave.autoConnectToIP) {
      configToSave.startAsServer = false
    }

    window.config.toggleAutoStart(configToSave.openOnStartup)
    setToLocalStorage('settings-openOnStartup', configToSave.openOnStartup.toString())
    setToLocalStorage('settings-connectOnStartup', configToSave.connectOnStartup.toString())
    setToLocalStorage('settings-autoConnectToIP', configToSave.autoConnectToIP.toString())

    if (configToSave.autoConnectToIP) {
      setToLocalStorage('settings-autoConnectIP', configToSave.autoConnectIP)
      setToLocalStorage('settings-autoConnectPort', configToSave.autoConnectPort)
    } else {
      setToLocalStorage('settings-autoConnectIP', '')
      setToLocalStorage('settings-autoConnectPort', '9853')
    }

    setToLocalStorage('settings-startAsServer', configToSave.startAsServer.toString())

    setToLocalStorage('name', configToSave.deviceName)
    setToLocalStorage('color', configToSave.deviceColor)

    if (clientContext?.setClientName) {
      clientContext.setClientName(configToSave.deviceName)
    }
    if (clientContext?.setClientColor) {
      clientContext.setClientColor(configToSave.deviceColor)
    }

    setConfig(configToSave)
  }

  const updateConfig = (updates: Partial<UserConfig>) => {
    const newConfig = { ...config, ...updates }
    setConfig(newConfig)
    return newConfig
  }

  return {
    config,
    loadConfig,
    saveConfig,
    updateConfig
  }
}
