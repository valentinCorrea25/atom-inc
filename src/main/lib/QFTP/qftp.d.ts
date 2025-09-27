export type FileMetadata = {
    name: string;
    size: number,
    action: 'send' | 'recive' | 'error'
}