import { injectable, inject } from 'tsyringe';
import { classToClass } from 'class-transformer';

import InterfaceUsersRepository from '@modules/users/repositories/InterfaceUsersRepository';
import InterfaceCacheProvider from '@shared/container/providers/CacheProvider/models/InterfaceCacheProvider';

import User from '@modules/users/infra/typeorm/entities/User';

interface InterfaceRequestDTO {
    userId: string;
}

@injectable()
class ListProvidersService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: InterfaceUsersRepository,

        @inject('CacheProvider')
        private cacheProvider: InterfaceCacheProvider,
    ) {}

    public async execute({ userId }: InterfaceRequestDTO): Promise<User[]> {
        let users = await this.cacheProvider.recover<User[]>(
            `providers-list:${userId}`,
        );

        if (!users) {
            users = await this.usersRepository.findAllProvider({
                exceptUserId: userId,
            });

            await this.cacheProvider.save(
                `providers-list:${userId}`,
                classToClass(users),
            );
        }

        return users;
    }
}

export default ListProvidersService;
