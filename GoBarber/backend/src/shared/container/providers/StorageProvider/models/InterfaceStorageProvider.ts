export default interface InterfaceStorageProvider {
    saveFile(file: string): Promise<string>;
    deleteFile(file: string): Promise<void>;
}
