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
    autoConnectToIP: true,
    autoConnectIP: '',
    autoConnectPort: '9853',
    startAsServer: false,
    deviceName: 'Device',
    deviceColor: '#ffffff'
  })

  const clientContext = useContext(ClientContext)

  const loadConfig = () => {
    const loadedConfig: UserConfig = {
      openOnStartup: getFromLocalStorage('settings-openOnStartup') === 'true',
      connectOnStartup: getFromLocalStorage('settings-connectOnStartup') === 'true',
      autoConnectToIP: getFromLocalStorage('settings-autoConnectToIP') !== 'false',
      autoConnectIP: getFromLocalStorage('settings-autoConnectIP') || '',
      autoConnectPort: getFromLocalStorage('settings-autoConnectPort') || '9853',
      startAsServer: getFromLocalStorage('settings-startAsServer') === 'true',
      deviceName: getFromLocalStorage('name') || 'Device',
      deviceColor: getFromLocalStorage('color') || '#ffffff'
    }
    
    setConfig(loadedConfig)
    return loadedConfig
  }

  const saveConfig = (newConfig: UserConfig) => {
    // Save initial configurations
    setToLocalStorage('settings-openOnStartup', newConfig.openOnStartup.toString())
    setToLocalStorage('settings-connectOnStartup', newConfig.connectOnStartup.toString())
    setToLocalStorage('settings-autoConnectToIP', newConfig.autoConnectToIP.toString())
    setToLocalStorage('settings-autoConnectIP', newConfig.autoConnectIP)
    setToLocalStorage('settings-autoConnectPort', newConfig.autoConnectPort)
    setToLocalStorage('settings-startAsServer', newConfig.startAsServer.toString())

    // Save personalization settings
    setToLocalStorage('name', newConfig.deviceName)
    setToLocalStorage('color', newConfig.deviceColor)

    // Update context if available
    if (clientContext?.setClientName) {
      clientContext.setClientName(newConfig.deviceName)
    }
    if (clientContext?.setClientColor) {
      clientContext.setClientColor(newConfig.deviceColor)
    }

    setConfig(newConfig)
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
