import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';
// parseISO converte String para Objeto JS do tipo Date
// startOfHour define a Hora do Objeto Date como inicio (minuto 0, segundo 0 etc.)
import { getCustomRepository } from 'typeorm';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CrateAppointmentService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (request, response) => {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointments = await appointmentsRepository.find();

    return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
    try {
        // provider = Nome do prestador de serviços
        // date = Data e Hora do agendamento
        const { provider, date } = request.body;

        const parsedDate = parseISO(date);

        const createAppointment = new CreateAppointmentService();

        const appointment = await createAppointment.execute({
            date: parsedDate,
            provider,
        });

        return response.json(appointment);
    } catch (error) {
        return response.status(error.statusCode).json({ error: error.message });
    }
});

export default appointmentsRouter;
