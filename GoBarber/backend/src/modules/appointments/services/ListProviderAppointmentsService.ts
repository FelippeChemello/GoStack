import { injectable, inject } from 'tsyringe';

import InterfaceAppointmentsRepository from '@modules/appointments/repositories/InterfaceAppointmentsRepository';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

interface InterfaceRequestDTO {
    providerId: string;
    month: number;
    year: number;
    day: number;
}

@injectable()
export default class ListProviderAppointmentsService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: InterfaceAppointmentsRepository,
    ) {}

    public async execute({
        providerId,
        day,
        month,
        year,
    }: InterfaceRequestDTO): Promise<Appointment[]> {
        const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
            {
                providerId,
                year,
                month,
                day,
            },
        );

        return appointments;
    }
}
