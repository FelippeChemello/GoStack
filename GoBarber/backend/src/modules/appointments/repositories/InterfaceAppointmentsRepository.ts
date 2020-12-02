import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

export default interface InterfaceAppointmentsRepository {
    findByDate(date: Date): Promise<Appointment | undefined>;
}
