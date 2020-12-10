import { uuid } from 'uuidv4';
import { isEqual, getMonth, getYear, getDate } from 'date-fns';

import InterfaceAppointmentsRepository from '@modules/appointments/repositories/InterfaceAppointmentsRepository';
import InterfaceCreateAppointmentDTO from '@modules/appointments/dtos/InterfaceCreateAppointmentDTO';
import InterfaceFindAllInMonthFromPoviderDTO from '@modules/appointments/dtos/InterfaceFindAllInMonthFromPoviderDTO';
import InterfaceFindAllInDayFromPoviderDTO from '@modules/appointments/dtos/InterfaceFindAllInDayFromPoviderDTO';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

class AppointmentsRepository implements InterfaceAppointmentsRepository {
    private appointments: Appointment[] = [];

    public async findByDate(date: Date): Promise<Appointment | undefined> {
        const findAppointment = this.appointments.find(appointment =>
            isEqual(appointment.date, date),
        );

        return findAppointment;
    }

    public async findAllInMonthFromProvider({
        providerId,
        month,
        year,
    }: InterfaceFindAllInMonthFromPoviderDTO): Promise<Appointment[]> {
        const appointments = this.appointments.filter(
            appointment =>
                appointment.providerId === providerId &&
                getMonth(appointment.date) + 1 === month &&
                getYear(appointment.date) === year,
        );

        return appointments;
    }

    public async findAllInDayFromProvider({
        providerId,
        day,
        month,
        year,
    }: InterfaceFindAllInDayFromPoviderDTO): Promise<Appointment[]> {
        const appointments = this.appointments.filter(
            appointment =>
                appointment.providerId === providerId &&
                getMonth(appointment.date) + 1 === month &&
                getYear(appointment.date) === year &&
                getDate(appointment.date) === day,
        );

        return appointments;
    }

    public async createAndSave({
        provider,
        date,
    }: InterfaceCreateAppointmentDTO): Promise<Appointment> {
        const appointment = new Appointment();

        Object.assign(appointment, { id: uuid(), date, providerId: provider });

        this.appointments.push(appointment);

        return appointment;
    }
}

export default AppointmentsRepository;
