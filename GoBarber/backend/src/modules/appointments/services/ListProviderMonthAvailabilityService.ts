import { injectable, inject } from 'tsyringe';
import { getDaysInMonth, getDate } from 'date-fns';

import InterfaceAppointmentsRepository from '@modules/appointments/repositories/InterfaceAppointmentsRepository';

import AppError from '@shared/errors/AppError';

interface InterfaceRequestDTO {
    providerId: string;
    month: number;
    year: number;
}

type InterfaceResponseDTO = Array<{
    day: number;
    available: boolean;
}>;

@injectable()
class ListProviderMonthAvailabilityService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: InterfaceAppointmentsRepository,
    ) {}

    public async execute({
        providerId,
        month,
        year,
    }: InterfaceRequestDTO): Promise<InterfaceResponseDTO> {
        const appointments = await this.appointmentsRepository.findAllInMonthFromProvider(
            {
                providerId,
                year,
                month,
            },
        );

        const numbersOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));

        const eachDayArray = Array.from(
            { length: numbersOfDaysInMonth },
            (value, index) => index + 1,
        );

        const availability = eachDayArray.map(day => {
            const appointmentsInDay = appointments.filter(
                appointment => getDate(appointment.date) === day,
            );

            return {
                day,
                available: appointmentsInDay.length < 10,
            };
        });

        return availability;
    }
}

export default ListProviderMonthAvailabilityService;
