import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';

import AppError from '@shared/errors/AppError';

describe('SendForgotPasswordEmail', () => {
    it('Should be able to recover password using email', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeMailProvider = new FakeMailProvider();

        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

        const user = await fakeUsersRepository.createAndSave({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        await new SendForgotPasswordEmailService(
            fakeUsersRepository,
            fakeMailProvider,
        ).execute({
            email: 'johndoe@example.com',
        });

        expect(sendMail).toHaveBeenCalled();
    });
});
