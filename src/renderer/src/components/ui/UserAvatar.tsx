
import {getContrastTextColor } from '../../lib/utils'

const UserAvatar = ({ userName, userColor }) => (
  <div
    className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-medium"
    style={{
      backgroundColor: userColor,
      color: getContrastTextColor(userColor)
    }}
  >
    {userName.charAt(0).toUpperCase()}
  </div>
)

export default UserAvatar