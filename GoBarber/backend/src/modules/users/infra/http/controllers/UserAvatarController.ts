import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

export default class UserAvatarController {
    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const user = await container.resolve(UpdateUserAvatarService).execute({
            userId: request.user.id,
            avatarFileName: request.file.filename,
        });

        return response.json(classToClass(user));
    }
}
