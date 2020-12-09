import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';

import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfileService: UpdateProfileService;

describe('UpdateProfile', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();

        updateProfileService = new UpdateProfileService(
            fakeUsersRepository,
            fakeHashProvider,
        );
    });

    it('Should be able to update profile', async () => {
        const user = await fakeUsersRepository.createAndSave({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        const updatedUser = await updateProfileService.execute({
            userId: user.id,
            name: 'John Three',
            email: 'johnthree@example.com',
        });

        expect(updatedUser.name).toBe('John Three');
        expect(updatedUser.email).toBe('johnthree@example.com');
    });

    it('Should not be able to update email to an already registered email', async () => {
        const user = await fakeUsersRepository.createAndSave({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        await fakeUsersRepository.createAndSave({
            name: 'Jane Doe',
            email: 'janedoe@example.com',
            password: '123456',
        });

        await expect(
            updateProfileService.execute({
                userId: user.id,
                name: 'John Three',
                email: 'janedoe@example.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('Should be able to update password', async () => {
        const user = await fakeUsersRepository.createAndSave({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        const updatedUser = await updateProfileService.execute({
            userId: user.id,
            name: 'John Three',
            email: 'johnthree@example.com',
            oldPassword: '123456',
            password: '654321',
        });

        expect(updatedUser.password).toBe('654321');
    });

    it('Should not be able to update password when old password was not provided ', async () => {
        const user = await fakeUsersRepository.createAndSave({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        await expect(
            updateProfileService.execute({
                userId: user.id,
                name: 'John Three',
                email: 'johnthree@example.com',
                password: '654321',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('Should not be able to update password when old password is wrong ', async () => {
        const user = await fakeUsersRepository.createAndSave({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        await expect(
            updateProfileService.execute({
                userId: user.id,
                name: 'John Three',
                email: 'johnthree@example.com',
                oldPassword: 'wrong-old-password',
                password: '654321',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
