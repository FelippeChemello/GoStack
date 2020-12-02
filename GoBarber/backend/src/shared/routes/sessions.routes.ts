import { Router } from 'express';

import AuthenticateUserService from '../../modules/users/services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
    const { email, password } = request.body;

    const { user, token } = await new AuthenticateUserService().execute({
        email,
        password,
    });

    delete user.password;

    return response.json({ user, token });
});

export default sessionsRouter;
