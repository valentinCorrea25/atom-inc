import React from 'react'
import { Input, Card, CardHeader, CardTitle, CardContent } from '../ui/common'

interface UserConfig {
  openOnStartup: boolean
  connectOnStartup: boolean
  autoConnectToIP: boolean
  autoConnectIP: string
  autoConnectPort: string
  startAsServer: boolean
  deviceName: string
  deviceColor: string
}

interface SettingsPersonalizationProps {
  config: UserConfig
  updateConfig: (updates: Partial<UserConfig>) => void
}

const SettingsPersonalization: React.FC<SettingsPersonalizationProps> = ({ config, updateConfig }) => {
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateConfig({ deviceColor: e.target.value })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Personalización</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Device Name */}
        <div>
          <label className="text-sm font-medium text-white mb-2 block">
            Nombre del dispositivo
          </label>
          <Input
            placeholder="Mi Dispositivo"
            value={config.deviceName}
            onChange={(e) => updateConfig({ deviceName: e.target.value })}
          />
        </div>

        {/* Device Color */}
        <div>
          <label className="text-sm font-medium text-white mb-2 block">
            Color del dispositivo
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={config.deviceColor}
              onChange={handleColorChange}
              className="w-12 h-10 rounded border border-[#333333] bg-[#222222] cursor-pointer"
            />
            <Input
              value={config.deviceColor}
              onChange={(e) => updateConfig({ deviceColor: e.target.value })}
              placeholder="#ffffff"
              className="flex-1"
            />
          </div>
          <div
            className="mt-2 w-full h-8 rounded border border-[#333333]"
            style={{ backgroundColor: config.deviceColor }}
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default SettingsPersonalization
