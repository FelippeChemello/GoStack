import { injectable, inject } from 'tsyringe';

import InterfaceAppointmentsRepository from '@modules/appointments/repositories/InterfaceAppointmentsRepository';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';

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
        const appointments = this.appointmentsRepository.findAllInMonthFromProvider(
            {
                providerId,
                year,
                month,
            },
        );

        console.log(appointments);

        return [{ day: 1, available: false }];
    }
}

export default ListProviderMonthAvailabilityService;
