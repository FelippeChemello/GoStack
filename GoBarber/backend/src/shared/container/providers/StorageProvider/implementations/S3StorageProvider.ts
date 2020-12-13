import fs from 'fs';
import path from 'path';
import aws, { S3 } from 'aws-sdk';
import mime from 'mime';

import uploadConfig from '@config/upload';

import InterfaceStorageProvider from '@shared/container/providers/StorageProvider/models/InterfaceStorageProvider';
import AppError from '@shared/errors/AppError';

export default class S3StorageProvider implements InterfaceStorageProvider {
    private client: S3;

    constructor() {
        this.client = new aws.S3({
            region: process.env.AWS_DEFAULT_REGION,
        });
    }

    public async saveFile(file: string): Promise<string> {
        const originalPath = path.resolve(uploadConfig.tmpFolder, file);

        const fileContent = await fs.promises.readFile(originalPath);

        const contentType = mime.getType(originalPath);

        if (!contentType) {
            throw new AppError('File not found');
        }

        await this.client
            .putObject({
                Bucket: process.env.AWS_S3_BUCKET_NAME || 'gostack-codestack',
                Key: file,
                ACL: 'public-read',
                Body: fileContent,
                ContentType: contentType,
            })
            .promise();

        await fs.promises.unlink(originalPath);

        return file;
    }

    public async deleteFile(file: string): Promise<void> {
        await this.client
            .deleteObject({
                Bucket: process.env.AWS_S3_BUCKET_NAME || 'gostack-codestack',
                Key: file,
            })
            .promise();
    }
}
