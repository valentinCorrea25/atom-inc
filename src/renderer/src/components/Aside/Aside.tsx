// import { Badge } from '../ui/CustomComponents'
// import { Component2Icon as Wifi, Cross1Icon as X } from '@radix-ui/react-icons'
import AsideHeader from './AsideHeader'
import AsideConnectionComponent from './AsideConnectionComponent'
import { Input } from '../ui/common'
import { useContext } from 'react'
import { ClientContext } from '@renderer/context/ClientContext'
import { setToLocalStorage } from '@renderer/lib/utils'

const Aside = ({ isSidebarCollapsed, setIsSidebarCollapsed }: any) => {
  return (
    <aside
      className={`${isSidebarCollapsed ? 'w-0 overflow-hidden md:w-80 md:overflow-visible' : 'w-80'} transition-all duration-300 border-r flex flex-col  absolute md:static z-20 h-full`}
      style={{ backgroundColor: 'rgb(51, 51, 51)', borderColor: 'rgb(102, 102, 102)' }}
    >
      <AsideHeader setIsSidebarCollapsed={setIsSidebarCollapsed} />
      <AsideConnectionComponent />
      <ColorPicker />
      {/* <ConnectedUser users={users} /> */}
    </aside>
  )
}

export default Aside

const ColorPicker = () => {
  const { clientName, clientColor, setClientName, setClientColor }: any = useContext(ClientContext)

  return (
    <div className="p-4 border-b " style={{ borderColor: 'rgb(102, 102, 102)' }}>
      <div className="mb-4 space-y-4">
        <label className="text-sm mb-2 block" style={{ color: 'rgb(153, 153, 153)' }}>
          Nombre del dispositivo:
        </label>
        <Input
          placeholder="Device Name"
          value={clientName}
          onChange={(e) => {
            setClientName(e.target.value)
            setToLocalStorage('name', e.target.value)
          }}
        />

        <label className="text-sm mb-2 block" style={{ color: 'rgb(153, 153, 153)' }}>
          Mi color:
        </label>
        <input
          type="color"
          value={clientColor}
          onChange={(e) => {
            setClientColor(e.target.value)
            setToLocalStorage('color', e.target.value)
          }}
          className="w-12 h-8 border rounded cursor-pointer"
          style={{ borderColor: 'rgb(102, 102, 102)' }}
        />
      </div>
    </div>
  )
}

// const ConnectedUser = ({ users }) => {
//   return (
//     <div className="flex-1 overflow-y-auto p-4">
//       <h3 className="text-sm mb-3" style={{ color: 'rgb(153, 153, 153)' }}>
//         Usuarios conectados ({users.filter((u) => u.isOnline).length})
//       </h3>
//       <div className="space-y-3">
//         {users.map((user) => (
//           <div
//             key={user.id}
//             className="flex items-center gap-3 p-5 py-4 rounded-lg"
//             style={{ backgroundColor: 'rgb(26, 26, 26)' }}
//           >
//             <div className="w-3 h-3 rounded-full" style={{ backgroundColor: user.color }} />
//             <div className="flex-1 min-w-0">
//               <div className="flex items-center gap-2">
//                 <span className="text-sm font-medium truncate">{user.name}</span>
//                 {user.isOnline && <Wifi className="w-3 h-3 text-green-400" />}
//               </div>
//               <span className="text-xs" style={{ color: 'rgb(153, 153, 153)' }}>
//                 {user.ip}
//               </span>
//             </div>
//             <Badge variant={user.isOnline ? 'default' : 'secondary'} className="text-xs">
//               {user.isOnline ? 'En línea' : 'Desconectado'}
//             </Badge>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }
