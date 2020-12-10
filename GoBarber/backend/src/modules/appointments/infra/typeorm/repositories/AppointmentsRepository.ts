import { getRepository, Repository, Raw } from 'typeorm';

import InterfaceAppointmentsRepository from '@modules/appointments/repositories/InterfaceAppointmentsRepository';
import InterfaceCreateAppointmentDTO from '@modules/appointments/dtos/InterfaceCreateAppointmentDTO';
import InterfaceFindAllInMonthFromPoviderDTO from '@modules/appointments/dtos/InterfaceFindAllInMonthFromPoviderDTO';

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

    public async findAllInMonthFromProvider({
        providerId,
        month,
        year,
    }: InterfaceFindAllInMonthFromPoviderDTO): Promise<Appointment[]> {
        const appointments = await this.ormRepository.find({
            where: {
                providerId,
                date: Raw(
                    dateFieldName =>
                        `to_char(${dateFieldName}, 'MM-YYYY') = '${String(
                            month,
                        ).padStart(2, '0')}-${year}'`,
                ),
            },
        });

        return appointments;
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
