import { startOfHour, isBefore, getHours, format } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import openingHours from '@modules/appointments/config/openingHours';

import AppError from '@shared/errors/AppError';

import InterfaceAppointmentsRepository from '@modules/appointments/repositories/InterfaceAppointmentsRepository';
import InterfaceNotificationsRepository from '@modules/notifications/repositories/InterfaceNotificationsRepository';
import InterfaceCacheProvider from '@shared/container/providers/CacheProvider/models/InterfaceCacheProvider';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

interface InterfaceRequestDTO {
    providerId: string;
    userId: string;
    date: Date;
}

@injectable()
class CreateAppointmentService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: InterfaceAppointmentsRepository,

        @inject('NotificationsRepository')
        private notificationsRepository: InterfaceNotificationsRepository,

        @inject('CacheProvider')
        private cacheProvider: InterfaceCacheProvider,
    ) {}

    public async execute({
        date,
        providerId,
        userId,
    }: InterfaceRequestDTO): Promise<Appointment> {
        const appointmentDate = startOfHour(date);

        if (isBefore(appointmentDate, Date.now())) {
            throw new AppError("You can't book an appointment on a past date");
        }

        if (userId === providerId) {
            throw new AppError("You can't book an appointment with yourself");
        }

        if (
            getHours(appointmentDate) < openingHours.open ||
            getHours(appointmentDate) >= openingHours.close
        ) {
            throw new AppError(
                `You can only book an appoinment beetwen ${openingHours.open}h and ${openingHours.close}h `,
            );
        }

        const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
            appointmentDate,
            providerId,
        );

        if (findAppointmentInSameDate) {
            throw new AppError('This appointment is already booked');
        }

        const appointment = await this.appointmentsRepository.createAndSave({
            providerId,
            userId,
            date: appointmentDate,
        });

        await this.notificationsRepository.createAndSave({
            recipientId: providerId,
            content: `Novo agendamento para dia ${format(
                appointmentDate,
                "dd/MM/yyyy 'às' HH:mm",
            )}`,
        });

        await this.cacheProvider.invalidate(
            `provider-appointments:${providerId}:${format(
                appointmentDate,
                'yyyy:M:d',
            )}`,
        );

        return appointment;
    }
}

export default CreateAppointmentService;
