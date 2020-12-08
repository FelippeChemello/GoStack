import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import CreateUserService from '@modules/users/services/CreateUserService';

import AppError from '@shared/errors/AppError';

describe('AuthenticateUser', () => {
    it('Should be able to authenticate', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        const user = await new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        ).execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        const response = await new AuthenticateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        ).execute({
            email: 'johndoe@example.com',
            password: '123456',
        });

        expect(response).toHaveProperty('token');
        expect(response.user).toBe(user);
    });

    it('Should not be able to authenticate due user does not exist', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        await expect(
            new AuthenticateUserService(
                fakeUsersRepository,
                fakeHashProvider,
            ).execute({
                email: 'johndoe@example.com',
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('Should not be able to authenticate due password is incorrect', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        await new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        ).execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        await expect(
            new AuthenticateUserService(
                fakeUsersRepository,
                fakeHashProvider,
            ).execute({
                email: 'johndoe@example.com',
                password: '654321',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
