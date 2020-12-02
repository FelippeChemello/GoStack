import { getRepository, Repository } from 'typeorm';

import InterfaceAppointmentsRepository from '@modules/appointments/repositories/InterfaceAppointmentsRepository';
import InterfaceCreateAppointmentDTO from '@modules/appointments/dtos/InterfaceCreateAppointmentDTO';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

class AppointmentsRepository implements InterfaceAppointmentsRepository {
    private ormRepository: Repository<Appointment>;

    constructor() {
        this.ormRepository = getRepository(Appointment);
    }

    public async findByDate(date: Date): Promise<Appointment | undefined> {
        const findAppointment = await this.ormRepository.findOne({
            where: {
                date,
            },
        });

        return findAppointment;
    }

    public async createAndSave({
        provider,
        date,
    }: InterfaceCreateAppointmentDTO): Promise<Appointment> {
        const appointment = this.ormRepository.create({
            providerId: provider,
            date,
        });

        await this.ormRepository.save(appointment);

        return appointment;
    }
}

export default AppointmentsRepository;
