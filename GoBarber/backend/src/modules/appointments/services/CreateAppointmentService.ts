import { startOfHour } from 'date-fns';

import AppError from '@shared/errors/AppError';

import InterfaceAppointmentsRepository from '@modules/appointments/repositories/InterfaceAppointmentsRepository';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

interface InterfaceRequestDTO {
    provider: string;
    date: Date;
}

class CreateAppointmentService {
    constructor(
        private appointmentsRepository: InterfaceAppointmentsRepository,
    ) {}

    public async execute({
        date,
        provider,
    }: InterfaceRequestDTO): Promise<Appointment> {
        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
            appointmentDate,
        );

        if (findAppointmentInSameDate) {
            throw new AppError('This appointment is already booked');
        }

        const appointment = await this.appointmentsRepository.createAndSave({
            provider,
            date: appointmentDate,
        });

        return appointment;
    }
}

export default CreateAppointmentService;
