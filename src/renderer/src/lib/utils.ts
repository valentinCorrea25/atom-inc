export const getContrastTextColor = (backgroundColor: string) => {
  // Convert hex to RGB
  const hex = backgroundColor.replace('#', '')
  const r = Number.parseInt(hex.substr(0, 2), 16)
  const g = Number.parseInt(hex.substr(2, 2), 16)
  const b = Number.parseInt(hex.substr(4, 2), 16)

  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255

  // Return black for light backgrounds, white for dark backgrounds
  return luminance > 0.5 ? '#000000' : '#ffffff'
}

export const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export const formatTime = (date: Date) => {
  return date?.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

export function getFromLocalStorage(key: string) {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(key)
    if (data) {
      try {
        return JSON.parse(data)
      } catch (error) {
        return data
      }
    }
  }
  return null
}

export function setToLocalStorage(key: string, value: any) {
  if (typeof window !== 'undefined') {
    window?.localStorage?.setItem(key, JSON.stringify(value))
  }
}
