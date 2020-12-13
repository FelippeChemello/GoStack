import { injectable, inject } from 'tsyringe';

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

            console.log('Buscando...');

            await this.cacheProvider.save(`providers-list:${userId}`, users);
        }

        return users;
    }
}

export default ListProvidersService;
