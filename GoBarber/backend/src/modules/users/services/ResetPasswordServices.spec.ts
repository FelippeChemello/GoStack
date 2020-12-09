import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository';

import ResetPasswordService from '@modules/users/services/ResetPasswordServices';

import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPassword: ResetPasswordService;

describe('ResetPasswordService', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeUserTokensRepository = new FakeUserTokensRepository();

        resetPassword = new ResetPasswordService(
            fakeUsersRepository,
            fakeUserTokensRepository,
        );
    });

    it('Should be able to reset the password', async () => {
        const user = await fakeUsersRepository.createAndSave({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        const { token } = await fakeUserTokensRepository.generate(user.id);

        await resetPassword.execute({
            token,
            password: '654321',
        });

        const updatedUser = await fakeUsersRepository.findById(user.id);

        expect(updatedUser?.password).toBe('654321');
    });
});
