import logo from '../../assets/atom.svg'
import { Button } from '@radix-ui/themes';
import { Cross1Icon as X, GearIcon } from '@radix-ui/react-icons'
import { useState } from 'react'
import SettingsModal from '../Settings/SettingsModal'

const AsideHeader = ({ setIsSidebarCollapsed }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  return (
    <div
      className="p-4 border-b flex items-center justify-between border-[var(--border-color)]"
    >
      <div className="flex items-center gap-3 flex-1">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-lg border-[var(--border-color)]"
        >
          <img src={logo} />
        </div>
        <div className="flex-1">
          <h2 className="font-semibold text-lg leading-tight">Atom inc</h2>
          <p className="text-xs leading-tight font-mono" >
            inter network communication
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button onClick={() => setIsSettingsOpen(true)} variant="ghost" className='cursor-pointer'>
          <GearIcon className="w-5 h-5" />
        </Button>
        <Button onClick={() => setIsSidebarCollapsed(true)} variant="ghost" className="md:hidden">
          <X className="w-4 h-4" />
        </Button>
      </div>
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  )
}

export default AsideHeader;
