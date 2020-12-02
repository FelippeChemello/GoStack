import path from 'path';
import fs from 'fs';

import AppError from '@shared/errors/AppError';

import InterfaceUsersRepository from '@modules/users/repositories/InterfaceUsersRepository';

import uploadCOnfig from '@config/upload';
import User from '@modules/users/infra/typeorm/entities/User';

interface InterfaceRequestDTO {
    user_id: string;
    avatarFileName: string;
}

class UpdateUserAvatarService {
    constructor(private usersRepository: InterfaceUsersRepository) {}

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
            const userAvatarFilePath = path.join(
                uploadCOnfig.directory,
                user.avatar,
            );

            const userAvatarFileExists = await fs.promises.stat(
                userAvatarFilePath,
            );

            if (userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = avatarFileName;

        await this.usersRepository.save(user);

        return user;
    }
}

export default UpdateUserAvatarService;
