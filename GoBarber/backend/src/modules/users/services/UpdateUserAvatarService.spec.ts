import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatarService: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeStorageProvider = new FakeStorageProvider();

        updateUserAvatarService = new UpdateUserAvatarService(
            fakeUsersRepository,
            fakeStorageProvider,
        );
    });

    it('Should be able to update user avatar', async () => {
        const user = await fakeUsersRepository.createAndSave({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        await updateUserAvatarService.execute({
            userId: user.id,
            avatarFileName: 'avatar.jpg',
        });

        expect(user.avatar).toBe('avatar.jpg');
    });

    it('Should not be able to update user avatar when user does not exists', async () => {
        await expect(
            updateUserAvatarService.execute({
                userId: 'invalid-user-id',
                avatarFileName: 'avatar.jpg',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('Should delete old avatar when updating new one', async () => {
        const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

        const user = await fakeUsersRepository.createAndSave({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        await updateUserAvatarService.execute({
            userId: user.id,
            avatarFileName: 'avatar.jpg',
        });

        await updateUserAvatarService.execute({
            userId: user.id,
            avatarFileName: 'new-avatar.jpg',
        });

        expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');

        expect(user.avatar).toBe('new-avatar.jpg');
    });
});
