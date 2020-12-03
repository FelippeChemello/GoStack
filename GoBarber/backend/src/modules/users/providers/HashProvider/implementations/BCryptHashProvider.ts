import { hash, compare } from 'bcryptjs';

import InterfaceHashProvider from '@modules/users/providers/HashProvider/models/InterfaceHashProvider';

export default class BCryptHashProvider implements InterfaceHashProvider {
    public async generateHash(payload: string): Promise<string> {
        return hash(payload, 8);
    }

    public async compareHash(
        payload: string,
        hashed: string,
    ): Promise<boolean> {
        return compare(payload, hashed);
    }
}
