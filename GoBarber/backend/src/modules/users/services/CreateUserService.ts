import { hash } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import InterfaceUsersRepository from '@modules/users/repositories/InterfaceUsersRepository';

import User from '@modules/users/infra/typeorm/entities/User';

interface InterfaceRequestDTO {
    name: string;
    email: string;
    password: string;
}

@injectable()
export default class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: InterfaceUsersRepository,
    ) {}

    public async execute({
        name,
        email,
        password,
    }: InterfaceRequestDTO): Promise<User> {
        const checkUserExists = await this.usersRepository.findByEmail(email);

        if (checkUserExists) {
            throw new AppError('Email address already used');
        }

        const hashedPassword = await hash(password, 8);

        const user = this.usersRepository.createAndSave({
            name,
            email,
            password: hashedPassword,
        });

        return user;
    }
}
