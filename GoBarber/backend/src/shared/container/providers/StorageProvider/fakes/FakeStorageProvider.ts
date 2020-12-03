import InterfaceStorageProvider from '@shared/container/providers/StorageProvider/models/InterfaceStorageProvider';

export default class FakeStorageProvider implements InterfaceStorageProvider {
    private storage: string[] = [];

    public async saveFile(file: string): Promise<string> {
        this.storage.push(file);

        return file;
    }

    public async deleteFile(file: string): Promise<void> {
        const findIndex = this.storage.findIndex(
            storageFile => storageFile === file,
        );

        this.storage.splice(findIndex, 1);
    }
}
