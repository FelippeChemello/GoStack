import UserToken from '@modules/users/infra/typeorm/entities/UserToken';

export default interface InterfaceUserTokensRepository {
    generate(userId: string): Promise<UserToken>;
    findUserByToken(token: string): Promise<UserToken | undefined>;
}
