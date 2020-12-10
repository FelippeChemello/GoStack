import { Request, Response } from 'express';
import { parseISO } from 'date-fns'; // parseISO converte String para Objeto JS do tipo Date
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

//Controllers podem ter no máximo 5 métodos de acordo com arquitetura RESTful
// Index, show, create, update e delete
export default class AppointmentsController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { providerId, date } = request.body;
        const userId = request.user.id;

        const parsedDate = parseISO(date);

        const createAppointment = container.resolve(CreateAppointmentService);

        const appointment = await createAppointment.execute({
            date: parsedDate,
            providerId,
            userId,
        });

        return response.json(appointment);
    }
}
