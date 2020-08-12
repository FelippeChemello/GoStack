import { Router } from 'express';
import { uuid } from 'uuidv4';
import { startOfHour, parseISO } from 'date-fns';

const appointmentsRouter = Router();

const appointments = [];

appointmentsRouter.post('/', (request, response) => {
    //provider = Nome do prestador de serviços
    //date = Data e Hora do agendamento
    const { provider, date } = request.body;

    const appointment = {
        id: uuid(),
        provider,
        date
    }

    appointments.push(appointment)

    return response.json(appointment);
})

export default appointmentsRouter;
