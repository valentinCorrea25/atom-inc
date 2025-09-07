import logo from '../../assets/atom.svg'
import { Button } from '@radix-ui/themes';
import { Cross1Icon as X } from '@radix-ui/react-icons'

const AsideHeader = ({ setIsSidebarCollapsed }) => {
  return (
    <div
      className="p-4 border-b flex items-center justify-between"
      style={{ borderColor: 'rgb(102, 102, 102)' }}
    >
      <div className="flex items-center gap-3 flex-1">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-lg"
          style={{ backgroundColor: 'rgb(102, 102, 102)' }}
        >
          <img src={logo} />
        </div>
        <div className="flex-1">
          <h2 className="font-semibold text-lg leading-tight">Atom inc</h2>
          <p className="text-xs leading-tight" style={{ color: 'rgb(153, 153, 153)' }}>
            inter network communication
          </p>
        </div>
      </div>
      <Button onClick={() => setIsSidebarCollapsed(true)} variant="ghost" className="md:hidden">
        <X className="w-4 h-4" />
      </Button>
    </div>
  )
}

export default AsideHeader;
