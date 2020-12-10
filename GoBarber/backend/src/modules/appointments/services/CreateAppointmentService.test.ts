import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

import AppError from '@shared/errors/AppError';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();

        createAppointment = new CreateAppointmentService(
            fakeAppointmentsRepository,
        );
    });

    it('Should be able to create a new appointment', async () => {
        const appointment = await createAppointment.execute({
            date: new Date(),
            providerId: '1234567',
            userId: '7654321'
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.providerId).toBe('1234567');
    });

    it('Should not be able to create two appointments on same date and time', async () => {
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
});
