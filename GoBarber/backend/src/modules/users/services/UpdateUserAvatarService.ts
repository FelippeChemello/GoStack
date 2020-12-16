import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import InterfaceUsersRepository from '@modules/users/repositories/InterfaceUsersRepository';
import InterfaceStorageProvider from '@shared/container/providers/StorageProvider/models/InterfaceStorageProvider';
import InterfaceCacheProvider from '@shared/container/providers/CacheProvider/models/InterfaceCacheProvider';

import User from '@modules/users/infra/typeorm/entities/User';

interface InterfaceRequestDTO {
    userId: string;
    avatarFileName: string;
}

@injectable()
class UpdateUserAvatarService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: InterfaceUsersRepository,

        @inject('StorageProvider')
        private storageProvider: InterfaceStorageProvider,

        @inject('CacheProvider')
        private cacheProvider: InterfaceCacheProvider,
    ) {}

    public async execute({
        userId,
        avatarFileName,
    }: InterfaceRequestDTO): Promise<User> {
        const user = await this.usersRepository.findById(userId);

        if (!user) {
            throw new AppError(
                'Only authenticated users can change avatar',
                401,
            );
        }

        if (user.avatar) {
            await this.storageProvider.deleteFile(user.avatar);
        }

        const filename = await this.storageProvider.saveFile(avatarFileName);

        user.avatar = filename;

        await this.usersRepository.save(user);

        await this.cacheProvider.invalidatePrefix('providers-list');

        return user;
    }
}

export default UpdateUserAvatarService;
