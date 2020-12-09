import { getRepository, Repository } from 'typeorm';

import InterfaceUserTokensRepository from '@modules/users/repositories/InterfaceUserTokensRepository';

import UserToken from '@modules/users/infra/typeorm/entities/UserToken';

class UserTokensRepository implements InterfaceUserTokensRepository {
    private ormRepository: Repository<UserToken>;

    constructor() {
        this.ormRepository = getRepository(UserToken);
    }

    public async findUserByToken(
        token: string,
    ): Promise<UserToken | undefined> {
        const userToken = await this.ormRepository.findOne({
            where: { token },
        });

        return userToken;
    }

    public async generate(userId: string): Promise<UserToken> {
        const userToken = this.ormRepository.create({ userId });

        await this.ormRepository.save(userToken);

        return userToken;
    }
}

export default UserTokensRepository;
