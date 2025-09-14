import React from 'react'
import { Input, Switcher, Card, CardHeader, CardTitle, CardContent, Radio } from '../ui/common'

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

interface SettingsInitialConfigProps {
  config: UserConfig
  updateConfig: (updates: Partial<UserConfig>) => void
}

const SettingsInitialConfig: React.FC<SettingsInitialConfigProps> = ({ config, updateConfig }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Initial configurations</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-white">Open on startup</label>
            <p className="text-xs text-[#888888]">
              Automatically open the application when the operating system starts
            </p>
          </div>
          <Switcher
            checked={config.openOnStartup}
            onCheckedChange={(value) => updateConfig({ openOnStartup: value })}
          />
        </div>

        {/* Connect on startup */}
        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-white">
              Connect on app startup?
            </label>
            <p className="text-xs text-[#888888]">
              Automatically connect when the application opens
            </p>
          </div>
          <Switcher
            checked={config.connectOnStartup}
            onCheckedChange={(value) => updateConfig({ connectOnStartup: value })}
          />
        </div>

        {config.connectOnStartup && (
          <div className="ml-4 pl-4 border-l-2 border-[var(--border-color)] space-y-4">
            {/* Auto connect to IP or start as server */}
            <div className="space-y-3">
              <Radio
                id="connectToIP"
                name="startupMode"
                checked={config.autoConnectToIP}
                onChange={() => {
                  updateConfig({ autoConnectToIP: true, startAsServer: false })
                }}
                label="Start by connecting to IP"
              />

              {config.autoConnectToIP && (
                <div className="flex items-center gap-2 ml-6">
                  <Input
                    placeholder="192.168.1.x"
                    value={config.autoConnectIP}
                    onChange={(e) => updateConfig({ autoConnectIP: e.target.value })}
                  />
                  <span className="text-gray-500">:</span>
                  <Input
                    placeholder="9853"
                    value={config.autoConnectPort}
                    onChange={(e) => updateConfig({ autoConnectPort: e.target.value })}
                    className="!w-1/3"
                  />
                </div>
              )}

              <Radio
                id="startAsServer"
                name="startupMode"
                checked={config.startAsServer}
                onChange={() => {
                  updateConfig({ startAsServer: true, autoConnectToIP: false })
                }}
                label="Start as server"
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default SettingsInitialConfig
