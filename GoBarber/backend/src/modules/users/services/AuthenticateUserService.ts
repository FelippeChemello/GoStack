import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import AppError from '@shared/errors/AppError';

import InterfaceUsersRepository from '@modules/users/repositories/InterfaceUsersRepository';

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

export default class AuthenticateUserService {
    constructor(private usersRepository: InterfaceUsersRepository) {}

    public async execute({
        email,
        password,
    }: InterfaceRequestDTO): Promise<InterfaceResponseDTO> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('Incorrect email/password combination', 401);
        }

        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            throw new AppError('Incorrect email/password combination', 401);
        }

        const { secret, expiresIn } = authConfig.jwt;

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
