import InterfaceHashProvider from '@modules/users/providers/HashProvider/models/InterfaceHashProvider';

export default class FakeHashProvider implements InterfaceHashProvider {
    public async generateHash(payload: string): Promise<string> {
        return payload;
    }

    public async compareHash(
        payload: string,
        hashed: string,
    ): Promise<boolean> {
        return payload === hashed;
    }
}
