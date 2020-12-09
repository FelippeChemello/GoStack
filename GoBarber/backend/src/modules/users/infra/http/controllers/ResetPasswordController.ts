import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ResetPasswordService from '@modules/users/services/ResetPasswordServices';

export default class ResetPasswordController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { password, token } = request.body;
        
        await container.resolve(ResetPasswordService).execute({
            password,
            token,
        });

        return response.status(204).json();
    }
}
