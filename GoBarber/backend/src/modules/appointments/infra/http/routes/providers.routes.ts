import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import ProvidersController from '@modules/appointments/infra/http/controllers/ProvidersController';
import ProviderMonthAvailabilityController from '@modules/appointments/infra/http/controllers/ProviderMonthAvailabilityController';
import ProviderDayAvailabilityController from '@modules/appointments/infra/http/controllers/ProviderDayAvailabilityController';

const providersRouter = Router();
const providersController = new ProvidersController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);
providersRouter.get(
    '/:providerId/month-availability',
    celebrate({
        [Segments.PARAMS]: {
            providerId: Joi.string().uuid().required(),
        },
    }),
    providerMonthAvailabilityController.index,
);
providersRouter.get(
    '/:providerId/day-availability',
    celebrate({
        [Segments.PARAMS]: {
            providerId: Joi.string().uuid().required(),
        },
    }),
    providerDayAvailabilityController.index,
);

export default providersRouter;
