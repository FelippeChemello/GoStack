import InterfaceCreateUserDTO from '@modules/users/dtos/InterfaceCreateUserDTO';

import User from '@modules/users/infra/typeorm/entities/User';
import InterfaceFindAllProvidersDTO from '@modules/users/dtos/InterfaceFindAllProvidersDTO';

export default interface InterfaceUsersRepository {
    findById(id: string): Promise<User | undefined>;
    findByEmail(email: string): Promise<User | undefined>;
    findAllProvider(data?: InterfaceFindAllProvidersDTO): Promise<User[]>;
    createAndSave(data: InterfaceCreateUserDTO): Promise<User>;
    save(user: User): Promise<User>;
}
