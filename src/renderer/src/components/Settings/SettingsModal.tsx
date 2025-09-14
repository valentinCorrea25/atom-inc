import React, { useEffect } from 'react'
import { useConfigUser } from '../../hooks/useConfigUser'
import SettingsHeader from './SettingsHeader'
import SettingsInitialConfig from './SettingsInitialConfig'
import SettingsPersonalization from './SettingsPersonalization'
import SettingsFooter from './SettingsFooter'

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { config, loadConfig, saveConfig, updateConfig } = useConfigUser()

  useEffect(() => {
    if (isOpen) {
      loadConfig()
    }
  }, [isOpen])

  const handleSave = () => {
    saveConfig(config)
    onClose()
  }

  if (!isOpen) return null

  console.log(config);
  

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="border-[var(--border-color)] bg-[var(--bg-color)] rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <SettingsHeader onClose={onClose} />

        <div className="p-6 space-y-6">
          <SettingsInitialConfig config={config} updateConfig={updateConfig} />
          <SettingsPersonalization config={config} updateConfig={updateConfig} />
        </div>

        <SettingsFooter onCancel={onClose} onSave={handleSave} />
      </div>
    </div>
  )
}

export default SettingsModal
