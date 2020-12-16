import { injectable, inject } from 'tsyringe';
import { getDaysInMonth, getDate, isAfter } from 'date-fns';

import InterfaceAppointmentsRepository from '@modules/appointments/repositories/InterfaceAppointmentsRepository';

import openingHours from '@modules/appointments/config/openingHours';

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

            const compareDate = new Date(Date.now());

            console.log(
                new Date(year, month - 1, day, 23, 59, 59),
                compareDate,
            );

            return {
                day,
                available:
                    appointmentsInDay.length < openingHours.workedHours &&
                    isAfter(
                        new Date(year, month - 1, day, 23, 59, 59),
                        compareDate,
                    ),
            };
        });

        return availability;
    }
}

export default ListProviderMonthAvailabilityService;
