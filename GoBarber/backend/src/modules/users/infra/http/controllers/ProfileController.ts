import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

export default class ProfileController {
    public async show(request: Request, response: Response): Promise<Response> {
        const userId = request.user.id;

        const user = await container.resolve(ShowProfileService).execute({
            userId,
        });

        return response.json(classToClass(user));
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, email, oldPassword, password } = request.body;

        const userId = request.user.id;

        const user = await container.resolve(UpdateProfileService).execute({
            userId,
            name,
            email,
            oldPassword,
            password,
        });

        return response.json(classToClass(user));
    }
}
