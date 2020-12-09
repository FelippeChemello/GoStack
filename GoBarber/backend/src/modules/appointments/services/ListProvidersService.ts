import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import InterfaceUsersRepository from '@modules/users/repositories/InterfaceUsersRepository';

import User from '@modules/users/infra/typeorm/entities/User';

interface InterfaceRequestDTO {
    userId: string;
}

@injectable()
class ListProvidersService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: InterfaceUsersRepository,
    ) {}

    public async execute({ userId }: InterfaceRequestDTO): Promise<User[]> {
        const users = await this.usersRepository.findAllProvider({
            exceptUserId: userId,
        });

        return users;
    }
}

export default ListProvidersService;
