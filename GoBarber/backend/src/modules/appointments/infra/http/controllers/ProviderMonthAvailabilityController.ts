import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

export default class AppointmentsController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { providerId } = request.params;
        const { month, year } = request.query;

        const appointment = await container
            .resolve(ListProviderMonthAvailabilityService)
            .execute({
                providerId,
                month: Number(month),
                year: Number(year),
            });

        return response.json(appointment);
    }
}
