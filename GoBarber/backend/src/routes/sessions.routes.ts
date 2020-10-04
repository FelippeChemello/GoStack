import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
    try {
        const { email, password } = request.body;

        const { user, token } = await new AuthenticateUserService().execute({
            email,
            password,
        });

        delete user.password;

        return response.json({ user, token });
    } catch (error) {
        return response.status(error.statusCode).json({ error: error.message });
    }
});

export default sessionsRouter;
