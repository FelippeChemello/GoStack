import { Router, response } from 'express';
import multer from 'multer';

import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService'

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
    try {
        const { name, email, password } = request.body;

        const user = await new CreateUserService().execute({
            name,
            email,
            password,
        });

        delete user.password;

        return response.json(user);
    } catch (error) {
        return response.status(error.statusCode).json({ error: error.message });
    }
});

usersRouter.patch(
    '/avatar',
    ensureAuthenticated,
    upload.single('avatar'),
    async (request, response) => {
        try {
            const user = await new UpdateUserAvatarService().execute({
                user_id: request.user.id,
                avatarFileName: request.file.filename
            })

            delete user.password

            return response.json(user)
        } catch (error) {
            return response.status(error.statusCode).json({ error: error.message });
        }
    },
);

export default usersRouter;
