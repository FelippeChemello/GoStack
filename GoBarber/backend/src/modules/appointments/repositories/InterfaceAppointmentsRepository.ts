import InterfaceCreateAppointmentDTO from '@modules/appointments/dtos/InterfaceCreateAppointmentDTO';
import InterfaceFindAllInMonthFromPoviderDTO from '@modules/appointments/dtos/InterfaceFindAllInMonthFromPoviderDTO';
import InterfaceFindAllInDayFromPoviderDTO from '@modules/appointments/dtos/InterfaceFindAllInDayFromPoviderDTO';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

export default interface InterfaceAppointmentsRepository {
    createAndSave(data: InterfaceCreateAppointmentDTO): Promise<Appointment>;
    findByDate(
        date: Date,
        providerId: string,
    ): Promise<Appointment | undefined>;
    findAllInMonthFromProvider(
        data: InterfaceFindAllInMonthFromPoviderDTO,
    ): Promise<Appointment[]>;
    findAllInDayFromProvider(
        data: InterfaceFindAllInDayFromPoviderDTO,
    ): Promise<Appointment[]>;
}
