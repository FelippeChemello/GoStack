import { injectable, inject } from 'tsyringe';
import { getHours } from 'date-fns';

import openingHours from '@modules/appointments/config/openingHours';

import InterfaceAppointmentsRepository from '@modules/appointments/repositories/InterfaceAppointmentsRepository';

interface InterfaceRequestDTO {
    providerId: string;
    day: number;
    month: number;
    year: number;
}

type InterfaceResponseDTO = Array<{
    hour: number;
    available: boolean;
}>;

@injectable()
export default class ListProviderDayAvailabilityService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: InterfaceAppointmentsRepository,
    ) {}

    public async execute({
        providerId,
        day,
        month,
        year,
    }: InterfaceRequestDTO): Promise<InterfaceResponseDTO> {
        const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
            {
                providerId,
                day,
                month,
                year,
            },
        );

        const availability = openingHours.hoursOpen.map(hour => {
            const hasAppointmentInHour = appointments.find(
                appointment => getHours(appointment.date) === hour,
            );

            return {
                hour,
                available: !hasAppointmentInHour,
            };
        });

        return availability;
    }
}
