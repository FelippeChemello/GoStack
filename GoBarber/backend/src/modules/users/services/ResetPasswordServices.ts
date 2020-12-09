import { inject, injectable } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';

import AppError from '@shared/errors/AppError';

import InterfaceUsersRepository from '@modules/users/repositories/InterfaceUsersRepository';
import InterfaceUserTokensRepository from '@modules/users/repositories/InterfaceUserTokensRepository';
import InterfaceHashProvider from '@modules/users/providers/HashProvider/models/InterfaceHashProvider';

interface InterfaceRequestDTO {
    password: string;
    token: string;
}

@injectable()
export default class ResetPasswordService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: InterfaceUsersRepository,

        @inject('UserTokensRepository')
        private userTokensRepository: InterfaceUserTokensRepository,

        @inject('HashProvider')
        private hashProvider: InterfaceHashProvider,
    ) {}

    public async execute({
        password,
        token,
    }: InterfaceRequestDTO): Promise<void> {
        const userToken = await this.userTokensRepository.findUserByToken(
            token,
        );

        if (!userToken) {
            throw new AppError('Token does not exists');
        }

        const user = await this.usersRepository.findById(userToken?.userId);

        if (!user) {
            throw new AppError('User does not exists');
        }

        if (isAfter(Date.now(), addHours(userToken.createdAt, 2))) {
            throw new AppError('Token is not valid');
        }

        user.password = await this.hashProvider.generateHash(password);

        await this.usersRepository.save(user);
    }
}
