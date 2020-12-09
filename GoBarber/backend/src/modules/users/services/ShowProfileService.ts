import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import InterfaceUsersRepository from '@modules/users/repositories/InterfaceUsersRepository';

import User from '@modules/users/infra/typeorm/entities/User';

interface InterfaceRequestDTO {
    userId: string;
}

@injectable()
class ShowProfileService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: InterfaceUsersRepository,
    ) {}

    public async execute({ userId }: InterfaceRequestDTO): Promise<User> {
        const user = await this.usersRepository.findById(userId);

        if (!user) {
            throw new AppError('User not found');
        }

        return user;
    }
}

export default ShowProfileService;
