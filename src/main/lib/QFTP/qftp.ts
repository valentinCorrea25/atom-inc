import startServerForQFTP from './server.js'
import startClientForQFTP from './client.js';
import path from 'path';
import os from 'os';


//## QFTP STANDS FOR Quick File Trasnfer Protocol ## ## ##



let SAVE_FOLDER; //! this should be configurable

if (os.platform() === 'win32') {
    SAVE_FOLDER = path.join(os.homedir(), 'Downloads');
} else {
    SAVE_FOLDER = path.join(os.homedir(), 'Downloads');
}


// export function qftpStart(isSender: boolean) {
//   if (isSender) {
//     startServerForQFTP(SAVE_FOLDER, fileData)
//   } else {
//     clientMode(fileData, filePath)
//   }
// }

export async function startQFTPprocess(saveFolder?:string){
    return startServerForQFTP(saveFolder || SAVE_FOLDER);
}

export async function startSendFileToUserQFTP(path: string, to:string){
    return startClientForQFTP(path, to);
}


