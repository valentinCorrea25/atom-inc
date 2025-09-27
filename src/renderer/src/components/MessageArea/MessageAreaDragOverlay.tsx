import { FileIcon as Paperclip, DownloadIcon } from '@radix-ui/react-icons'


const DragOverlay = () => (
    <div
      className="absolute inset-0 flex items-center justify-center z-10"
      style={{ backgroundColor: 'rgba(26, 26, 26, 0.8)' }}
    >
      <div className="text-center">
        <Paperclip className="w-12 h-12 mx-auto mb-2" style={{ color: 'rgb(153, 153, 153)' }} />
        <p className="text-lg">Suelta el archivo aquí</p>
      </div>
    </div>
  )


  export default DragOverlay