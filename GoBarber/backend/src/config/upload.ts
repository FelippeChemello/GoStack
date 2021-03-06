import path from 'path';
import multer, { StorageEngine } from 'multer';
import crypto from 'crypto';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

interface InterfaceUploadConfig {
    driver: 's3' | 'disk';
    tmpFolder: string;
    uploadFolder: string;
    storage: StorageEngine;
}

export default {
    driver: process.env.STORAGE_DRIVER,
    tmpFolder,
    uploadsFolder: path.resolve(tmpFolder, 'uploads'),
    storage: multer.diskStorage({
        destination: tmpFolder,
        filename(request, file, callback) {
            const fileHash = crypto.randomBytes(10).toString('hex');
            const fileName = `${fileHash}-${file.originalname}`;

            return callback(null, fileName); // Primeiro parametro é o erro, caso ocorra e o segundo é o nome do arquivo
        },
    }),
};
