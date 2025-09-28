import { dialog } from "electron"
import fs from 'fs'
import { MetaDataFile } from "../../types"
import path from "path"

export async function selectFile(){
    const result = await dialog.showOpenDialog({ properties: ['openFile'] })
    if (result.canceled || result.filePaths.length === 0) return null
  
    const filePath = result.filePaths[0]
    const stats = fs.statSync(filePath)
  
    const meta: MetaDataFile = {
      name: path.basename(filePath),
      path: filePath,
      size: stats.size
    }
  
    return meta
}

