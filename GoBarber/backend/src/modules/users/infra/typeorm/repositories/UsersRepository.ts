import { getRepository, Repository } from 'typeorm';

import InterfaceUsersRepository from '@modules/users/repositories/InterfaceUsersRepository';
import InterfaceCreateUserDTO from '@modules/users/dtos/InterfaceCreateUserDTO';

import User from '@modules/users/infra/typeorm/entities/User';

class UsersRepository implements InterfaceUsersRepository {
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = getRepository(User);
    }

    public async findById(id: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne(id);

        return user;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne({ where: { email } });

        return user;
    }

    public async createAndSave({
        name,
        email,
        password,
    }: InterfaceCreateUserDTO): Promise<User> {
        const user = this.ormRepository.create({
            name,
            email,
            password,
        });

        await this.ormRepository.save(user);

        return user;
    }

    public async save(user: User): Promise<User> {
        await this.ormRepository.save(user);

        return user;
    }
}

export default UsersRepository;
