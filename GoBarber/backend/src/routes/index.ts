import { Router } from "express";
import appointmentsRouter from "./appointments.routes";

const routes = Router();

//Qualquer rota que vá ao endpoint 'appointments' será direcionado para aquela rota
routes.use('/appointments', appointmentsRouter)

export default routes;
