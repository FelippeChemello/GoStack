import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';

export default class ProviderAppointmentsController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const providerId = request.user.id;
        const { month, year, day } = request.body;

        const appointments = await container
            .resolve(ListProviderAppointmentsService)
            .execute({
                providerId,
                month,
                year,
                day,
            });

        return response.json(appointments);
    }
}
