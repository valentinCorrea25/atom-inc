import startServerForQFTP from './server.js'
import clientMode from './client.js'
import { getServerIpAddress } from '../websocket.js';

//## QFTP STANDS FOR Quick File Trasnfer Protocol ## ## ##

const os = require('os');
const path = require('path');

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

export async function startQFTPprocess(ip:string, saveFolder?:string){
    //! step 1 -> create the server
    return startServerForQFTP(saveFolder || SAVE_FOLDER, ip);
    //! step 2 --> contact device via the chat (web socket) on the client side

}


