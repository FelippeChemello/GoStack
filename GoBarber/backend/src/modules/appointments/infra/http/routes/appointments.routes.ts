import { Router } from 'express';
import { parseISO } from 'date-fns';
// parseISO converte String para Objeto JS do tipo Date
// startOfHour define a Hora do Objeto Date como inicio (minuto 0, segundo 0 etc.)

import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (request, response) => {
//     const appointments = await appointmentsRepository.find();

//     return response.json(appointments);
// });

appointmentsRouter.post('/', async (request, response) => {
    // provider = id do prestador de serviços
    // date = Data e Hora do agendamento
    const { provider, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService(
        appointmentsRepository,
    );

    const appointment = await createAppointment.execute({
        date: parsedDate,
        provider,
    });

    return response.json(appointment);
});

export default appointmentsRouter;
