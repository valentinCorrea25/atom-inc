import React from 'react'
import { Button } from '../ui/common'
import { Cross1Icon as X, GearIcon as Settings } from '@radix-ui/react-icons'

interface SettingsHeaderProps {
  onClose: () => void
}

const SettingsHeader: React.FC<SettingsHeaderProps> = ({ onClose }) => {
  return (
    <div className="flex items-center justify-between p-6 border-b border-[#333333]">
      <div className="flex items-center gap-3">
        <Settings className="w-5 h-5 text-[#10b981]" />
        <h2 className="text-xl font-semibold text-white">Configuraciones</h2>
      </div>
      <Button variant="ghost" size="icon" onClick={onClose}>
        <X className="w-4 h-4" />
      </Button>
    </div>
  )
}

export default SettingsHeader
