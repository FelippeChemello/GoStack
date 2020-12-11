import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

import AppError from '@shared/errors/AppError';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        fakeNotificationsRepository = new FakeNotificationsRepository();

        createAppointment = new CreateAppointmentService(
            fakeAppointmentsRepository,
            fakeNotificationsRepository,
        );
    });

    it('Should be able to create a new appointment', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 11, 9, 12).getTime();
        });

        const appointment = await createAppointment.execute({
            date: new Date(2020, 11, 9, 15),
            providerId: '1234567',
            userId: '7654321',
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.providerId).toBe('1234567');
    });

    it('Should not be able to create two appointments on same date and time', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 10, 9, 12).getTime();
        });

        const appointmentDate = new Date(2020, 10, 25, 12);

        await createAppointment.execute({
            date: appointmentDate,
            providerId: '1234567',
            userId: '7654321',
        });

        await expect(
            createAppointment.execute({
                date: appointmentDate,
                providerId: '1234567',
                userId: '7654321',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('Should not be able to create appointments on a past date', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 11, 9, 12).getTime();
        });

        await expect(
            createAppointment.execute({
                date: new Date(2020, 10, 25, 12),
                providerId: '1234567',
                userId: '7654321',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('Should not be able to create appointments with same user as provider', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 10, 25, 11).getTime();
        });

        await expect(
            createAppointment.execute({
                date: new Date(2020, 10, 25, 12),
                providerId: '1234567',
                userId: '1234567',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('Should not be able to create appointments outside the opening hours', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 10, 25, 11).getTime();
        });

        await expect(
            createAppointment.execute({
                date: new Date(2020, 10, 25, 18),
                providerId: 'user-id',
                userId: 'provider-id',
            }),
        ).rejects.toBeInstanceOf(AppError);

        await expect(
            createAppointment.execute({
                date: new Date(2020, 10, 25, 7),
                providerId: 'user-id',
                userId: 'provider-id',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
