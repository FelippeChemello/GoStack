import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import ListProvidersService from '@modules/appointments/services/ListProvidersService';

import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let listProvidersService: ListProvidersService;

describe('ListProviders', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();

        listProvidersService = new ListProvidersService(fakeUsersRepository);
    });

    it('Should be able to list providers', async () => {
        const user1 = await fakeUsersRepository.createAndSave({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        const user2 = await fakeUsersRepository.createAndSave({
            name: 'Jane Doe',
            email: 'janedoe@example.com',
            password: '654321',
        });

        const loggedUser = await fakeUsersRepository.createAndSave({
            name: 'Logged User',
            email: 'loggeduser@example.com',
            password: '123123',
        });

        const providers = await listProvidersService.execute({
            userId: loggedUser.id,
        });

        expect(providers).toEqual([user1, user2]);
    });

    // it('Should not be able to show the profile from non-existing user', async () => {
    //     await expect(
    //         listProvidersService.execute({
    //             userId: 'non-existing-user-id',
    //         }),
    //     ).rejects.toBeInstanceOf(AppError);
    // });
});
