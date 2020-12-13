import { injectable, inject } from 'tsyringe';

import InterfaceAppointmentsRepository from '@modules/appointments/repositories/InterfaceAppointmentsRepository';
import InterfaceCacheProvider from '@shared/container/providers/CacheProvider/models/InterfaceCacheProvider';

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

        @inject('CacheProvider')
        private cacheProvider: InterfaceCacheProvider,
    ) {}

    public async execute({
        providerId,
        day,
        month,
        year,
    }: InterfaceRequestDTO): Promise<Appointment[]> {
        let appointments = await this.cacheProvider.recover<Appointment[]>(
            `provider-appointments:${providerId}:${year}:${month}:${day}`,
        );

        if (!appointments) {
            appointments = await this.appointmentsRepository.findAllInDayFromProvider(
                {
                    providerId,
                    year,
                    month,
                    day,
                },
            );

            console.log('Buscando...');

            await this.cacheProvider.save(
                `provider-appointments:${providerId}:${year}:${month}:${day}`,
                appointments,
            );
        }

        return appointments;
    }
}
