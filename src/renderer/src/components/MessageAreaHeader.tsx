import { Button } from './ui/CustomComponents';
import {
  HamburgerMenuIcon as Menu,
  
} from '@radix-ui/react-icons'

const MessageAreaHeader = ({setIsSidebarCollapsed, isSidebarCollapsed}) => {
    return (
       <div
          className="p-4 border-b flex items-center justify-between"
          style={{ backgroundColor: 'rgb(51, 51, 51)', borderColor: 'rgb(102, 102, 102)' }}
        >
          <div className="flex items-center gap-5">
            <Button
              onClick={() => setIsSidebarCollapsed(false)}
              variant="ghost"
              className={`${isSidebarCollapsed ? 'block' : 'hidden'} md:hidden`}
            >
              <Menu className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-lg font-semibold">Chat</h1>
              {/* <p className="text-sm" style={{ color: 'rgb(153, 153, 153)' }}>
                {users.filter((u) => u.isOnline).length} usuarios conectados
              </p> */}
            </div>
          </div>
        </div>
    );
}

export default MessageAreaHeader;
