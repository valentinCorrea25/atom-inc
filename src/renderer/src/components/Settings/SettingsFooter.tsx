import React from 'react'
import { Button } from '../ui/common'

interface SettingsFooterProps {
  onCancel: () => void
  onSave: () => void
}

const SettingsFooter: React.FC<SettingsFooterProps> = ({ onCancel, onSave }) => {
  return (
    <div className="flex items-center justify-end gap-3 p-6 border-t border-[#333333]">
      <Button variant="outline" onClick={onCancel}>
        Close
      </Button>
      <Button variant="primary" onClick={onSave}>
        Save configurations
      </Button>
    </div>
  )
}

export default SettingsFooter
