import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import InterfaceUsersRepository from '@modules/users/repositories/InterfaceUsersRepository';
import InterfaceUserTokensRepository from '@modules/users/repositories/InterfaceUserTokensRepository';

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
    ) {}

    public async execute({
        password,
        token,
    }: InterfaceRequestDTO): Promise<void> {
        const userToken = await this.userTokensRepository.findUserByToken(
            token,
        );

        if (!userToken) {
            throw new AppError('Token is not valid');
        }

        const user = await this.usersRepository.findById(userToken?.userId);

        if (!user) {
            throw new AppError('User does not exists');
        }

        user.password = password;

        await this.usersRepository.save(user);
    }
}
