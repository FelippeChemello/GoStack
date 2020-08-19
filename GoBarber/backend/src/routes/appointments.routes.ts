import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';
// parseISO converte String para Objeto JS do tipo Date
// startOfHour define a Hora do Objeto Date como inicio (minuto 0, segundo 0 etc.)

import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (request, response) => {
    const appointments = appointmentsRepository.all();

    return response.json(appointments);
});

appointmentsRouter.post('/', (request, response) => {
    // provider = Nome do prestador de serviços
    // date = Data e Hora do agendamento
    const { provider, date } = request.body;

    const parsedDate = startOfHour(parseISO(date));

    const findAppointmentInSameDate = appointmentsRepository.findByDate(
        parsedDate,
    );

    if (findAppointmentInSameDate) {
        return response
            .status(400)
            .json({ message: 'This appointment is already booked' });
    }

    const appointment = appointmentsRepository.create({
        provider,
        date: parsedDate,
    });

    return response.json(appointment);
});

export default appointmentsRouter;
