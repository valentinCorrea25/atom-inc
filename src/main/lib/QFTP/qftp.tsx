// import serverMode from './server.js'
// import clientMode from './client.js'

// const os = require('os');
// const path = require('path');

// let SAVE_FOLDER; //! this should be configurable

// if (os.platform() === 'win32') {
//     SAVE_FOLDER = path.join(os.homedir(), 'Downloads');
// } else {
//     SAVE_FOLDER = path.join(os.homedir(), 'Downloads');
// }

// // -- * Si descargo el archivo, soy server * --  //
// //! Que necesito para descargar un archivo?
// //    - Ruta donde guardar el archivo
// //    - La metadata del archivo
// //    - Abrir puerto para comunicación (PORT DEFAULT + 1 hasta que abra) 


// //! Que necesito para permitir que otros descarguen?
// //    - dar ubicación y info del archivo
// //    - conectarse al puerto de comunicación


// export function qftpStart(isSender: boolean) {
//   if (isSender) {
//     serverMode(SAVE_FOLDER, fileData)
//   } else {
//     clientMode(fileData, filePath)
//   }
// }


