import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import InterfaceUsersRepository from '@modules/users/repositories/InterfaceUsersRepository';
import InterfaceStorageProvider from '@shared/container/providers/StorageProvider/models/InterfaceStorageProvider';

import uploadCOnfig from '@config/upload';
import User from '@modules/users/infra/typeorm/entities/User';

interface InterfaceRequestDTO {
    user_id: string;
    avatarFileName: string;
}

@injectable()
class UpdateUserAvatarService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: InterfaceUsersRepository,

        @inject('StorageProvider')
        private storageProvider: InterfaceStorageProvider,
    ) {}

    public async execute({
        user_id,
        avatarFileName,
    }: InterfaceRequestDTO): Promise<User> {
        const user = await this.usersRepository.findById(user_id);

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

        return user;
    }
}

export default UpdateUserAvatarService;
