import { uuid } from 'uuidv4';

import InterfaceUsersRepository from '@modules/users/repositories/InterfaceUsersRepository';
import InterfaceCreateUserDTO from '@modules/users/dtos/InterfaceCreateUserDTO';

import User from '@modules/users/infra/typeorm/entities/User';

class UsersRepository implements InterfaceUsersRepository {
    private users: User[] = [];

    public async findById(id: string): Promise<User | undefined> {
        const findUser = this.users.find(user => user.id === id);

        return findUser;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const findUser = this.users.find(user => user.email === email);

        return findUser;
    }

    public async createAndSave({
        name,
        email,
        password,
    }: InterfaceCreateUserDTO): Promise<User> {
        const user = new User();

        Object.assign(user, { id: uuid(), name, email, password });

        this.users.push(user);

        return user;
    }

    public async save(user: User): Promise<User> {
        const findIndex = this.users.findIndex(
            findUser => user.id === findUser.id,
        );

        this.users[findIndex] = user;

        return user;
    }
}

export default UsersRepository;
