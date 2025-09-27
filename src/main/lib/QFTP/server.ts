import net, { Socket } from 'node:net';
import fs from 'node:fs'

const DEFAULT_PORT = 9854; //! this should be configurable 

let fileMetaName: string;
let fileMetaSize: number;
let isWaitingData: boolean = false

let writeStream: fs.WriteStream;
let receivedBytes: number;

let SAVE_FOLDER;

export default function serverMode(saveFolder: string) {
    SAVE_FOLDER = saveFolder
    
    const server = net.createServer((socket: Socket) => {
        socket.on("data", (data: Buffer) => {
            if (!isWaitingData) {
                setMetaData(data, socket)
            } else {
                readStreamRecived(data)
            }
        });
    });

    server.listen(DEFAULT_PORT, () => {
        console.log("Ready to connect. PORT: " + DEFAULT_PORT);
    });
}

function readStreamRecived(data: Buffer) {
    if (!writeStream) {
        receivedBytes = 0
        writeStream = fs.createWriteStream(`${SAVE_FOLDER}/${fileMetaName}`);
    }

    writeStream.write(data);
    receivedBytes += data.length;
    if (receivedBytes >= fileMetaSize) {
        writeStream.end();
        emptyMetaData();
    }
}

function setMetaData(data: Buffer, socket: Socket) {
    const request: FileMetadata = JSON.parse(data.toString('utf8'));

    if (request.action == 'send') {
        fileMetaName = request.name;
        fileMetaSize = request.size;
        isWaitingData = true

        socket.write(JSON.stringify({
            action: 'recive',
            name: request.name,
            size: request.size
        }));
    }
}

function emptyMetaData() {
    fileMetaName = '';
    fileMetaSize = 0;
    isWaitingData = false
}