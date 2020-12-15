import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ProfileController from '@modules/users/infra/http/controllers/ProfileController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.put(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            oldPassword: Joi.string().allow(null, ''),
            password: Joi.when('oldPassword', {
                is: null || '',
                then: Joi.allow(null, ''),
                otherwise: Joi.string().required(),
            }),
            passwordConfirmation: Joi.when('oldPassword', {
                is: null || '',
                then: Joi.allow(null, ''),
                otherwise: Joi.string().required(),
            }).valid(Joi.ref('password')),
        },
    }),
    profileController.update,
);
profileRouter.get('/', profileController.show);

export default profileRouter;
