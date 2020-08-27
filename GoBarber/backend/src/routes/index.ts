import { Router } from 'express';
import appointmentsRouter from './appointments.routes';
import usersRouter from './users.routes';

const routes = Router();

// Qualquer rota que vá ao endpoint 'appointments' será direcionado para aquela rota
routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);

export default routes;
