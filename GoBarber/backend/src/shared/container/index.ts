import { container } from 'tsyringe';

import '@modules/users/providers';

import InterfaceAppointmentsRepository from '@modules/appointments/repositories/InterfaceAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import InterfaceUsersRepository from '@modules/users/repositories/InterfaceUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

container.registerSingleton<InterfaceAppointmentsRepository>(
    'AppointmentsRespository',
    AppointmentsRepository,
);

container.registerSingleton<InterfaceUsersRepository>(
    'UsersRepository',
    UsersRepository,
);
