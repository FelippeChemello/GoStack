import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

export default class AppointmentsController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { providerId } = request.params;
        const { month, year, day } = request.query;

        const appointment = await container
            .resolve(ListProviderDayAvailabilityService)
            .execute({
                providerId,
                month: Number(month),
                year: Number(year),
                day: Number(day),
            });

        return response.json(appointment);
    }
}
