import fs from 'fs';
import path from 'path';
import aws, { S3 } from 'aws-sdk';

import uploadConfig from '@config/upload';

import InterfaceStorageProvider from '@shared/container/providers/StorageProvider/models/InterfaceStorageProvider';

export default class S3StorageProvider implements InterfaceStorageProvider {
    private client: S3;

    constructor() {
        this.client = new aws.S3({
            region: process.env.AWS_DEFAULT_REGION,
        });
    }

    public async saveFile(file: string): Promise<string> {
        const originalPath = path.resolve(uploadConfig.tmpFolder, file);

        const fileContent = await fs.promises.readFile(originalPath, {
            encoding: 'utf-8',
        });

        await this.client
            .putObject({
                Bucket: process.env.AWS_S3_BUCKET_NAME || 'gostack-codestack',
                Key: file,
                ACL: 'public-read',
                Body: fileContent,
            })
            .promise();

        return file;
    }

    public async deleteFile(file: string): Promise<void> {
        const filePath = path.resolve(uploadConfig.uploadsFolder, file);

        try {
            await fs.promises.stat(filePath);
        } catch {
            return;
        }

        await fs.promises.unlink(filePath);
    }
}
