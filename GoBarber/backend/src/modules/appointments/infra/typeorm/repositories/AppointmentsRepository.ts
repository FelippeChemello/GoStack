import { EntityRepository, Repository } from 'typeorm';

import InterfaceAppointmentsRepository from '@modules/appointments/repositories/InterfaceAppointmentsRepository';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

@EntityRepository(Appointment)
class AppointmentsRepository
    extends Repository<Appointment>
    implements InterfaceAppointmentsRepository {
    public async findByDate(date: Date): Promise<Appointment | undefined> {
        const findAppointment = await this.findOne({
            where: {
                date,
            },
        });

        return findAppointment;
    }
}

export default AppointmentsRepository;
