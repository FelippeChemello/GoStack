import { uuid } from 'uuidv4';

import InterfaceUserTokensRepository from '@modules/users/repositories/InterfaceUserTokensRepository';

import UserToken from '@modules/users/infra/typeorm/entities/UserToken';

class FakeUserTokensRepository implements InterfaceUserTokensRepository {
    private userTokens: UserToken[] = [];

    public async generate(userId: string): Promise<UserToken> {
        const userToken = new UserToken();

        Object.assign(userToken, { id: uuid(), token: uuid(), userId });

        this.userTokens.push(userToken);

        return userToken;
    }

    public async findUserByToken(
        token: string,
    ): Promise<UserToken | undefined> {
        const userToken = this.userTokens.find(
            findToken => findToken.token === token,
        );

        return userToken;
    }
}

export default FakeUserTokensRepository;
