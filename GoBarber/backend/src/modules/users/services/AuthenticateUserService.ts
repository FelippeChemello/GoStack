import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import InterfaceUsersRepository from '@modules/users/repositories/InterfaceUsersRepository';
import InterfaceHashProvider from '@modules/users/providers/HashProvider/models/InterfaceHashProvider';

import authConfig from '@config/auth';
import User from '@modules/users/infra/typeorm/entities/User';

interface InterfaceRequestDTO {
    email: string;
    password: string;
}

interface InterfaceResponseDTO {
    user: User;
    token: string;
}

@injectable()
export default class AuthenticateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: InterfaceUsersRepository,

        @inject('HashProvider')
        private hashProvider: InterfaceHashProvider,
    ) {}

    public async execute({
        email,
        password,
    }: InterfaceRequestDTO): Promise<InterfaceResponseDTO> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('Incorrect email/password combination', 401);
        }

        const passwordMatched = await this.hashProvider.compareHash(
            password,
            user.password,
        );

        if (!passwordMatched) {
            throw new AppError('Incorrect email/password combination', 401);
        }

        const { secret, expiresIn } = authConfig.jwt;
        if (!secret) {
            throw new AppError('Error at creating token');
        }

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn,
        });

        return {
            user,
            token,
        };
    }
}
