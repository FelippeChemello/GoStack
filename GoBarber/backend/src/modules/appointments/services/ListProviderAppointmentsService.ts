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
        // const cacheData = await this.cacheProvider.recover('asd');

        const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
            {
                providerId,
                year,
                month,
                day,
            },
        );

        // await this.cacheProvider.save('asd', 'asd');

        return appointments;
    }
}
