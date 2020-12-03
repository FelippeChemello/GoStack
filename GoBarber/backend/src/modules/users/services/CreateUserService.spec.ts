import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import CreateUserService from '@modules/users/services/CreateUserService';

import AppError from '@shared/errors/AppError';

describe('CreateUser', () => {
    it('Should be able to create a new user', async () => {
        const fakeAppointmentsRepository = new FakeUsersRepository();

        const createAppointment = new CreateUserService(
            fakeAppointmentsRepository,
        );

        const appointment = await createAppointment.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        expect(appointment).toHaveProperty('id');
    });

    it('Should not be able to create a new user with an email already registered', async () => {
        const fakeAppointmentsRepository = new FakeUsersRepository();

        const createAppointment = new CreateUserService(
            fakeAppointmentsRepository,
        );

        await createAppointment.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        expect(
            createAppointment.execute({
                name: 'John Doe',
                email: 'johndoe@example.com',
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
