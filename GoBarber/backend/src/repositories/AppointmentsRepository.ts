import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

class AppointmentsRepository {
    private appointments: Appointment[];

    constructor() {
        this.appointments = [];
    }

    public all(): Appointment[] {
        return this.appointments;
    }

    public create(provider: string, date: Date): Appointment {
        const appointment = new Appointment(provider, date);

        this.appointments.push(appointment);

        return appointment;
    }

    public findByDate(date: Date): Appointment | null {
        const findAppointment = this.appointments.find(appointment =>
            isEqual(date, appointment.date),
        );

        return findAppointment || null;
    }
}

export default AppointmentsRepository;

// Repositório serve como um caminho entre a aplicação e a persistencia
// Nele serão criados os métodos para criar, deletar, buscar etc. os dados
// DETENTOR DAS OPERAÇÕES SOBRE OS DADOS DA APLICAÇÃO
