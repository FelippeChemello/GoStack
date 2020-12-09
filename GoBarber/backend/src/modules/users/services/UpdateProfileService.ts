import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import InterfaceUsersRepository from '@modules/users/repositories/InterfaceUsersRepository';
import InterfaceHashProvider from '@modules/users/providers/HashProvider/models/InterfaceHashProvider';

import User from '@modules/users/infra/typeorm/entities/User';

interface InterfaceRequestDTO {
    userId: string;
    name: string;
    email: string;
    oldPassword?: string;
    password?: string;
}

@injectable()
class UpdateProfileService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: InterfaceUsersRepository,

        @inject('HashProvider')
        private hashProvider: InterfaceHashProvider,
    ) {}

    public async execute({
        userId,
        name,
        email,
        password,
        oldPassword,
    }: InterfaceRequestDTO): Promise<User> {
        const user = await this.usersRepository.findById(userId);

        if (!user) {
            throw new AppError('User not found');
        }

        const userWithRequestedEmail = await this.usersRepository.findByEmail(
            email,
        );

        if (userWithRequestedEmail && userWithRequestedEmail.id !== userId) {
            throw new AppError('E-mail already in use');
        }

        user.name = name;
        user.email = email;

        if (password && !oldPassword) {
            throw new AppError('Old password not provided');
        }

        if (password && oldPassword) {
            const checkOldPassword = await this.hashProvider.compareHash(
                oldPassword,
                user.password,
            );

            if (!checkOldPassword) {
                throw new AppError('Old password does not match');
            }

            user.password = await this.hashProvider.generateHash(password);
        }

        return this.usersRepository.save(user);
    }
}

export default UpdateProfileService;
